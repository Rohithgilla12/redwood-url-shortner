import type { FindUrlById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Url from 'src/components/Url/Url'

export const QUERY = gql`
  query FindUrlById($id: Int!) {
    url: url(id: $id) {
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

export const Empty = () => <div>Url not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ url }: CellSuccessProps<FindUrlById>) => {
  return <Url url={url} />
}
