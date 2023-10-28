import { createSlice } from "@reduxjs/toolkit"
import { PizzaSliceType, Status } from "./type"
import getPizza from "./fetch"


const initialState : PizzaSliceType = {
    items : [],
    status: Status.LOADING
}

const pizzaSlice = createSlice({
    name : 'pizza',
    initialState,

    reducers: {
        setItems(state, action){
            state.items = action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getPizza.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        })

        builder.addCase(getPizza.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        })

        builder.addCase(getPizza.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer