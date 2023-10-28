import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItemType, CartSliceState } from "./type";


const initialState : CartSliceState = {
    totalPrice  : 0,
    items : []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action : PayloadAction<CartItemType>) {
            const findItem = state.items.find((o) => o.id === action.payload.id)

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items)
        },

        minusItem(state, action : PayloadAction<string>) {
            const findItem = state.items.find((o) => o.id === action.payload)

            if (findItem && findItem.count > 0) {
                findItem.count--
                state.totalPrice = calcTotalPrice(state.items)
            }

            if (findItem?.count === 0) {
                state.items = state.items.filter((o) => o.id !== action.payload)
                state.totalPrice = calcTotalPrice(state.items)
            }
        },

        removeItem(state, action : PayloadAction<string>) {
            state.items = state.items.filter((o) => o.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },

        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;