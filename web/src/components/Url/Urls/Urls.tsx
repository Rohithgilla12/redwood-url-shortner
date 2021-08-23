import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Url/UrlsCell'

const DELETE_URL_MUTATION = gql`
  mutation DeleteUrlMutation($id: Int!) {
    deleteUrl(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const UrlsList = ({ urls }) => {
  const [deleteUrl] = useMutation(DELETE_URL_MUTATION, {
    onCompleted: () => {
      toast.success('Url deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete url ' + id + '?')) {
      deleteUrl({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Long url</th>
            <th>Slug</th>
            <th>Views</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{truncate(url.id)}</td>
              <td>{truncate(url.longUrl)}</td>
              <td>{truncate(url.slug)}</td>
              <td>{truncate(url.views)}</td>
              <td>{timeTag(url.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.url({ id: url.id })}
                    title={'Show url ' + url.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUrl({ id: url.id })}
                    title={'Edit url ' + url.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete url ' + url.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(url.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UrlsList
