import { useMemo } from 'react'
import { Group } from '../../../shared/src/apiSchema'
import { GlobalFilterStateType } from '../utils/filterState'

const useFilteredGroups = (
  groupsData: Group[],
  filterState: GlobalFilterStateType
): Group[] => {
  return useMemo<Group[]>(() => {
    let filteredGroups = groupsData || []

    if (filterState.filterIsPrivate) {
      filteredGroups = filteredGroups.filter((group) => group.closed)
    }

    if (filterState.filterIsPublic) {
      filteredGroups = filteredGroups.filter((group) => !group.closed)
    }

    if (filterState.filterAvatarColor.length !== 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filterState.filterAvatarColor.includes(group.avatar_color || 'gray')
      )
    }

    if (filterState.filterHasFriends) {
      filteredGroups = filteredGroups.filter(
        (group) => group.friends && group.friends.length > 0
      )
    }

    return filteredGroups
  }, [
    filterState.filterAvatarColor,
    filterState.filterHasFriends,
    filterState.filterIsPrivate,
    filterState.filterIsPublic,
    groupsData,
  ])
}

export default useFilteredGroups
