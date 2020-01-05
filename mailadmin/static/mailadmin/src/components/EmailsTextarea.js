import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { parseEmails, notify } from '../utils';
import { CREATE_ALIASES_MUTATION } from '../mutations';
import { GET_ALIASES } from '../queries';

const EmailsTextarea = ({ source, domainId, create = false, setName = null }) => {
  const [rawAliases, setRawAliases] = useState('');
  const [createAliases] = useMutation(CREATE_ALIASES_MUTATION);

  const aliases = parseEmails(rawAliases);

  const onAddClick = useCallback(
    async (e) => {
      e.preventDefault();
      const input = aliases.map((alias) => ({ source, destination: alias, domain: domainId }));
      const { errors } = await createAliases({
        variables: { input },
        update: (cache, { data }) => {
          setRawAliases('');
          if (setName) {
            setName('');
          }
          const { createAliasesResponse: newAliases } = data;
          const { aliases: aliasesFromCache } = cache.readQuery({ query: GET_ALIASES });
          cache.writeQuery({
            query: GET_ALIASES,
            data: { aliases: aliasesFromCache.concat(newAliases) }
          });
          const title = `${newAliases[0].source} ${create ? 'opprettet' : 'oppdatert'}`;
          notify(title, `${newAliases.map((alias) => alias.destination).join('\n')} lagt til.`);
        }
      });

      if (errors) {
        notify('Feil', `Kunne ikke legge til e-poster til liste ${source}`, 'error');
        console.error(errors);
      }
    },
    [aliases, create, createAliases, domainId, setName, source]
  );
  return (
    <>
      <h5>
        Eposter <span className="badge badge-secondary email-counter">{!aliases.length ? '' : aliases.length}</span>
      </h5>
      <textarea
        className="form-control"
        placeholder="asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker"
        rows="4"
        value={rawAliases}
        onChange={(e) => {
          setRawAliases(e.target.value);
        }}
      />
      <div className="text-right">
        <button type="button" className="btn btn-primary btn-add-list" onClick={onAddClick}>
          <span className="fas fa-plus" /> {create ? 'Opprett liste' : 'Legg til'}
        </button>
      </div>
    </>
  );
};
export default EmailsTextarea;
