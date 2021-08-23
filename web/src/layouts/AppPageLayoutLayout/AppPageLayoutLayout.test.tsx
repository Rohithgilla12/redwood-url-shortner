import { render } from '@redwoodjs/testing/web'

import AppPageLayoutLayout from './AppPageLayoutLayout'

describe('AppPageLayoutLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppPageLayoutLayout />)
    }).not.toThrow()
  })
})
