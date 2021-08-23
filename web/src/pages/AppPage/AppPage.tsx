import { MetaTags } from '@redwoodjs/web'
import FindBySlugCell from 'src/components/FindBySlugCell'
import AppPageLayout from '../../layouts/AppPageLayoutLayout/AppPageLayoutLayout'
import NewUrlPage from '../Url/NewUrlPage/NewUrlPage'

type AppPageProps = {
  slug?: string
}

const AppPage = ({ slug }: AppPageProps) => {
  return (
    <AppPageLayout>
      <MetaTags title="App" />
      <h1>URL shortner App</h1>
      {slug && <FindBySlugCell id={slug} />}
      <NewUrlPage />
    </AppPageLayout>
  )
}

export default AppPage
