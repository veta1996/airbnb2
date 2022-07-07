import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import NavBar from '../../utility/NavBar/NavBar'
import axios from 'axios'
import Spinner from '../../utility/Spinner/Spinner'
import Venues from '../../utility/Venue/Venues'

function CityVenues() {
   let {cityName } = useParams()
   
    const [venues, setVenues] = useState([])
    const [header, setHeader] = useState('')

   useEffect(() => {
      const getdata = async() => {
       const url = `${window.apiHost}/venues/city/${cityName}`
       const resp = await axios.get(url, {cityName})
       setHeader(resp.data.header);
       setVenues(resp.data.venues)
    }
        getdata()
   }, [])

   if (!header){
       return <Spinner/>
   }

  return (
    <>
        <NavBar/>
        <div className='row'>
            <Venues venues={venues} header={header}/>
            </div>
    </>
  )
}

export default CityVenues