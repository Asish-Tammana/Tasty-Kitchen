import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import Header from '../Header'
import ResponseLoader from '../ResponseLoader'
import FoodItemCard from '../FoodItemCard'
import './index.css'

const apiResultsList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class RestaurantDetailedContainer extends Component {
  state = {
    restaurantDetails: {},
    foodItemsList: [],
    apiStatus: apiResultsList.initial,
  }

  componentDidMount() {
    this.getMenuDetails()
  }

  convertSnakeToCamel = obj => {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertSnakeToCamel(item))
    }

    const camelObj = {}
    Object.keys(obj).forEach(key => {
      const camelKey = key.replace(/_([a-z])/g, (match, group1) =>
        group1.toUpperCase(),
      )
      const value = obj[key]
      if (typeof value === 'object' && !Array.isArray(value)) {
        camelObj[camelKey] = this.convertSnakeToCamel(value)
      } else {
        camelObj[camelKey] = value
      }
    })
    return camelObj
  }

  getMenuDetails = async () => {
    this.setState({
      apiStatus: apiResultsList.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const convertedObj = this.convertSnakeToCamel([data])
      const convertedMenuList = this.convertSnakeToCamel(
        convertedObj[0].foodItems,
      )
      this.setState({
        restaurantDetails: convertedObj[0],
        foodItemsList: convertedMenuList,
        apiStatus: apiResultsList.success,
      })
    }
  }

  render() {
    const {apiStatus, restaurantDetails, foodItemsList} = this.state
    const {
      name,
      imageUrl,
      cuisine,
      location,
      costForTwo,
      rating,
      reviewsCount,
    } = restaurantDetails

    return (
      <div>
        {apiStatus === apiResultsList.inProgress ? (
          <ResponseLoader />
        ) : (
          <div>
            <Header />
            <div>
              <div className="restaurant-details-container">
                <img
                  src={imageUrl}
                  alt="restaurant"
                  className="restaurant-details-container-image"
                />
                <div className="restaurant-details-text-container">
                  <h1 className="restaurant-title">{name}</h1>
                  <p className="restaurant-description">{cuisine}</p>
                  <p className="restaurant-description">{location}</p>
                  <div className="ratings-section">
                    <div>
                      <FaStar />
                      <p>{rating}</p>
                      <br />
                      <p>({reviewsCount} ratings)</p>
                    </div>
                    <div className="vl">{}</div>
                    <div>
                      <p> ₹ {costForTwo}</p>
                      <br />
                      <p>Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Menu starts */}
              <ul className="food-items-container">
                {foodItemsList.map(each => (
                  <FoodItemCard itemDetails={each} key={each.id} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default RestaurantDetailedContainer
