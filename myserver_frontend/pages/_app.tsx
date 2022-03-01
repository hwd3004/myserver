import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import client from "../src/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  // const client = new ApolloClient({
  //   uri: "http://localhost:4000/graphql",
  //   cache: new InMemoryCache(),
  // });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
