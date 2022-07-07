import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './Home.css';
import Spinner from '../../utility/Spinner/Spinner';
import SearchBox from '../Home/SearchBox'
import NavBar from '../../utility/NavBar/NavBar'
import Cities from '../../utility/City/Cities';
import Activities from '../../utility/Activity/Activities';
import Venues from '../../utility/Venue/Venues';

function Home() {

  const [cities, setCities] = useState([])
  const [activities, setActivities] = useState([]);
  const [recVenues, setRecVenues] = useState([]);
  const [recVenuesHeader, setRecVenuesHeader] = useState('');


  useEffect(()=> {
    async function getData(){
      const citiesUrl = `${window.apiHost}/cities/recommended`;
      const citiesEuropeUrl = `${window.apiHost}/cities/europe`;
      const citiesAsiaUrl = `${window.apiHost}/cities/asia`;
      const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

      const citiesPromise = [];

        citiesPromise.push(axios.get(citiesUrl));
        citiesPromise.push(axios.get(citiesEuropeUrl));
        citiesPromise.push(axios.get(citiesAsiaUrl));
        citiesPromise.push(axios.get(exoticCitiesUrl))
      
        Promise.all(citiesPromise).then((data) => {
          const citiesData = data[0].data;
          const europeCitiesData = data[1].data
          const asiaCitiesData = data[2].data;
          const exoticCitiesData = data[3].data;

          setCities([citiesData, europeCitiesData, asiaCitiesData, exoticCitiesData]);
          
        })
        

        const activityUrl = `${window.apiHost}/activities/today`;
        const activity = await axios(activityUrl);
        setActivities(activity.data);

        const recVenuesUrl = `${window.apiHost}/venues/recommended`;
        const venues = await axios(recVenuesUrl);
        setRecVenues(venues.data.venues)
        setRecVenuesHeader(venues.data.header)
    }
    getData();
    
  }, [])
  //console.log(cities, "recommended cities from Home.js");
  //console.log(activities, "activities")
  //console.log(recVenues, "recVenues");

  if(cities.length === 0){
    return <Spinner/>
  }


    return (<>
      <div className='container-fluid'>
      <div className='row'>
        <div className='home col s12'>
          <div className='upper-fold'>
            <NavBar/>
            <SearchBox/>
          </div>
        </div>
        <div className='container-fluid lower-fold'>
          <div className='row'>
                <div className='col s12'>
                  <Cities cities={cities[0]} header='Recommended cities for you'/>
                </div>
                <div className='col s12'>
                  <Activities activities={activities} header='Today in your area'/>
                </div>
                <div className='col s12'>
                  <Cities cities={cities[1].cities} header={cities[1].header}/>
                </div>
                <div className='col s12'>
                  <Venues venues={recVenues} header={recVenuesHeader}/>
                </div>
                <div className='col s12'>
                  <Cities cities={cities[2].cities} header={cities[2].header}/>
                </div>
                <div className='col s12'>
                  <Cities cities={cities[3].cities} header={cities[3].header}/>
                </div>
            </div>
        </div>
      </div>
    </div> 
    </>)
  } 
  


export default Home;