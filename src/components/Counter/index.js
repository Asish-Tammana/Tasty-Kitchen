import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {quantity, itemId, onIncrement, onDecrement} = this.props

    return (
      <div className="counter-container">
        <button
          testid="decrement-count"
          type="button"
          className="counter-button"
          onClick={() => onDecrement(itemId)}
        >
          -
        </button>
        <span testid="active-count">{quantity}</span>
        <button
          testid="increment-count"
          type="button"
          className="counter-button"
          onClick={() => onIncrement(itemId)}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
