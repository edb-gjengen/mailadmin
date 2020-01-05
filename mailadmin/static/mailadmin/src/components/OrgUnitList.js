import React, { useCallback } from 'react';
import ctx from 'classnames';

import { setQueryString } from '../utils';

const Search = ({ query, setQuery }) => {
  return (
    <input
      type="search"
      className="form-control search-field js-lists-filter-field"
      placeholder="Søk i listene"
      onChange={setQuery}
      value={query}
    />
  );
};

const OrgUnit = ({ id, name, selected, onClick }) => (
  <li className={ctx({ active: selected })}>
    <a href={`/lists/?orgunit=${id}`} onClick={onClick}>
      {name}
    </a>
  </li>
);

const OrgUnitList = ({ query, setQuery, orgUnits, selectedOrgUnit, setOrgUnit }) => {
  const setSearchQuery = useCallback(
    (e) => {
      e.preventDefault();
      const q = e.target.value;
      setQuery(q);
      setQueryString(q ? { q } : null);
    },
    [setQuery]
  );

  const onClearOrgUnit = useCallback(
    (e) => {
      e.preventDefault();
      setOrgUnit(null);
      setQueryString();
      setQuery('');
    },
    [setOrgUnit, setQuery]
  );

  return (
    <div className="col-sm-4 sidebar">
      <Search query={query} setQuery={setSearchQuery} />
      <h5>Foreninger/Utvalg</h5>
      <ul className="nav nav-sidebar orgunit-list">
        <li className={ctx({ active: selectedOrgUnit === null })}>
          <a href="#" onClick={onClearOrgUnit}>
            Alle
          </a>
        </li>
        {orgUnits.map((ou) => (
          <OrgUnit
            key={ou.id}
            {...ou}
            selected={selectedOrgUnit === ou.id}
            onClick={(e) => {
              e.preventDefault();
              setOrgUnit(ou.id);
              setQueryString({ orgunit: ou.id });
              setQuery('');
            }}
          />
        ))}
      </ul>
    </div>
  );
};
export default OrgUnitList;
