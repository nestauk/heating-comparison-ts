import { ApolloClient } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { httpLink } from './apollo-http-link';
import { errorLink } from './apollo-error-link';
import { localCache } from './apollo-local-cache';


export const apolloClient = new ApolloClient({
  link: ApolloLink.from([(errorLink as any), (httpLink as any)]) as ApolloLink,
  connectToDevTools: process.env.NODE_ENV !== 'production',
  cache: localCache,
  assumeImmutableResults: true,
});