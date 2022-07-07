import React from 'react'
import City from './City'
import SlickSlider from '../Slider/Slider'
import NavBar from '../NavBar/NavBar'

function Cities(props) {
  //console.log(props, "from cities")
  const citiesList =  props.cities.map((city, i) => {
      return(
        <div className='col s3' key={i}>
          <City city={city} key={i} />
        </div>
      )
  })
  
  return(
      <div className='cities-wrapper'>
        <NavBar/>
          <h1 className='main-header-text'>{props.header}</h1>
            <SlickSlider elements={citiesList}/>
      </div>
  )
}

export default Cities;