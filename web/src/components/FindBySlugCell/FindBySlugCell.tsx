import type { FindBySlugQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindBySlugQuery($id: String!) {
    findBySlug: findBySlug(slug: $id) {
      id
      longUrl
      shortUrl
      slug
      views
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ findBySlug }: CellSuccessProps<FindBySlugQuery>) => {
  return <div>{JSON.stringify(findBySlug)}</div>
}
