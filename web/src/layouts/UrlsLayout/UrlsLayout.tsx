import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type UrlLayoutProps = {
  children: React.ReactNode
}

const UrlsLayout = ({ children }: UrlLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.urls()} className="rw-link">
            Urls
          </Link>
        </h1>
        <Link to={routes.newUrl()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Url
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UrlsLayout
