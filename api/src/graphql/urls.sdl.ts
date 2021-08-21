export const schema = gql`
  type Url {
    id: Int!
    longUrl: String!
    shortUrl: String!
    slug: String!
    views: Int!
    createdAt: DateTime!
  }

  type Query {
    urls: [Url!]!
    url(id: Int!): Url
  }

  input CreateUrlInput {
    longUrl: String!
    shortUrl: String!
    slug: String!
    views: Int!
  }

  input UpdateUrlInput {
    longUrl: String
    shortUrl: String
    slug: String
    views: Int
  }

  type Mutation {
    createUrl(input: CreateUrlInput!): Url!
    updateUrl(id: Int!, input: UpdateUrlInput!): Url!
    deleteUrl(id: Int!): Url!
  }
`
