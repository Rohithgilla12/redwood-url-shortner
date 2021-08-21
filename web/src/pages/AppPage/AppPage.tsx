import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import FindBySlugCell from 'src/components/FindBySlugCell'

type AppPageProps = {
  slug?: string
}

const AppPage = ({ slug }: AppPageProps) => {
  return (
    <>
      <MetaTags
        title="App"
        // description="App description"
        /* you should un-comment description and add a unique description, 155 characters or less
        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <h1>AppPage</h1>
      {slug && <FindBySlugCell id={slug} />}
      <p>
        Find me in <code>./web/src/pages/AppPage/AppPage.tsx</code>
      </p>
      <p>
        My default route is named <code>app</code>, link to me with `
        <Link to={routes.app()}>App</Link>`
      </p>
    </>
  )
}

export default AppPage
