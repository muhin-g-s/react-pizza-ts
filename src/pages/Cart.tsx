import { useDispatch, useSelector } from "react-redux"
import { selectCart } from "../storoges/cart/selector"
import CartItem from "../components/CratItem/CartItem"
import { clearItem } from "../storoges/cart/slice"
import EmptyCartItem from "../components/CratItem/EmptyCartItem"
import { FC } from "react"

const Cart : FC = () => {

  const dispatcher = useDispatch()
  const {totalPrice, items} = useSelector(selectCart)

  const totalCount = items.reduce((sum : number, item : any) => sum + item.count, 0)

  const onClickClear = () => {
    if(window.confirm("удаляем?"))
      dispatcher(clearItem())
  }

  if(!totalPrice)
    return <EmptyCartItem/>

  return (
      <div className="content">
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">{/*<% include ../../public/img/cart.svg %>*/} Корзина</h2>
              <div className="cart__clear" onClick={onClickClear}>
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
            {items.map((e : any) => (
              <CartItem key={e.id} {...e}/>
            ))}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span> Всего пицц: <b>{totalCount}</b> </span>
                <span> Сумма заказа: <b>{totalPrice}</b> </span>
              </div>
              <div className="cart__bottom-buttons">
                <a href="/" className="button button--outline button--add go-back-btn">
                  <span>Вернуться назад</span>
                </a>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Cart