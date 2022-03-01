import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createAccount(userId: String!, userName: String!, password: String!, email: String!): MutationResponse!
  }
`;
