import EditUrlCell from 'src/components/Url/EditUrlCell'

type UrlPageProps = {
  id: number
}

const EditUrlPage = ({ id }: UrlPageProps) => {
  return <EditUrlCell id={id} />
}

export default EditUrlPage
