import { RootState } from "../store"

export const selectFilter = (state : RootState) => state.persistedReduser.filter
export const selectSort = (state : RootState) =>state.persistedReduser.filter.sort