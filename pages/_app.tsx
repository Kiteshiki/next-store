import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}
