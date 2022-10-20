import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'
import SlickSlider from 'react-slick'

const settings = {
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
const Slider = (props) => {

   console.log(props.elements, "FROM SLIDER")
  return (
        <SlickSlider {...settings} className='slick'>
            {props.elements}
        </SlickSlider>
  )
}


export default Slider

