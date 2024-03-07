import Loader from 'react-loader-spinner'
import './index.css'

const ResponseLoader = () => (
  <div testid="restaurants-offers-loader" className="response-loader-container">
    <Loader type="TailSpin" height="50" width="50" />
  </div>
)

export default ResponseLoader
