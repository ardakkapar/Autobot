import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const httpsLink = new HttpLink({
  uri: 'https://current-bluegill-39.hasura.app/v1/graphql',
  headers: {
    'Content-Type' : 'application/json',
    'x-hasura-admin-secret' : 'EuOsoOJSB4H251dp33BGhpZIaUQ9DxhdIMwyB5gm1YUDW3Q7bWyg2cFa3w2r0tH4',
    'Access-Control-Allow-Origin' : 'no-cors'
  }
});

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpsLink
  });
};

const client = createApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);





