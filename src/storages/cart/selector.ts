import { RootState } from "../store"

export const selectCart = (state : RootState) => state.persistedReduser.cart
export const selectCartItemById = (id : string) => (state :RootState) => state.persistedReduser.cart.items.find((o) => o.id === id)