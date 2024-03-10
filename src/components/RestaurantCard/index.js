import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props

  const {id, name, cuisine, userRating, imageUrl} = restaurantDetails
  const {rating, totalReviews} = userRating

  return (
    <li className="restaurant-card-container" testid="restaurant-item">
      <Link to={`/restaurant/${id}`}>
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
            <p className="rating-text">{rating}</p>
            <p className="total-ratings">({totalReviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
