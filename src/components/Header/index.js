import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
// import {HiOutlineLogout} from 'react-icons/hi'
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
      <>
        <div className="navbar-container">
          <Link to="/">
            <div className="nav-symbols-container" style={{width: '100%'}}>
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359867/Frame_274logo_pcjbhm.png"
                alt="website logo"
              />
              <h1 className="login-title">Tasty Kitchens</h1>
            </div>
          </Link>

          <ul className="nav-symbols-container">
            <li>
              <Link to="/">
                {/* <p className={`nav-link-decoration ${homeActive}`}>Home</p> */}
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart">
                {/* <p className={`nav-link-decoration ${cartActive}`}>Cart</p> */}
                Cart
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
        </div>

        <div className="mobile-nav-bar">
          <Link to="/">
            <div className="nav-symbols-container" style={{width: '100%'}}>
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359867/Frame_274logo_pcjbhm.png"
                alt="website logo"
              />
              <h1 className="login-title">Tasty Kitchens</h1>
            </div>
          </Link>
          <button type="button" onClick={this.toggleMobileBarStatus}>
            <GiHamburgerMenu />{' '}
          </button>
        </div>
        {showMobileNavBar && (
          <ul type="none" className="nav-symbols-container">
            <li>
              <Link to="/" className="link-decoration">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="link-decoration">
                Cart
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
      </>
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
