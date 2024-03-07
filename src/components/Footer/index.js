import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-inner-container">
        <img
          className="footer-logo"
          src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359867/Frame_275outlineLogo_qwa9jx.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-title">Tasty Kitchen</h1>
      </div>
      <p>
        The only thing we are serious about is food.
        <br /> Contact us on
      </p>
      <div className="footer-inner-container">
        <FaPinterestSquare
          className="social-media-icons"
          testid="pintrest-social-icon"
        />
        <FaInstagram
          className="social-media-icons"
          testid="instagram-social-icon"
        />
        <FaTwitter
          className="social-media-icons"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          className="social-media-icons"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
