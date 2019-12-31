import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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

const GET_ORG_UNITS = gql`
  query OrgUnits {
    orgUnits @rest(type: "OrgUnit", path: "orgunits/") {
      id
      name
      prefixes
    }
  }
`;
const OrgUnitList = () => {
  const [query, setQuery] = useState(new URLSearchParams(window.location.search).get('q') || '');
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useQuery(GET_ORG_UNITS);
  if (loading || error) {
    return null;
  }
  const orgUnits = data.orgUnits.map((ou) => {
    const prefixes = ou.prefixes.map((prefix) => {
      return `^${prefix}-|^${prefix}@`;
    });
    return { prefixesRegex: prefixes.join('|'), ...ou };
  });

  return (
    <div className="col-sm-4 sidebar">
      <Search
        query={query}
        setQuery={(e) => {
          e.preventDefault();
          const q = e.target.value;
          setQuery(q);
          setQueryString(q ? { q } : null);
        }}
      />
      <h4>Foreninger/Utvalg</h4>
      <ul className="nav nav-sidebar orgunit-list">
        <li className={ctx({ active: selected === null })}>
          <a
            href="/lists/"
            onClick={(e) => {
              e.preventDefault();
              setSelected(null);
              setQueryString();
            }}
          >
            Alle
          </a>
        </li>
        {orgUnits.map((orgUnit) => (
          <OrgUnit
            key={orgUnit.id}
            {...orgUnit}
            selected={selected === orgUnit.id}
            onClick={(e) => {
              e.preventDefault();
              setSelected(orgUnit.id);
              setQueryString({ orgunit: orgUnit.id });
            }}
          />
        ))}
      </ul>
    </div>
  );
};
export default OrgUnitList;
