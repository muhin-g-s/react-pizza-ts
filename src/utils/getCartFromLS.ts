import { CartItemType } from "../storoges/cart/type"
import { calcTotalPrice } from "./calcTotalPrice"


export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items : CartItemType[] = []
    const totalPrice = calcTotalPrice(items)

    return {
        items,
        totalPrice
    }
}