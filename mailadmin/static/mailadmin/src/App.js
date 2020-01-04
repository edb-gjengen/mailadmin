import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { OrgUnitList, MainArea } from './components';

import { getCookie } from './utils';

const restLink = new RestLink({
  uri: '/api/',
  credentials: 'include',
  headers: {
    'x-csrftoken': getCookie('csrftoken')
  }
});
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  typeDefs: {}
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="row">
        <OrgUnitList />
        <MainArea />
      </div>
    </div>
  </ApolloProvider>
);

export default App;
