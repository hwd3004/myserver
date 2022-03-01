import { makeVar, ReactiveVar, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

// https://www.apollographql.com/docs/react/networking/authentication/#header
const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  console.log("authLink headers : ", headers);
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

export const TOKEN = "token";

// react variables 생성
// 사용은 NavBar.tsx
// export const loginStateVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
//
// https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
// nextjs에서 localStorage 사용법

export let loginStateVar: ReactiveVar<boolean>;

if (typeof window !== "undefined") {
  loginStateVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
}

//

export const userLogin = (token: any) => {
  localStorage.setItem(TOKEN, token);
  loginStateVar(true);
};

export const userLogout = () => {
  console.log("logout");
  localStorage.removeItem(TOKEN);
  loginStateVar(false);

  // state 초기화를 위해 리로드
  window.location.reload();
};
