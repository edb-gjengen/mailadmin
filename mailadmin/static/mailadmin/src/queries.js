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

export const GET_DOMAINS = gql`
  query Domains {
    domains @rest(type: "Domain", path: "domains/") {
      id
      name
    }
  }
`;

export const GET_ALIASES = gql`
  query Aliases {
    aliases @rest(type: "Alias", path: "aliases/") {
      id
      source
      destination
    }
  }
`;
