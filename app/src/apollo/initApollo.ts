import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "apollo-boost";
import { HttpLink } from "apollo-link-http";

const URI = 'https://colourlovers-graphql-api.herokuapp.com/graphql';

const link = new HttpLink({
  uri: URI
})

function configureApolloClient(initialState: any = {}) {
  return new ApolloClient<NormalizedCacheObject>({
    link: link,
    cache: new InMemoryCache().restore(initialState)
  })
}

export default function initApollo(initialState: any = {}) {
  return configureApolloClient(initialState)
}