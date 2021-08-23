export const schema = gql`
  type Url {
    id: Int!
    longUrl: String!
    slug: String!
    views: Int!
    createdAt: DateTime!
  }

  type Query {
    urls: [Url!]!
    url(id: Int!): Url
    findBySlug(slug: String!): Url
  }

  input CreateUrlInput {
    longUrl: String!
    slug: String!
    views: Int!
  }

  input UpdateUrlInput {
    longUrl: String
    slug: String
    views: Int
  }

  type Mutation {
    createUrl(input: CreateUrlInput!): Url!
    updateUrl(id: Int!, input: UpdateUrlInput!): Url!
    deleteUrl(id: Int!): Url!
    incrementViews(id: Int!, count: Int!): Url!
  }
`
