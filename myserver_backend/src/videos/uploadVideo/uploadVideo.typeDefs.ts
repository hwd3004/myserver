import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type Mutation {
    uploadVideo(title: String!, attachment: Upload!, caption: String!, artist: String!): MutationResponse!
  }
`;
