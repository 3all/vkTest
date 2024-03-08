import { ApiEndpoints, ApiMethods } from '../../../shared/src/apiSchema'

export type ApiHandler<Endpoint extends ApiEndpoints> = {
  Body: ApiMethods[Endpoint]['request']
  Reply: ApiMethods[Endpoint]['response']
}
