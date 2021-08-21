import UrlCell from 'src/components/Url/UrlCell'

type UrlPageProps = {
  id: Int
}

const UrlPage = ({ id }: UrlPageProps) => {
  return <UrlCell id={id} />
}

export default UrlPage
