import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props

  const {id, name, cuisine, userRating, imageUrl} = restaurantDetails
  const {rating, totalReviews} = userRating

  return (
    <li testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-card-container">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-card-container-image"
        />
        <div className="restaurant-card-text-container">
          <p className="restaurant-card-title">{name}</p>
          <p className="restaurant-card-cuisine">{cuisine}</p>
          <div className="rating-container">
            <FaStar className="star" />
            <span className="rating-text">{rating}</span>
            <span className="total-ratings">({totalReviews} ratings)</span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard