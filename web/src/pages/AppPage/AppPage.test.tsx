import { render } from '@redwoodjs/testing/web'

import AppPage from './AppPage'

describe('AppPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppPage />)
    }).not.toThrow()
  })
})
