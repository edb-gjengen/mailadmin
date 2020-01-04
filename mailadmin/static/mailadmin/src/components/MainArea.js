import React from 'react';
import { groupBy, sortBy } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import { GET_ALIASES, GET_DOMAINS, GET_ORG_UNITS } from '../queries';
import AliasList from './AliasList';
import AliasListCreate from './AliasListCreate';

const MainArea = ({ filterQuery }) => {
  // TODO: Filter aliases by filterQuery
  const { data, loading, error } = useQuery(GET_ALIASES);
  const { data: ouData, loading: ouLoading, error: ouError } = useQuery(GET_ORG_UNITS);
  const { data: domainData, loading: domainLoading, error: domainError } = useQuery(GET_DOMAINS);

  if (loading || ouLoading || domainLoading) {
    return (
      <div className="forwards-container">
        <span className="fas fa-sync spin" aria-hidden="true" /> Laster...
      </div>
    );
  }
  if (error || ouError || domainError) {
    return null;
  }
  const { orgUnits } = ouData;
  const domain = domainData.domains[0];

  const lists = groupBy(
    sortBy(data.aliases, (alias) => alias.source),
    (alias) => alias.source
  );
  return (
    <div className="col-sm-8">
      {/* <div className="orgunit-select-container"></div> */}
      <AliasListCreate lists={lists} orgUnits={orgUnits} domain={domain} />
      <div className="forwards-container">
        {Object.entries(lists).map(([list, aliases]) => (
          <AliasList key={list} list={list} aliases={aliases} domain={domain} />
        ))}
      </div>
    </div>
  );
};
export default MainArea;
