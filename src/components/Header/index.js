import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {
    showMobileNavBar: false,
  }

  logoutClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  toggleMobileBarStatus = () => {
    this.setState(prev => ({
      showMobileNavBar: !prev.showMobileNavBar,
    }))
  }

  render() {
    const {showMobileNavBar} = this.state

    let activeTab = null
    if (window.location.href.split('/')[3] === '') {
      activeTab = 'home'
    } else if (window.location.href.split('/')[3] === 'cart') {
      activeTab = 'cart'
    }

    const homeActive = activeTab === 'home' ? 'active-link' : ''
    const cartActive = activeTab === 'cart' ? 'active-link' : ''

    return (
      <div>
        <ul className="navbar-container">
          <li className="nav-symbols-container" style={{width: '100%'}}>
            <Link to="/">
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359867/Frame_274logo_pcjbhm.png"
                alt="website logo"
              />
            </Link>
            <h1 className="login-title">Tasty Kitchens</h1>
          </li>

          <ul className="nav-symbols-container">
            <li>
              <Link to="/">
                {/* <p className={`nav-link-decoration ${homeActive}`}>Home</p> */}
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                {/* <p className={`nav-link-decoration ${cartActive}`}>Cart</p> */}
                <p>Cart</p>
              </Link>
            </li>
            <button
              type="button"
              className="logout-button"
              onClick={this.logoutClicked}
            >
              Logout
            </button>
          </ul>
        </ul>

        <ul className="mobile-nav-bar">
          <li className="nav-symbols-container" style={{width: '100%'}}>
            <Link to="/">
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359867/Frame_274logo_pcjbhm.png"
                alt="website logo"
              />
            </Link>
            <h1 className="login-title">Tasty Kitchens</h1>
          </li>

          <button type="button" onClick={this.toggleMobileBarStatus}>
            <GiHamburgerMenu />{' '}
          </button>
        </ul>
        {showMobileNavBar && (
          <ul type="none" className="nav-symbols-container">
            <li>
              <Link to="/" className="link-decoration">
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="link-decoration">
                <p>Cart</p>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-button"
                onClick={this.logoutClicked}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    )
  }
}
export default withRouter(Header)

// <ul type="none" className="nav-symbols-container">
//             <li>
//               <Link to="/" className="link-decoration">
//                 <AiFillHome className="nav-symbols" />
//               </Link>
//             </li>
//             <li>
//               <Link to="/jobs" className="link-decoration">
//                 <BsFillBriefcaseFill className="nav-symbols" />
//               </Link>
//             </li>
//             {/* <li>
//               <button
//                 type="button"
//                 className="logout-icon"
//                 onClick={this.logoutClicked}
//               >
//                 <HiOutlineLogout />
//               </button>
//             </li> */}
//           </ul>
