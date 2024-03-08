import Fastify, { FastifyInstance } from 'fastify'
import hyperid from 'hyperid'
import cors from '@fastify/cors'
import { setupRoutes } from './routes/routes'

const PORT = 3000

const setupHTTPServer = async (app: FastifyInstance): Promise<void> => {
  setupRoutes(app)

  await app.ready()

  await app.listen({
    port: PORT,
  })

  console.log('Everything is working fine on 3000')

  return
}

const main = async () => {
  try {
    const app = Fastify({
      bodyLimit: 4 * 1024 * 1024 * 1024,
      genReqId: () => {
        const inst = hyperid()
        return inst.uuid
      },
    })

    await app.register(cors)

    await setupHTTPServer(app)
  } catch (e) {
    console.error('Fatal')
  }
}

main()
