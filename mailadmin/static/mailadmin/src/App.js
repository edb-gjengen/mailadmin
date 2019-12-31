import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { RestLink } from 'apollo-link-rest';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { OrgUnitList, MainArea } from './components';

const restLink = new RestLink({ uri: '/api/' });
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <div className="row">
        <OrgUnitList />
        <MainArea />
      </div>
    </div>
  </ApolloProvider>
);

export default App;
