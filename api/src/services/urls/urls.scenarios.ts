import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UrlCreateArgs>({
  url: {
    one: { longUrl: 'String', shortUrl: 'String', slug: 'String785008' },
    two: { longUrl: 'String', shortUrl: 'String', slug: 'String5087676' },
  },
})

export type StandardScenario = typeof standard
