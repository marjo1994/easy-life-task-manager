import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "./index.css";

const httpLink = new HttpLink({
  uri: "https://syn-api-prod.herokuapp.com/graphql",
});

const authLink = new SetContextLink(({ headers }) => {
  const token = import.meta.env.VITE_API_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  (window as any).__APOLLO_CLIENT__ = client;
  (window as any).gql = gql;
}

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
