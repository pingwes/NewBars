import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://bdlctfsevmpwqmyhqufe.nhost.run/v1/graphql',
  cache: new InMemoryCache(),
});