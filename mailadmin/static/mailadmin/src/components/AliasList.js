import React, { useState, useCallback } from 'react';
import ctx from 'classnames';
import { useMutation } from '@apollo/react-hooks';

import EmailsTextarea from './EmailsTextarea';
import { DELETE_ALIASES_MUTATION } from '../mutations';
import { notify } from '../utils';
import { GET_ALIASES } from '../queries';

const AliasRow = ({ id, destination, updateDeletionList }) => {
  const [checked, setChecked] = useState(false);
  return (
    <tr className={ctx({ 'table-danger': checked })}>
      <td>{destination}</td>
      <td className="del-cell">
        <div className="custom-control custom-checkbox custom-control-inline">
          <input
            id={`alias-delete-${id}`}
            type="checkbox"
            className="custom-control-input"
            value={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              updateDeletionList(id, e.target.checked);
            }}
          />
          <label className="custom-control-label" htmlFor={`alias-delete-${id}`} />
        </div>
      </td>
    </tr>
  );
};

const ActionRow = ({ onAddEmailClick, deleteVisible, onDelete }) => {
  return (
    <tr className="action-row">
      <td>
        <a href="#" className="link-add" onClick={onAddEmailClick}>
          <span className="fas fa-plus" aria-hidden="true" /> Legg til
        </a>
      </td>
      <td>
        <a href="#" className={ctx('link-del', { visible: deleteVisible })} type="button" onClick={onDelete}>
          <span className="fas fa-trash" aria-hidden="true" />
          &nbsp;Slett
        </a>
      </td>
    </tr>
  );
};

const AliasList = ({ list, aliases, domain }) => {
  const [textareaVisible, setTextareaVisible] = useState(false);
  const [deletionList, setDeletionList] = useState([]);
  const [deleteAliases] = useMutation(DELETE_ALIASES_MUTATION);

  const onDelete = useCallback(
    async (e) => {
      e.preventDefault();
      const input = deletionList.map((alias) => ({ ...alias, domain: domain.id }));
      const errorMessage = `Kunne ikke slette e-poster fra ${list}`;
      try {
        const { errors } = await deleteAliases({
          variables: { input },
          update: (cache) => {
            setDeletionList([]);
            const deletedIds = deletionList.map(({ id }) => id);
            const { aliases: aliasesFromCache } = cache.readQuery({ query: GET_ALIASES });
            cache.writeQuery({
              query: GET_ALIASES,
              data: { aliases: aliasesFromCache.filter(({ id }) => !deletedIds.includes(id)) }
            });
            notify('Slettet e-poster', `${deletionList.map((alias) => alias.destination).join('\n')} slettet.`);
          }
        });
        if (errors) {
          notify('Feil', errorMessage, 'error');
          console.error(errors);
        }
      } catch (err) {
        notify('Feil', errorMessage, 'error');
        console.error(err);
      }
    },
    [deleteAliases, deletionList, domain, list]
  );

  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="fas fa-list-alt icon-faded" aria-hidden="true" />
        {list}
        <span className="badge badge-secondary badge-list-total">{aliases.length}</span>
      </div>
      <table className="table table-striped table-hover table-condensed">
        <tbody>
          {aliases.map((alias) => (
            <AliasRow
              key={alias.id}
              {...alias}
              updateDeletionList={(aliasId, checked) => {
                if (checked) {
                  const { __typename, ...aliasForDeletion } = alias;
                  setDeletionList([...deletionList, aliasForDeletion]); // add
                } else {
                  setDeletionList(deletionList.filter(({ id }) => id !== aliasId)); // remove
                }
              }}
            />
          ))}
          <ActionRow
            onAddEmailClick={(e) => {
              e.preventDefault();
              setTextareaVisible(!textareaVisible);
            }}
            deleteVisible={Boolean(deletionList.length)}
            onDelete={onDelete}
          />

          <tr className={ctx('textarea-row', { visible: textareaVisible })}>
            <td colSpan="2">
              <EmailsTextarea source={list} domainId={domain.id} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default AliasList;
