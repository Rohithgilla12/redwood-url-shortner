import type { FindBySlugQuery } from 'types/graphql'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useEffect } from 'react'

export const QUERY = gql`
  query FindBySlugQuery($id: String!) {
    findBySlug: findBySlug(slug: $id) {
      id
      longUrl
      slug
      views
      createdAt
    }
  }
`

const INCREMENT_VIEWS = gql`
  mutation IncrementViewMutation($id: Int!, $count: Int!) {
    incrementViews: incrementViews(id: $id, count: $count) {
      id
      longUrl
      slug
      views
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ findBySlug }: CellSuccessProps<FindBySlugQuery>) => {
  const [increment] = useMutation(INCREMENT_VIEWS)
  useEffect(() => {
    increment({
      variables: {
        id: findBySlug.id,
        count: findBySlug.views + 1,
      },
    })
    window.location.href = findBySlug.longUrl
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findBySlug.id])

  return <div>{JSON.stringify(findBySlug)}</div>
}
