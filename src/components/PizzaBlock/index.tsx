import React from "react"
import { FC, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemById } from "../../storages/cart/selector";
import { addItem } from "../../storages/cart/slice";

type PizzaBlockType = {
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    id: string
}


const PizzaBlock: FC<PizzaBlockType> = ({ imageUrl, title, types, sizes, price, id }) => {

    const [type, setType] = useState<number>(5)
    const [size, setSize] = useState<number>(5)

    const dispatcher = useDispatch()
    const cartItem = useSelector(selectCartItemById(id))

    const onClickType = (e: number) => e === type ? setType(5) : setType(e)
    const onClickSize = (e: number) => e === size ? setSize(5) : setSize(e)

    const onClickAdd = () => {

        const count = 1
        const item = {
            id,
            title,
            price,
            imageUrl,
            type,
            size,
            count
        }
        dispatcher(addItem(item))
    }

    const dough = ["традиционное", "тонкое"]

    const addCount = cartItem ? cartItem.count : 0
    

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((e, index) => (
                        <li key={index} onClick={() => onClickType(e)} className={e === type ? "active" : ""}>{dough[e]}</li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((e, index) => (
                        <li key={index} onClick={() => onClickSize(e)} className={e === size ? "active" : ""}>{e}</li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{price}</div>
                <div onClick={onClickAdd} className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{addCount}</i>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock