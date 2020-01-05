import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MainArea, OrgUnitList } from './index';
import { GET_ORG_UNITS } from '../queries';

const MailAdmin = () => {
  const [query, setQuery] = useState(new URLSearchParams(window.location.search).get('q') || '');
  const [selectedOrgUnit, setOrgUnit] = useState(
    parseInt(new URLSearchParams(window.location.search).get('orgunit'), 10) || null
  );
  const { data, loading, error } = useQuery(GET_ORG_UNITS);
  if (loading || error) {
    return null;
  }

  // Format a prefix regex for each org unit
  const orgUnits = data.orgUnits.map((ou) => {
    const prefixes = ou.prefixes.map((prefix) => {
      return `^${prefix}-|^${prefix}@`;
    });
    return { prefixesRegex: prefixes.join('|'), ...ou };
  });
  return (
    <>
      <OrgUnitList
        query={query}
        setQuery={setQuery}
        selectedOrgUnit={selectedOrgUnit}
        setOrgUnit={setOrgUnit}
        orgUnits={orgUnits}
      />
      <MainArea query={query} selectedOrgUnit={selectedOrgUnit} orgUnits={orgUnits} />
    </>
  );
};
export default MailAdmin;
