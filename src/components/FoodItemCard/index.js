import {useEffect, useState} from 'react'
import {FaStar} from 'react-icons/fa'

import Counter from '../Counter'

import './index.css'

const FoodItemCard = props => {
  const {itemDetails} = props

  const {name, imageUrl, rating, cost, id} = itemDetails

  const [quantity, updateItemStatusInCart] = useState(0)

  const updateQuantity = () => {
    const cartFromLS = JSON.parse(localStorage.getItem('cartData'))
    const itemObj = cartFromLS.find(obj => obj.id === id)

    if (itemObj !== undefined) {
      updateItemStatusInCart(itemObj.quantity)
    } else {
      updateItemStatusInCart(0)
    }
  }

  useEffect(updateQuantity, [])

  const onIncrement = itemId => {
    const cartFromLS = JSON.parse(localStorage.getItem('cartData'))
    // updateItemStatusInCart(quantity + 1)

    for (let i = 0; i < cartFromLS.length; i += 1) {
      if (cartFromLS[i].id === itemId) {
        cartFromLS[i].quantity += 1
        break
      }
    }
    localStorage.setItem('cartData', JSON.stringify(cartFromLS))
    updateQuantity()
  }

  const onDecrement = itemId => {
    const cartFromLS = JSON.parse(localStorage.getItem('cartData'))

    for (let i = 0; i < cartFromLS.length; i += 1) {
      if (cartFromLS[i].id === itemId) {
        if (cartFromLS[i].quantity - 1 >= 0) {
          cartFromLS[i].quantity -= 1

          if (quantity - 1 === 0) {
            cartFromLS.splice(i, 1)
          }

          //   updateItemStatusInCart(quantity - 1)
        }
        localStorage.setItem('cartData', JSON.stringify(cartFromLS))
        updateQuantity()
        break
      }
    }
  }

  const addItemToCart = () => {
    updateItemStatusInCart(1)

    const cartItemObj = {cost, quantity: 1, id, imageUrl, name}

    let cartFromLS = JSON.parse(localStorage.getItem('cartData'))

    cartFromLS = [...cartFromLS, cartItemObj]

    localStorage.setItem('cartData', JSON.stringify(cartFromLS))
  }

  return (
    <div testid="foodItem" className="food-item-container">
      <img src={imageUrl} alt={name} className="item-card-container-image" />
      <div className="restaurant-card-text-container">
        <p className="restaurant-card-title">{name}</p>
        <span> ₹ {cost}</span>
        <div className="item-rating-container">
          <FaStar className="star" />
          <span className="rating-text">{rating}</span>
        </div>
        {quantity === 0 ? (
          <button
            type="button"
            className="add-item-button"
            onClick={addItemToCart}
          >
            ADD
          </button>
        ) : (
          <Counter
            quantity={quantity}
            itemId={id}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        )}
      </div>
    </div>
  )
}

export default FoodItemCard
