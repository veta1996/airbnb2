import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Cities from '../../utility/City/Cities'
import CitySearch from '../../utility/City/CitySearch'
import Activities from '../../utility/Activity/Activities'
import Venues from '../../utility/Venue/Venues'
import axios from 'axios'
import Spinner from '../../utility/Spinner/Spinner'
import { Container, Box, Typography } from '@mui/material'
import Swal from 'sweetalert2';


function Search(props) {
  const [cities, setCities] = useState([])
  const [activities, setActivities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [apiResponse, setApiResponse] = useState(false)
  const { searchId } = useParams()
  let navigate = useNavigate();


  useEffect(() => {
    const fetchSearch = async() => {
            console.log(searchId, 'FROM SEARCH')
            const urlSearch = `${window.apiHost}/search/${searchId}`
            const resp = await axios.get(urlSearch)
            setActivities(resp.data.activities)
            setCities(resp.data.cities)
            setVenues(resp.data.venues)
            setApiResponse(true)
            console.log(resp.data, 'from SEARCHHHH')
            console.log(cities, 'CITIES')
    }
    fetchSearch()
    
  }, [])

  if(!apiResponse){
      return <Spinner/>
  }

  return (
    <Container maxWidth="lg">
        <Box>
          {(!cities.length && !activities.length && !venues.length ) ?
          (Swal.fire({
            title: "There is no match based on your search",
            icon: 'error',
            customClass: {
                container: 'my-swal'
              }
        }).then(navigate('/'))) :
          (<Box>
                <Box>
                 {cities.length !== 0 ? <CitySearch cities={cities} header='Cities matching your search'/> : ''}
                </Box>
                <Box>
                {activities.length !== 0 ? <Activities activities={activities} header='Activities matching your search'/> : ''}
                </Box>
                <Box>
                {venues.length !== 0 ? <Venues venues={venues} header='Venues matching your search'/> : ''}
                </Box>
            </Box>) }
        </Box>
      </Container>
  )
}

export default Search

/*
if(!cities.length && !activities.length && !venues.length){
              Swal.fire({
                  title: "Please check your search",
                  icon: 'error',
                  customClass: {
                      container: 'my-swal'
                    }
              }).then(navigate('/'))}
        
        */