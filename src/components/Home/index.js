import {Component} from 'react'

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md'

import Cookies from 'js-cookie'

import Header from '../Header'
import OffersCourosal from '../OffersCourosal'
import ResponseLoader from '../ResponseLoader'
import Footer from '../Footer'
import RestaurantsContainer from '../RestaurantsContainer'

import './index.css'

const apiResultsList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    offersList: [],
    restaurantsList: [],
    sortingOrder: '',
    pageNumber: 1,
    apiStatus: apiResultsList.initial,
  }

  componentDidMount() {
    this.getOfferBanner()
    this.getRestaurants()
    this.createCartInLS()
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

  createCartInLS = () => {
    const cartObj = localStorage.getItem('cartData')

    if (cartObj === null) {
      localStorage.setItem('cartData', JSON.stringify([]))
    }
  }

  getRestaurants = async () => {
    this.setState({
      apiStatus: apiResultsList.inProgress,
    })

    const {pageNumber, sortingOrder} = this.state
    const LIMIT = 9

    const url = `https://apis.ccbp.in/restaurants-list?offset=${
      (pageNumber - 1) * LIMIT
    }&limit=${LIMIT}&sort_by_rating=${sortingOrder}`

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
      const convertedArray = this.convertSnakeToCamel(data.restaurants)
      this.setState({
        restaurantsList: convertedArray,
        apiStatus: apiResultsList.success,
      })
    }
  }

  getOfferBanner = async () => {
    this.setState({
      apiStatus: apiResultsList.inProgress,
    })

    const url = 'https://apis.ccbp.in/restaurants-list/offers'

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
      this.setState({
        offersList: data.offers,
        apiStatus: apiResultsList.success,
      })
    }
  }

  updateSortingOrder = order => {
    this.setState(
      {
        sortingOrder: order,
      },
      this.getRestaurants,
    )
  }

  goToNextPage = () => {
    const {pageNumber} = this.state

    if (pageNumber + 1 < 5)
      this.setState(
        prev => ({
          pageNumber: prev.pageNumber + 1,
        }),
        this.getRestaurants,
      )
  }

  goToPreviousPage = () => {
    const {pageNumber} = this.state

    if (pageNumber - 1 > 0)
      this.setState(
        prev => ({
          pageNumber: prev.pageNumber - 1,
        }),
        this.getRestaurants,
      )
  }

  render() {
    const {
      offersList,
      sortingOrder,
      restaurantsList,
      pageNumber,
      apiStatus,
    } = this.state
    return (
      <>
        {apiStatus === apiResultsList.inProgress ? (
          <ResponseLoader />
        ) : (
          <div>
            <Header />
            <div className="home-bg-container">
              <OffersCourosal offersList={offersList} />

              <RestaurantsContainer
                sortingOrder={sortingOrder}
                restaurantsList={restaurantsList}
                updateSortingOrder={this.updateSortingOrder}
              />

              <div className="page-shift-container">
                <button type="button" testid="pagination-left-button">
                  <MdOutlineArrowBackIosNew
                    className="arrow-button"
                    onClick={this.goToPreviousPage}
                  />{' '}
                </button>
                <p className="page-shift-text">
                  <span testid="active-page-number">{pageNumber}</span> of 4
                </p>
                <button type="button" testid="pagination-right-button">
                  <MdOutlineArrowForwardIos
                    className="arrow-button"
                    onClick={this.goToNextPage}
                  />{' '}
                </button>
              </div>
            </div>

            <Footer />
          </div>
        )}
      </>
    )
  }
}

export default Home
