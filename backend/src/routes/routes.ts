import { FastifyInstance } from 'fastify'
import { setupGroupsRoutes } from './groups'

export const setupRoutes = (app: FastifyInstance): void => {
  app.get('/api/health', (_req, res) => {
    res.send('yeah, im alive')
  })

  app.register(setupGroupsRoutes, { prefix: '/api' })
  return
}
