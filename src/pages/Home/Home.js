import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Spinner from '../../utility/Spinner/Spinner';
import SearchBox from '../Home/SearchBox'
import Cities from '../../utility/City/Cities';
import Activities from '../../utility/Activity/Activities';
import Venues from '../../utility/Venue/Venues';
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/system'


const BoxImage = styled(Box)(({theme})=> ({
  [theme.breakpoints.up('sm')] : {
    display: 'flex',
    alignItems: 'center',
    minHeight: '620px',
    width: '100%',
    marginBottom: '20px'
  },
  [theme.breakpoints.down('sm')] : {
      height: '10%'
  },
  backgroundImage: 'url(https://a0.muscache.com/im/pictures/7e64c77a-29f3-49d7-9ce1-8e2270f67ef6.jpg?im_w=1680)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 10,
}))

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
  if(cities.length === 0){
    return <Spinner/>
  }
    return (
   <Container maxWidth="lg">
      <Box sx={{display: 'flex', flexDirection: 'row'}} maxWidth="lg">
        <BoxImage>
            <Box sx={{zIndex: '20'}}>
              <SearchBox/>
          </Box>
        </BoxImage>
      </Box>
          <Box>
                <Box>
                  <Cities cities={cities[0]} header='Recommended cities for you'/>
                </Box>
               <Box>
                  <Activities activities={activities} header='Today in your area'/>
                </Box>
               <Box>
                  <Cities cities={cities[1].cities} header={cities[1].header}/>
                </Box>
               <Box>
                  <Venues venues={recVenues} header={recVenuesHeader}/>
                </Box>
               <Box sx={{marginY: 6}}>
                  <Cities cities={cities[2].cities} header={cities[2].header}/>
                </Box>
               <Box sx={{marginY: 6}}>
                  <Cities cities={cities[3].cities} header={cities[3].header}/>
                </Box>
            </Box>
       
    </Container> 
    )
  } 
  


export default Home;

/*
<Box>
                  <Cities cities={cities[1].cities} header={cities[1].header}/>
                </Box>*/