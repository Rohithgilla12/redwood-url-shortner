import type { EditUrlById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import UrlForm from 'src/components/Url/UrlForm'

export const QUERY = gql`
  query EditUrlById($id: Int!) {
    url: url(id: $id) {
      id
      longUrl
      slug
      views
      createdAt
    }
  }
`
const UPDATE_URL_MUTATION = gql`
  mutation UpdateUrlMutation($id: Int!, $input: UpdateUrlInput!) {
    updateUrl(id: $id, input: $input) {
      id
      longUrl
      slug
      views
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ url }: CellSuccessProps<EditUrlById>) => {
  const [updateUrl, { loading, error }] = useMutation(UPDATE_URL_MUTATION, {
    onCompleted: () => {
      toast.success('Url updated')
      navigate(routes.urls())
    },
  })

  const onSave = (input, id) => {
    updateUrl({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Url {url.id}</h2>
      </header>
      <div className="rw-segment-main">
        <UrlForm url={url} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
