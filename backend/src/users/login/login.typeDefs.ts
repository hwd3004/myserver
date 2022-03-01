import { gql } from "apollo-server-express";

export default gql`
  type LoginResult {
    result: Boolean!
    token: String
    error: String
  }

  type Query {
    login(userId: String!, password: String!): LoginResult!
  }
`;
