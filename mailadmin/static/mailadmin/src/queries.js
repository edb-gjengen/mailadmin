import gql from 'graphql-tag';

export const GET_ORG_UNITS = gql`
  query OrgUnits {
    orgUnits @rest(type: "OrgUnit", path: "orgunits/") {
      id
      name
      prefixes
    }
  }
`;

// FIXME: only a single domain
export const GET_DOMAINS = gql`
  query Domains {
    domains @rest(type: "Domain", path: "domains/") {
      id
      name
    }
  }
`;

export const GET_ALIASES = gql`
  query OrgUnits {
    aliases @rest(type: "Alias", path: "aliases/") {
      id
      source
      destination
    }
  }
`;
