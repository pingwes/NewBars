import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://heroku-nodejs-11.herokuapp.com/graphql',
  // uri: 'https://bdlctfsevmpwqmyhqufe.nhost.run/v1/graphql',
  cache: new InMemoryCache(),
});