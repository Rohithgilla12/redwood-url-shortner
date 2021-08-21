import type { Prisma } from '@prisma/client'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const urls = () => {
  return db.url.findMany()
}

export const url = ({ id }: Prisma.UrlWhereUniqueInput) => {
  return db.url.findUnique({
    where: { id },
  })
}

interface CreateUrlArgs {
  input: Prisma.UrlCreateInput
}

export const createUrl = ({ input }: CreateUrlArgs) => {
  return db.url.create({
    data: input,
  })
}

interface UpdateUrlArgs extends Prisma.UrlWhereUniqueInput {
  input: Prisma.UrlUpdateInput
}

export const updateUrl = ({ id, input }: UpdateUrlArgs) => {
  return db.url.update({
    data: input,
    where: { id },
  })
}

export const deleteUrl = ({ id }: Prisma.UrlWhereUniqueInput) => {
  return db.url.delete({
    where: { id },
  })
}
