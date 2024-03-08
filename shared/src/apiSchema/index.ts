import { GroupsMethods } from './posts'

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type ApiMethods = GroupsMethods

export type ApiEndpoints = keyof ApiMethods

export * from './posts'
