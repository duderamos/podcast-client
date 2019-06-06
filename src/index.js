import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App.js';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './main.css';

const client = new ApolloClient({ uri: 'http://192.168.2.185:3000/api' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('app')
);
