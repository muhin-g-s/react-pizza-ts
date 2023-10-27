import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { identity, pickBy } from "lodash";

import { Pizza, SearchPizzaParams } from "./type";

const getPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/getPizzaStatus',
    async (params) => {
        const {sortBy, order, category, search, currentPage} = params

        const {data} = await axios.get<Pizza[]>(`https://6529b84455b137ddc83f1cec.mockapi.io/api/v1/items`, {
            params : pickBy(
                {
                    page: currentPage,
                    limit: 4,
                    category,
                    sortBy,
                    order,
                    search
                },
                identity
            )
        })

        return data
    }
)

export default getPizza