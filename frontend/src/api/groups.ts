import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { baseApiRequest } from './baseApiRequest'
import { GetGroupsResponse } from '../../../shared/src/apiSchema'

export const useGetGroups = () => {
  const options: UseQueryOptions<GetGroupsResponse> = {
    queryKey: [`groups`],
    queryFn: () => baseApiRequest({ url: '/groups' }),
  }

  return useQuery<GetGroupsResponse>(options)
}
