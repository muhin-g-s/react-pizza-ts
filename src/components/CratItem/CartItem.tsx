import React from "react"
import { useDispatch } from "react-redux"
import { addItem, minusItem, removeItem } from "../../storages/cart/slice"
import { FC } from "react"
import { CartItemType } from "../../storages/cart/type"

type CartItemProps = {
    id : string
    title : string
    price : number
    img : string
    currentType : number
    currentSize : number
    count : number
}


const CartItem : FC<CartItemProps> = ({
    id,
    title,
    price,
    img,
    currentType,
    currentSize,
    count}) => {

    const dispatcher = useDispatch()

    const onClickPlus = () => {
        dispatcher(
            addItem({
                id,
            } as CartItemType))
    }

    const onClickPMinus = () => {
        dispatcher(minusItem(id))
    }

    const onClickRemove = () => {
        if(window.confirm("elf"))
            dispatcher(removeItem(id))
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={img}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>{currentType}{currentSize}</p>
            </div>
            <div className="cart__item-count">
                <div className="button button--outline button--circle cart__item-count-minus" onClick={onClickPMinus}>
                </div>
                <b>{count}</b>
                <div className="button button--outline button--circle cart__item-count-plus" onClick={onClickPlus}>
                </div>
            </div>
            <div className="cart__item-price">
                <b>{price}</b>
            </div>
            <div className="cart__item-remove" onClick={onClickRemove}>
                <div className="button button--outline button--circle">
                </div>
            </div>
        </div>
    )
}

export default CartItem