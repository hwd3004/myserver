import { gql } from "apollo-server-express";

export default gql`
  type Query {
    watchVideo(id: Int!): MutationResponse!
  }
`;
