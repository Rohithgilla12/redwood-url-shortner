import { urls, url, createUrl, updateUrl, deleteUrl } from './urls'
import type { StandardScenario } from './urls.scenarios'

describe('urls', () => {
  scenario('returns all urls', async (scenario: StandardScenario) => {
    const result = await urls()

    expect(result.length).toEqual(Object.keys(scenario.url).length)
  })

  scenario('returns a single url', async (scenario: StandardScenario) => {
    const result = await url({ id: scenario.url.one.id })

    expect(result).toEqual(scenario.url.one)
  })

  scenario('creates a url', async () => {
    const result = await createUrl({
      input: { longUrl: 'String', slug: 'String5202037' },
    })

    expect(result.longUrl).toEqual('String')
    expect(result.slug).toEqual('String5202037')
  })

  scenario('updates a url', async (scenario: StandardScenario) => {
    const original = await url({ id: scenario.url.one.id })
    const result = await updateUrl({
      id: original.id,
      input: { longUrl: 'String2' },
    })

    expect(result.longUrl).toEqual('String2')
  })

  scenario('deletes a url', async (scenario: StandardScenario) => {
    const original = await deleteUrl({ id: scenario.url.one.id })
    const result = await url({ id: original.id })

    expect(result).toEqual(null)
  })
})
