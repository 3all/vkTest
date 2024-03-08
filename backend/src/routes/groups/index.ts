import { FastifyInstance } from 'fastify'
import { ApiHandler } from '../../config/ApiHandler'
import { getGroupsHandler } from './get'

export const setupGroupsRoutes = async (
  app: FastifyInstance
): Promise<void> => {
  app.get<ApiHandler<'groups'>>('/groups', getGroupsHandler)
}
