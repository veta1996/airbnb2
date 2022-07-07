import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../utility/NavBar/NavBar'
import Cities from '../../utility/City/Cities'
import Activities from '../../utility/Activity/Activities'
import Venues from '../../utility/Venue/Venues'
import axios from 'axios'
import Spinner from '../../utility/Spinner/Spinner'
import '../Home/Home.css'

function Search(props) {
  const [cities, setCities] = useState([])
  const [activities, setActivities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [apiResponse, setApiResponse] = useState(false)
  const { searchId } = useParams()

  useEffect(() => {
    const fetchSearch = async() => {
            console.log(searchId, 'FROM SEARCH')
            const urlSearch = `${window.apiHost}/search/${searchId}`
            const resp = await axios.get(urlSearch)
            setActivities(resp.data.activities)
            setCities(resp.data.cities)
            setVenues(resp.data.venues)
            setApiResponse(true)
            console.log(resp.data)
    }
    fetchSearch()
  }, [])

  if(!apiResponse){
      return <Spinner/>
  }

  return (
    <div>
        <NavBar/>
        <div className='container-fluid lower-fold'>
          <div className='row'>
                <div className='col s12'>
                 <Cities cities={cities} header='Cities matching your search'/>
                </div>
                <div className='col s12'>
                <Activities activities={activities} header='Activities matching your search'/>
                </div>
                <div className='col s12'>
                 <Venues venues={venues} header='Venues matching your search'/>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Search