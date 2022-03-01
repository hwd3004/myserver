import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    userId: String!
    userName: String!
    password: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
  }
`;
