import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import type { DocumentNode } from "graphql";

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
    gql: (
      literals: TemplateStringsArray,
      ...placeholders: any[]
    ) => DocumentNode;
  }
}
