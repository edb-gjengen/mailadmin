import React, { useState } from 'react';
import { groupBy, sortBy } from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import ctx from 'classnames';

import { parseEmails } from '../utils';
import { GET_ALIASES, GET_DOMAINS, GET_ORG_UNITS } from '../queries';

const ListCreate = () => {
  const { data, loading, error } = useQuery(GET_ORG_UNITS);
  const { data: emailData, loading: emailLoading, error: emailError } = useQuery(GET_DOMAINS);
  const [textareaVisible, setTextareaVisible] = useState(false);
  const [listName, setListName] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState(null);

  if (loading || emailLoading || error || emailError) {
    return null;
  }

  const { orgUnits } = data;
  const { domains } = emailData;
  const emailDomain = domains[0];

  return (
    <div className="new-list-container">
      <button
        type="button"
        className="btn btn-outline-primary new-list-btn"
        onClick={() => {
          setTextareaVisible(!textareaVisible);
        }}
      >
        <span className="fas fa-plus" aria-hidden="true" /> Opprett ny liste
      </button>
      <div className={ctx('new-list fwdlist card', { visible: textareaVisible })}>
        <div className="card-header">
          <span className="fas fa-list-alt icon-faded" aria-hidden="true" /> <span className="">Ny liste</span>
        </div>
        <div className="card-body">
          <div className="new-list-name input-group">
            <div className="input-group-prepend">
              <button
                type="button"
                className="btn btn btn-outline-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {selectedPrefix || orgUnits[0].prefixes[0]}- <span className="caret" />
              </button>
              <div className="dropdown-menu prefix-select">
                {orgUnits.map((ou) =>
                  ou.prefixes.map((prefix) => (
                    <a
                      key={`${ou.id}-${prefix}`}
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPrefix(prefix);
                      }}
                    >
                      {prefix}-
                    </a>
                  ))
                )}
              </div>
            </div>
            <input
              type="text"
              className="form-control js-new-list-name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className="input-group-append">
              <span className="input-group-text">{`@${emailDomain.name}`}</span>
            </div>
          </div>
          <EmailsTextarea listName={listName} selectedPrefix={selectedPrefix} newList={true} />
        </div>
      </div>
      {/* <div className="new-list-result"></div> */}
    </div>
  );
};

const AliasRow = ({ id, destination, updateDeletionList }) => {
  const [checked, setChecked] = useState(false);
  return (
    <tr className="">
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

const EmailsTextarea = ({ list, selectedPrefix, newList = false }) => {
  const [rawAliases, setRawAliases] = useState('');
  const [aliases, setAliases] = useState([]);

  const createAliases = () => {
    console.log(list, aliases, selectedPrefix, newList);
    // TODO: POST /aliases
  };
  return (
    <>
      <h5>
        Eposter{' '}
        <span className="badge badge-secondary email-counter">{aliases.length === 0 ? '' : aliases.length}</span>
      </h5>
      <textarea
        className="form-control"
        placeholder="asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker"
        rows="4"
        value={rawAliases}
        onChange={(e) => {
          setRawAliases(e.target.value);
          setAliases(parseEmails(e.target.value));
        }}
      />
      <div className="text-right">
        <button type="button" className="btn btn-primary btn-add-list" onClick={createAliases}>
          <span className="fas fa-plus" /> {newList ? 'Opprett liste' : 'Legg til'}
        </button>
      </div>
    </>
  );
};

const ForwardContainer = ({ filterQuery }) => {
  // TODO: Filter aliases by filterQuery
  const { data, loading, error } = useQuery(GET_ALIASES);

  const [textareaVisible, setTextareaVisible] = useState(false);
  const [deletionList, setdeletionList] = useState([]);

  const deleteAliases = (aliases) => {
    // TODO: delete aliases
    console.log(aliases);
  };

  if (loading) {
    return (
      <div className="forwards-container">
        <span className="fas fa-sync spin" aria-hidden="true" /> Laster...
      </div>
    );
  }
  if (error) {
    return null;
  }
  const lists = groupBy(
    sortBy(data.aliases, (alias) => {
      return alias.source;
    }),
    (alias) => alias.source
  );

  return (
    <div className="forwards-container">
      {Object.entries(lists).map(([list, aliases]) => {
        return (
          <div key={list} className="card">
            <div className="card-header">
              <span className="fas fa-list-alt icon-faded" aria-hidden="true" /> {list}{' '}
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
                        setdeletionList([...deletionList, aliasId]); // add
                      } else {
                        setdeletionList(deletionList.filter((id) => id !== aliasId)); // remove
                      }
                    }}
                  />
                ))}
                <ActionRow
                  onAddEmailClick={() => {
                    setTextareaVisible(!textareaVisible);
                  }}
                  deleteVisible={Boolean(deletionList.length)}
                  onDelete={(e) => {
                    e.preventDefault();
                    deleteAliases(deletionList);
                  }}
                />

                <tr className={ctx('textarea-row', { visible: textareaVisible })}>
                  <td colSpan="2">
                    <EmailsTextarea list={list} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

const MainArea = () => {
  return (
    <div className="col-sm-8">
      {/* <div className="orgunit-select-container"></div> */}
      <ListCreate />
      <ForwardContainer />
    </div>
  );
};
export default MainArea;
