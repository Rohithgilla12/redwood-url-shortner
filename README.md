## Develop URL shortener application with RedwoodJS

## Introduction

### What is RedwoodJS

Redwood is is built on React, GraphQL, and Prisma, Redwood works with the components and development workflow, but with simple conventions and helpers to make your experience even better, this is opinionated.

To keep it simple, let's use the tag line which they go by.

"Bringing full-stack to the Jamstack"

Redwood is really a vast framework,this blog post will try to cover the most important concepts of it.

![https://d33wubrfki0l68.cloudfront.net/b7d16f7f3654fb8572360301e60d76df254a323e/385ec/img/svg/architecture.svg](https://d33wubrfki0l68.cloudfront.net/b7d16f7f3654fb8572360301e60d76df254a323e/385ec/img/svg/architecture.svg)

Image taken from [https://jamstack.org/](https://jamstack.org/)

### What are we building now

We will be building a small URL shortener service, we will focus less on UI and functionality aspect of the shortener as a whole and concentrate more on RedwoodJS.

### Bird eye view of technologies being used

We will be working with the following technologies in the tutorial

- RedwoodJS
- Tailwind
- GraphQL
- Prisma

Just to put it in simple words, `HOSTURL/:slug` will add a view to the local database and redirect to the desired website.

If you are developing locally the `HOSTURL` would be `[localhost:8910](http://localhost:8910)` and the `:slug` can be anything.

Simple example:

`[localhost:8910/gilla-twitter](http://localhost:8910/gilla-twitter)` should redirect to my twitter profile.

P.S Don't worry even if you don't know anything, our objective will be to cover them below.

## Development

In this section we would be going over the development process.

### Create Redwood project

As with any modern framework, Redwood comes with a project generator.

Redwood supports both `TypeScript` and `JavaScript`, you can use the required language of your choice, for this tutorial we will be going with `TypeScript`

For JS

`yarn create redwood-app ./redwood-url-shortner`

[Warp](https://app.warp.dev/NEnD3K)

For TS

`yarn create redwood-app --typescript redwood-url-shortner`

[Warp](https://app.warp.dev/APAVaE)

This will generate the base project for us with `sqlite` database, which we can swap with just a few changes.

You can follow [this](https://redwoodjs.com/docs/local-postgres-setup) to get it up and running locally, for deployment you can use services such as [heroku](https://dashboard.heroku.com/) or [railway](http://railway.app/).

In this tutorial we will stick to `sqlite` database as we won't be performing deployment.

### Understanding the high level structure of the application

On the high level you could see two repositories, `web` and `api` which are two workspaces in `yarn` terminology.

In in `web` we have our Frontend of the application and in `api` the GraphQL backend resides.

[Web Directory](https://www.notion.so/bced27fb30844d3faec896a9d42cb549)

The other files are simple, like the `css` `html` and the `.ts/.js` files.

Now the way yarn workspaces works on installing dependencies are is as follows.

`yarn workspace <space name> add <dependency name>`

Say for installing axios in web workspace, the command would be

`yarn workspace web app axios`

Note: `rw` is shorthand for `redwood` cli.

### Adding Tailwind

Now that we understand the application at a high level, we need to include our custom webpack configuration.

Redwood supports that too, you can check it out [here](https://redwoodjs.com/docs/webpack-configuration.html).

Redwood can include the Tailwind CSS in just a single command line code, this takes care of all the production ready configuration for Tailwind CSS. 

This is the command to setup the Tailwind, you could see the sample output in the warp link below.

`yarn rw setup tailwind`

[Warp](https://app.warp.dev/WKeAdK)

Please remember to restart your `yarn rw dev` server after adding tailwind.

### Creating new page

We need to generate the page for the home, currently it shows redwood home page.

The following command is used for doing so, you can also find sample output of the terminal.

`yarn rw g page app /`

[Warp](https://app.warp.dev/NEnD3K)

- `g` is the shorthand for `generate`
- `page` is used for generating pages
- `app` is the name of the components and pages that will be generated.
- `/` is the route path.

In the `Routes.ts` files, the main change will be reflected.

`localhost:8910` will now show the home page after this command.

In the `AppPageLayout` (if generated or else you can generate it)

You can use this simple layout to have good padding around the content.

```tsx
type AppPageLayoutProps = {
  children?: React.ReactNode
}

const AppPageLayout = ({ children }: AppPageLayoutProps) => {
  return <div className="p-8 h-screen bg-blue-200">{children}</div>
}

export default AppPageLayout
```

### Prisma model for the `UrlScheme`

Create the prisma model for the URL Shortener, the model contains the following values.

```tsx
model Url {
  id        Int      @id @default(autoincrement())
  longUrl   String
  slug      String   @unique
  views     Int      @default(0)
  createdAt DateTime @default(now())
}
```

We will try to keep it as simple as possible, now the migrations need to be applied to the database, for this there is a command in `rw` cli.

This command is used for creating and applying the migration.

`yarn rw prisma migrate dev`

[Warp](https://app.warp.dev/8K2RwK)

### Generating Scaffold

Now this is where the actual Redwood magic starts, as we discussed earlier we will concentrate on generating the scaffold.

`yarn rw generate scaffold url`

[Warp](https://app.warp.dev/6E7pw5)

The above command generates

- CRUD in the `api` folder
- Components, Layouts, Cells for the `web` folder.
- GraphQL schema definition files.

If you visit the `/urls/new` page, you can check the form to add data has already been created, and you can start adding the data.

![https://res.cloudinary.com/rohith-gilla/image/upload/v1629722780/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.16.14_PM_mdlln3.png](https://res.cloudinary.com/rohith-gilla/image/upload/v1629722780/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.16.14_PM_mdlln3.png)

Once added the data head over to `/urls` page (you would be automatically redirected here, if not visit it manually in the browser)

The page would look something like this.

![https://res.cloudinary.com/rohith-gilla/image/upload/v1629722758/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.15.50_PM_cx8vnp.png](https://res.cloudinary.com/rohith-gilla/image/upload/v1629722758/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.15.50_PM_cx8vnp.png)

The `Show` , `Edit` and `Delete` function works, the CRUD are already all wired in.

`api/src/graphql` is something you can spend time exploring, you can also launch the GraphQL playground using `localhost:8911/graphql`

### Understanding Cell Architecture

There is a lot of terminology of `Cell` that is going around, there are a few definitions on the official docs and other places. To put it in simple words let's understand by a quick example.

For any API call the frontend makes, there is always four main possibilities `Success` , `Empty` , `Failure` and `Loading`

So we need three different UIs for the following states based on the design requirements.

The `Cell` is a high order component where you can export 4 components 

- Loading
- Empty
- Failure
- Success

The use of just the cell component for example,`<UrlsCell/>`

Just usage of this component on the code would be enough, the states and rendering the particular state will be taken care by redwood.

Which means if the API call is success it renders the `Success` component, when it is loading it renders the `Loading` component and so o

### Writing custom SDLs

For most of the cases the CRUD will be enough, but for a few cases there is a requirement for having custom queries.

We have a need for custom query, we need to find the `longUrl` which needs to be redirected to from the `slug` we have.

The CRUD which we already have can get the data based on the `id` and not slug.

For this 

- Add the required function in the `services/` folder

    Here we are dealing with the `urls` so we add the following in `api/src/services/urls/urls.ts` file.

    ```tsx
    export const findBySlug = ({ slug }: Prisma.UrlWhereUniqueInput) => {
    return db.url.findUnique({ where: { slug } })
    }
    ```

- Add the `findBySlug` in the Schema definition file.

    In the case of us we need to modify the following  file `api/src/graphql/urls.sdl.ts` as

    ```tsx
    type Query {
        urls: [Url!]!
        url(id: Int!): Url
        findBySlug(slug: String!): Url // Added
      }
    ```

- We need to create a custom cell, because we also need to handle case of incrementing the view count, if you notice our schema definition there is a `views` field, the `FindBySlug` will be discussed in the section below.

### Creating the `FindBySlug` cell

As we have done earlier, the `scaffold` command generates many things which also includes cells.

To generate cel alone without any other side files generated, there is a command to do that.

You can find the command and it's sample output below.

`yarn rw g cell FindBySlug`

[Warp](https://app.warp.dev/XKmXp5)

Once the required files are generated, in the main `FindBySlugCell.tsx` file.

There is a `QUERY` variable, this is the query that will be run and based on the result the states will be rendered.

```tsx
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
```

Now for testing this implementation we need to wire this component in the `AppPage.tsx` file that was generated with the `page` command we used.

The `AppPage.tsx` would look similar to this.

```tsx
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
    </AppPageLayout>
  )
}

export default AppPage
```

Note that we are taking in props of `slug` , we take this `slug` from the URL bar, so this needs to be handled in `Routes.tsx` file.

```tsx
<Route path="/{slug:String}" page={AppPage} name="app" />
```

This line will ensure to load `AppPage` component on `/:slug`.

Please note that how well the type checking and safety is, really great stuff.

Now on hitting the url which you have created, the page would look something similar to this.

![https://res.cloudinary.com/rohith-gilla/image/upload/v1629723173/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.22.46_PM_c7yzxh.png](https://res.cloudinary.com/rohith-gilla/image/upload/v1629723173/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.22.46_PM_c7yzxh.png)

Ignore the part of the image where you see `New URL` form in the page.

But the `json` data can be seen on the page.

### Putting everything together.

Now, we need to add a new count to the views and also redirect the user after that.

Again repeating the drill for adding new custom GraphQL query.

- Add the following in `urls.ts` file

    ```tsx
    interface UpdateViewArgs extends Prisma.UrlWhereUniqueInput {
      count: number
    }

    export const incrementViews = ({ id, count }: UpdateViewArgs) => {
      return db.url.update({
        where: { id },
        data: { views: count },
      })
    }
    ```

- Modify the `sdl` file by adding this

    ```tsx
    type Mutation {
        createUrl(input: CreateUrlInput!): Url!
        updateUrl(id: Int!, input: UpdateUrlInput!): Url!
        deleteUrl(id: Int!): Url!
        incrementViews(id: Int!, count: Int!): Url!
      }
    ```

You can check the `incrementViews` in the GraphQL playground, attaching image below to show how it looks.

![https://res.cloudinary.com/rohith-gilla/image/upload/v1629724109/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.38.18_PM_gpdwxj.png](https://res.cloudinary.com/rohith-gilla/image/upload/v1629724109/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.38.18_PM_gpdwxj.png)

In the `FindBySlugCell.tsx` we will be adding another GraphQL mutation.

```tsx
const INCREMENT_VIEWS = gql`
  mutation IncrementViewMutation($id: Int!, $count: Int!) {
    incrementViews: incrementViews(id: $id, count: $count) {
      id
      longUrl
      slug
      views
    }
  }

// in the success block
const [increment] = useMutation(INCREMENT_VIEWS)
useEffect(() => {
    increment({
      variables: {
        id: findBySlug.id,
        count: findBySlug.views + 1,
      },
    })
		// used for redirection 
    window.location.href = findBySlug.longUrl
  }, [findBySlug.id])
```

The overall file would look something like this.

```tsx
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
```

### Adding the form to the Home page.

By just adding the `<NewUrlPage />` which was generated for us can directly used as an component.

The overall `AppPage.tsx` component will look something like 

```tsx
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
      <div className="m-4">
        <NewUrlPage />
      </div>
    </AppPageLayout>
  )
}

export default AppPage
```

The application would be similar to this.

![https://res.cloudinary.com/rohith-gilla/image/upload/v1629723106/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.21.36_PM_tqrwfs.png](https://res.cloudinary.com/rohith-gilla/image/upload/v1629723106/Blog/RedwoodJS/Screenshot_2021-08-23_at_6.21.36_PM_tqrwfs.png)

## Code

### Github Repository

The application code can be found in the Github repo.

[GitHub - Rohithgilla12/redwood-url-shortner](https://github.com/Rohithgilla12/redwood-url-shortner)

## Next Steps

Wohoo, we have successfully created a Redwood JS application, thought this can be improved a lot, but the main objective of learning how to use RedwoodJS was covered.

### Deployment

Currently Redwood supports `Netlify` , `Vercel`, `AWS-Serverless` , `Render` as official supported targets.

`yarn rw deploy <place>` will create ready to deploy version of the project, also please note that backend needs to be deployed separately except for `Render`

There is a detailed explanation about different deploy methods [here](https://redwoodjs.com/docs/deploy.html#general-deployment-setup).

Now if you want an opinionated suggestion about deployment.

- Choose `Netlify` or `Vercel` for the Frontend deployment, if you don't have any personal preference choose the one which has more credits left :)
- Choose Heroku / Railway for the database, you can summon a Postgres db within a few clicks. Railway has pay as you go structure, you would be able to handle a decent amount of traffic in free tier itself,  Heroku you get 10k records in the DB in the free tier.

### Feeling Adventurous?

- Add Authentication to the existing application.
- Provide User dashboard, show the graph of views per day.
- Try to use the existing API and build a mobile application from it, please use [this](https://community.redwoodjs.com/t/using-graphql-envelop-helix-in-redwood-v0-35/2276) as reference for consuming API.

### More reading

- [Roadmap](https://redwoodjs.com/roadmap) is worth checking out, some really cool stuff are coming out.
- Official Docs can be found [here](https://redwoodjs.com/docs/introduction).
- Official Learning website can be find [here](https://learn.redwoodjs.com/docs/tutorial/welcome-to-redwood).
- Deep dive of API folder can be find [here](https://learn.redwoodjs.com/docs/tutorial/redwood-file-structure#the-api-directory).
- Deep dive of Web folder can be find [here](https://learn.redwoodjs.com/docs/tutorial/redwood-file-structure#the-web-directory).
- Deep dive on [cells](https://redwoodjs.com/docs/cells).

Thanks

Rohith Gilla
