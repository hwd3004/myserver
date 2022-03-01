import { gql } from "apollo-server-express";

export default gql`
  type Video {
    id: Int!
    title: String!
    attachment: String!
    attachmentUrl: String!
    caption: String!

    user: User!
    # userId: Int!
    # userId는 실제 DB에서 필요하고, graphql에선 필요없다

    createdAt: String!
    updatedAt: String!
    hashtags: [Hashtag]

    artist: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    videos: [Video]
    createdAt: String!
    updatedAt: String!
  }

  type Artist {
    id: Int!
    artist: String!
    videos: [Video]
    createdAt: String!
    updatedAt: String!
  }

  type VideoList {
    videos: [Video]
    totalPage: Int
  }

  type Query {
    videos(skip: Int, take: Int): [Video]
    videoList(skip: Int, take: Int): VideoList
  }
`;
