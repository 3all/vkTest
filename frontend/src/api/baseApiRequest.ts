import axios from 'axios'
import {
  ApiEndpoints,
  ApiMethods,
  Methods,
} from '../../../shared/src/apiSchema'
import { API_URL } from '../config/constants'

interface BaseApiRequestOptions<T extends ApiEndpoints> {
  url: `/${T}`
  method?: Methods
  data?: ApiMethods[T]['request']
}

export async function baseApiRequest<T extends ApiEndpoints>({
  url,
  method = 'GET',
  data,
}: BaseApiRequestOptions<T>): Promise<ApiMethods[T]['response']> {
  const apiUrl = `${API_URL}${url}`

  try {
    const response = await axios({
      method,
      url: apiUrl,
      data,
    })

    return response.data as Promise<ApiMethods[T]['response']>
  } catch (error) {
    throw new Error(`Request failed: ${error}`)
  }
}
