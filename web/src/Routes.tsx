// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import UrlsLayout from 'src/layouts/UrlsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={UrlsLayout}>
        <Route path="/urls/new" page={UrlNewUrlPage} name="newUrl" />
        <Route path="/urls/{id:Int}/edit" page={UrlEditUrlPage} name="editUrl" />
        <Route path="/urls/{id:Int}" page={UrlUrlPage} name="url" />
        <Route path="/urls" page={UrlUrlsPage} name="urls" />
      </Set>
      <Route path="/" page={AppPage} name="app" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
