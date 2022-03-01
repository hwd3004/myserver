import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    updateAccount(password: String, userName: String): MutationResponse!
  }
`;
