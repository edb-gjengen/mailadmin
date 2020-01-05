import gql from 'graphql-tag';

export const CREATE_ALIASES_MUTATION = gql`
  mutation createAliases($input: [Alias]!) {
    createAliasesResponse(input: $input) @rest(type: "Alias", path: "aliases/", method: "POST") {
      id
      source
      destination
    }
  }
`;
export const DELETE_ALIASES_MUTATION = gql`
  mutation deleteAliases($input: [Alias]!) {
    deleteAliasesResponse(input: $input) @rest(type: "Alias", path: "aliases/delete/", method: "POST") {
      id
    }
  }
`;
