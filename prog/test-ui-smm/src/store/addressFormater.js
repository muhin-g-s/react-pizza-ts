import axios from 'axios'
import { defineStore } from 'pinia'

const API_KEY = "7cd46530898b1993c7cdc73d22d9f32ef573a4e8"
const SECRET_KEY = "d62bcd299282bd41c5056eb88cf1908951556469"
const URL = "https://cleaner.dadata.ru/api/v1/clean/address"

const $api = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + API_KEY,
        "X-Secret": SECRET_KEY
    },
    baseURL: URL
})

export const useAddressStore = defineStore('address', {
    state: () => ({ correctAddress : "" }),
    actions: {
        async setCorrectAddress(address) {

            const {data} = await $api.post(URL, {address})
            console.log(data)
            this.correctAddress = address
        }
    }
})