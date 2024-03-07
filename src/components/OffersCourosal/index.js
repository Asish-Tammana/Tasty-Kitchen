import Slider from 'react-slick'
import './index.css'

export default function OffersCourosal(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const {offersList} = props

  return (
    <Slider {...settings}>
      {offersList.map(each => (
        <div key={each.id}>
          <img src={each.image_url} alt="offer" className="offer-image" />
        </div>
      ))}
    </Slider>
  )
}
