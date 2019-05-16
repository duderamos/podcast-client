import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App.js';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: 'http://lvh.me:3000/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('app')
);
