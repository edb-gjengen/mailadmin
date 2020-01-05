import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ALIASES, GET_DOMAINS } from '../queries';
import AliasList from './AliasList';
import AliasListCreate from './AliasListCreate';
import { groupBy } from '../utils';

const MainArea = ({ query, selectedOrgUnit, orgUnits }) => {
  const { data, loading, error } = useQuery(GET_ALIASES);
  const { data: domainData, loading: domainLoading, error: domainError } = useQuery(GET_DOMAINS);

  if (loading || domainLoading) {
    return (
      <div className="forwards-container">
        <span className="fas fa-sync spin" aria-hidden="true" /> Laster...
      </div>
    );
  }
  if (error || domainError) {
    return null;
  }
  const domain = domainData.domains[0];

  const lists = groupBy(
    data.aliases.sort((a, b) => a.source.localeCompare(b.source)),
    'source'
  );

  const listPrefixes = selectedOrgUnit && orgUnits.find(({ id }) => id === selectedOrgUnit).prefixesRegex;
  const listRegex = listPrefixes && new RegExp(listPrefixes);

  return (
    <div className="col-sm-8">
      <AliasListCreate lists={lists} orgUnits={orgUnits} domain={domain} />
      <div className="forwards-container">
        {Object.entries(lists).map(([list, aliases]) => {
          // When searching only render lists with query matches
          const queryMatchInList = aliases.some((alias) => alias.destination.includes(query));
          if (query && !queryMatchInList) {
            return null;
          }
          // Only render lists which matches the org units prefixes
          if (listRegex && !listRegex.test(list)) {
            return null; // FIXME: use styles to show/hide ?
          }
          return <AliasList key={list} list={list} aliases={aliases} domain={domain} query={query} />;
        })}
      </div>
    </div>
  );
};
export default MainArea;
