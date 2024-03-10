export type GlobalFilterStateType = {
  filterIsPrivate: boolean
  filterIsPublic: boolean
  filterAvatarColor: string[]
  filterHasFriends: boolean
}

export const initialFilterState: GlobalFilterStateType = {
  filterIsPrivate: false,
  filterIsPublic: false,
  filterAvatarColor: [],
  filterHasFriends: false,
}
