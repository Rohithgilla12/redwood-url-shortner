import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UrlForm from 'src/components/Url/UrlForm'

const CREATE_URL_MUTATION = gql`
  mutation CreateUrlMutation($input: CreateUrlInput!) {
    createUrl(input: $input) {
      id
    }
  }
`

const NewUrl = () => {
  const [createUrl, { loading, error }] = useMutation(CREATE_URL_MUTATION, {
    onCompleted: () => {
      toast.success('Url created')
      navigate(routes.urls())
    },
  })

  const onSave = (input) => {
    createUrl({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Url</h2>
      </header>
      <div className="rw-segment-main">
        <UrlForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUrl
