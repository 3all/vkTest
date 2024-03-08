import { FastifyReply, FastifyRequest } from 'fastify'
import { promises as fs } from 'fs'
import path from 'path'
import { GetGroupsResponse } from '../../../../shared/src/apiSchema'
import { GenerateRandomNumber } from '../../utils/randomNumberGenerator'
import { delay } from '../../utils/delay'

export const getGroupsHandler = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<GetGroupsResponse | void> => {
  await delay(1)

  try {
    const randomNumber = GenerateRandomNumber(100)
    let response: GetGroupsResponse | undefined = undefined
    const groupsJsonPath = path.join(__dirname, 'groups.json')
    const data = await fs.readFile(groupsJsonPath, 'utf8')

    const groups = JSON.parse(data)

    if (randomNumber < 8) {
      response = {
        result: 0,
        data: undefined,
      }
    }

    if (randomNumber >= 8 && randomNumber < 16) {
      response = {
        result: 1,
        data: undefined,
      }
    }

    if (randomNumber >= 16) {
      response = {
        result: 1,
        data: groups,
      }
    }

    return res.send(response)
  } catch (error) {
    console.error(error)
    return res.code(500).send({ message: 'Internal server error' })
  }
}
