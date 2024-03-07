import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709742763/erroring_1_fh9x3k.png"
      alt="not found"
    />
    <h1 className="item-name">Page Not Found</h1>
    <p className="empty-cart-description">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="place-order">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
