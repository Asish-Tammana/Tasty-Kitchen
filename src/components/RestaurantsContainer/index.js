import {useState} from 'react'
import {FaSortDown} from 'react-icons/fa'
import {MdOutlineSort} from 'react-icons/md'

import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const RestaurantsContainer = props => {
  const [showOptions, updateShowOptions] = useState(false)
  const {sortingOrder, updateSortingOrder, restaurantsList} = props

  return (
    <div className="restaurants-container">
      <div className="top-container">
        <div>
          <h1 className="restaurants-container-heading">
            Restaurants Container
          </h1>
          <p className="restaurants-container-caption">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div>
          <div className="top-container">
            <MdOutlineSort />
            <button
              type="button"
              className="order-text"
              onClick={() => updateShowOptions(!showOptions)}
            >
              {sortingOrder === 'Highest'
                ? 'Sort by Highest'
                : 'Sort by Lowest'}
            </button>
            <FaSortDown />
          </div>
          {showOptions && (
            <div className="options-container">
              {sortByOptions.map(each => {
                const activeOption =
                  each.value === sortingOrder && 'active-option'
                return (
                  <button
                    type="button"
                    key={each.id}
                    className={`options-button ${activeOption}`}
                    onClick={() => {
                      updateSortingOrder(each.value)
                      updateShowOptions(!showOptions)
                    }}
                  >
                    {each.displayText}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <hr className="horizontal-line" />

      {/* Restaurants List */}

      <ul type="none" className="restaurants-list-container">
        {restaurantsList.map(each => (
          <RestaurantCard key={each.id} restaurantDetails={each} />
        ))}
      </ul>
    </div>
  )
}

export default RestaurantsContainer
