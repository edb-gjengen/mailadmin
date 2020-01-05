import React, { useState } from 'react';
import ctx from 'classnames';

import EmailsTextarea from './EmailsTextarea';

const AliasListCreate = ({ domain, lists, orgUnits }) => {
  const firstOrgUnit = orgUnits[0].prefixes[0];

  const [textareaVisible, setTextareaVisible] = useState(false);
  const [name, setName] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState(firstOrgUnit);

  const listName = `${selectedPrefix}-${name}@${domain.name}`;
  const shouldCreate = Boolean(Object.entries(lists).filter(([list]) => list === listName).length);

  const flattenedPrefixes = [].concat(...orgUnits.map((ou) => ou.prefixes.map((prefix) => prefix))).sort();

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
          <span className="fas fa-list-alt icon-faded" aria-hidden="true" />
          {name ? listName : `Ny liste`}
          {name && !shouldCreate && <span className="badge badge-success">Ny</span>}
          {name && shouldCreate && <span className="badge badge-info">Eksisterende</span>}
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
                {selectedPrefix}- <span className="caret" />
              </button>
              <div className="dropdown-menu prefix-select">
                {flattenedPrefixes.map((prefix) => (
                  <a
                    key={prefix}
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPrefix(prefix);
                    }}
                  >
                    {prefix}-
                  </a>
                ))}
              </div>
            </div>
            <input
              type="text"
              className="form-control js-new-list-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="input-group-append">
              <span className="input-group-text">{`@${domain.name}`}</span>
            </div>
          </div>
          <EmailsTextarea source={listName} domainId={domain.id} create={shouldCreate} />
        </div>
      </div>
      {/* <div className="new-list-result"></div> */}
    </div>
  );
};

export default AliasListCreate;
