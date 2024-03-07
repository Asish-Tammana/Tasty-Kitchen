import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const cartPageStatusList = {
  emptyCart: 'EMPTY_CART',
  cartItems: 'CART_ITEMS',
  placedOrder: 'PLACED_ORDER',
}

const Cart = () => {
  const [cartList, updateCartList] = useState([])
  const [totalPrice, updateTotalPrice] = useState(0)
  const [cartPageStatus, updateCartPageStatus] = useState(
    cartPageStatusList.emptyCart,
  )

  const addToCartList = () => {
    const cartFromLS = JSON.parse(localStorage.getItem('cartData'))

    updateCartList(cartFromLS)
    updateCartPageStatus(cartPageStatusList.cartItems)
  }

  useEffect(addToCartList, [])

  useEffect(() => {
    const totalCost = cartList.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.cost,
      0,
    )
    updateTotalPrice(totalCost)
  }, [cartList])

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
    addToCartList()
  }

  const onDecrement = itemId => {
    const cartFromLS = JSON.parse(localStorage.getItem('cartData'))

    for (let i = 0; i < cartFromLS.length; i += 1) {
      if (cartFromLS[i].id === itemId) {
        if (cartFromLS[i].quantity - 1 >= 0) {
          cartFromLS[i].quantity -= 1

          if (cartFromLS[i].quantity - 1 === 0) {
            cartFromLS.splice(i, 1)
          }

          //   updateItemStatusInCart(quantity - 1)
        }
        localStorage.setItem('cartData', JSON.stringify(cartFromLS))
        addToCartList()
        break
      }
    }
  }

  const displayCartItems = () => (
    <>
      <div className="cart-container">
        <table className="table-container">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(item => (
              <tr key={item.id}>
                <td className="item-name">{item.name}</td>
                <td className="counter-cell">
                  <div className="counter-container">
                    <button
                      testid="decrement-quantity"
                      type="button"
                      className="counter-button"
                      onClick={() => onDecrement(item.id)}
                    >
                      -
                    </button>
                    <span testid="tem-quantity">{item.quantity}</span>
                    <button
                      testid="increment-quantity"
                      type="button"
                      className="counter-button"
                      onClick={() => onIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="item-price"> ₹ {item.cost * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className="order-details-container">
          <h1 className="order-total">Order Total: </h1>
          <h1 testid="total-price" className="total-cost">
            ₹ {totalPrice}
          </h1>
        </div>
        <button
          type="button"
          className="place-order"
          onClick={() => updateCartPageStatus(cartPageStatusList.placedOrder)}
        >
          Place Order
        </button>
      </div>
      <Footer />
    </>
  )

  const displayEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709740746/cooking_1_bfgvx4.png"
        alt="empty cart"
      />
      <h1 className="item-name">No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="place-order">
          Order Now
        </button>
      </Link>
    </div>
  )

  const displaceOrderPlaced = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709741211/check-circle.1_1_sf6ze8.png"
        alt="order placed"
      />
      <h1 className="item-name">Payment Successful</h1>
      <p className="empty-cart-description">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="place-order">
          Go to Home Page
        </button>
      </Link>
    </div>
  )

  const renderResult = () => {
    switch (cartPageStatus) {
      case cartPageStatusList.cartItems:
        return displayCartItems()
      case cartPageStatusList.emptyCart:
        return displayEmptyCart()
      case cartPageStatusList.placedOrder:
        return displaceOrderPlaced()

      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      {renderResult()}
    </div>
  )
}

export default Cart