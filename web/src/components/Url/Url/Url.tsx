import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_URL_MUTATION = gql`
  mutation DeleteUrlMutation($id: Int!) {
    deleteUrl(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Url = ({ url }) => {
  const [deleteUrl] = useMutation(DELETE_URL_MUTATION, {
    onCompleted: () => {
      toast.success('Url deleted')
      navigate(routes.urls())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete url ' + id + '?')) {
      deleteUrl({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Url {url.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{url.id}</td>
            </tr>
            <tr>
              <th>Long url</th>
              <td>{url.longUrl}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{url.slug}</td>
            </tr>
            <tr>
              <th>Views</th>
              <td>{url.views}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(url.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUrl({ id: url.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(url.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Url
