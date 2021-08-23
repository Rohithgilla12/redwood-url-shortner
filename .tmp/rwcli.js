
  const proxyquire = require("proxyquire")
  const fs = require('fs')
  const path = require('path')
  const files = {}
  const fileOverrides = {"file:///Users/rohithgilla/Desktop/Life/Web_Devolopment/redwood-todo-app/web/src/components/FindBySlugCell/FindBySlugCell.tsx":"import type { FindBySlugQuery } from 'types/graphql'\nimport type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'\n\nexport const QUERY = gql`\n  query FindBySlugQuery($id: String!) {\n    findBySlug: findBySlug(slug: $id) {\n      id\n      longUrl\n      shortUrl\n      slug\n      views\n      createdAt\n    }\n  }\n`\n\nexport const Loading = () => <div>Loading...</div>\n\nexport const Empty = () => <div>Empty</div>\n\nexport const Failure = ({ error }: CellFailureProps) => (\n  <div style={{ color: 'red' }}>Error: {error.message}</div>\n)\n\nexport const Success = ({ findBySlug }: CellSuccessProps<FindBySlugQuery>) => {\n  // add mutation query to add a view\n  // window.location.href = findBySlug.longUrl\n  return <div>{JSON.stringify(findBySlug)}</div>\n}\n","file:///Users/rohithgilla/Desktop/Life/Web_Devolopment/redwood-todo-app/web/src/components/Url/NewUrl/NewUrl.tsx":"import { useMutation } from '@redwoodjs/web'\nimport { toast } from '@redwoodjs/web/toast'\nimport { navigate, routes } from '@redwoodjs/router'\nimport UrlForm from 'src/components/Url/UrlForm'\n\nconst CREATE_URL_MUTATION = gql`\n  mutation CreateUrlMutation($input: CreateUrlInput!) {\n    createUrl(input: $input) {\n      id\n    }\n  }\n`\n\nconst NewUrl = () => {\n  const [createUrl, { loading, error }] = useMutation(CREATE_URL_MUTATION, {\n    onCompleted: () => {\n      toast.success('Url created')\n      navigate(routes.urls())\n    },\n  })\n\n  const onSave = (input) => {\n    createUrl({ variables: { input } })\n  }\n\n  return (\n    <div className=\"rw-segment\">\n      <header className=\"rw-segment-header\">\n        <h2 className=\"rw-heading rw-heading-secondary\">New Url</h2>\n      </header>\n      <div className=\"rw-segment-main\">\n        <UrlForm onSave={onSave} loading={loading} error={error} />\n      </div>\n    </div>\n  )\n}\n\nexport default NewUrl\n","file:///Users/rohithgilla/Desktop/Life/Web_Devolopment/redwood-todo-app/web/src/pages/AppPage/AppPage.tsx":"import { Link, routes } from '@redwoodjs/router'\nimport { MetaTags } from '@redwoodjs/web'\nimport FindBySlugCell from 'src/components/FindBySlugCell'\n\ntype AppPageProps = {\n  slug?: string\n}\n\nconst AppPage = ({ slug }: AppPageProps) => {\n  return (\n    <>\n      <MetaTags\n        title=\"App\"\n        // description=\"App description\"\n        /* you should un-comment description and add a unique description, 155 characters or less\n        You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */\n      />\n      <h1>AppPage</h1>\n      {slug && <FindBySlugCell id={slug} />}\n      <p>\n        Find me in <code>./web/src/pages/AppPage/AppPage.tsx</code>\n      </p>\n      <p>\n        My default route is named <code>app</code>, link to me with `\n        <Link to={routes.app()}>App</Link>`\n      </p>\n    </>\n  )\n}\n\nexport default AppPage\n"}
  const FILE_SCHEME = 'file://'

  function URL_file(f) {
    if (f.startsWith(FILE_SCHEME))
      f = f.substr(FILE_SCHEME.length)
    return new URL(FILE_SCHEME + path.normalize(f)).href
  }

  proxyquire('@redwoodjs/cli/dist', {
    fs: {
      mkdir() {},
      mkdirSync(...args) {},
      writeFile(a, b) {
        files[URL_file(a)] = b
      },
      writeFileSync(a, b) {
        files[URL_file(a)] = b
      },
      readFileSync(...args) {
        const f = URL_file(args[0])
        if (fileOverrides[f]) return fileOverrides[f]
        return fs.readFileSync.apply(fs, args)
      },
      '@global': true,
    },
  })

  process.on('exit', () => {
    console.log("---------===----===--------")
    console.log(JSON.stringify(files, null, 2))
  })
  