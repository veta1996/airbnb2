import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import avatar from '../../../src/images/avatar2.png'
import axios from 'axios'
import Point from './Point';
import StarIcon from '@mui/icons-material/StarRate';
import Login from '../Login/Login';
import {connect, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import moment from 'moment'
import Swal from 'sweetalert2';
import loadScript from '../../utilityFunctions/loadScript';
import { Container, styled } from '@mui/system'
import { theme } from '../../theme/theme';
import { Avatar, Box, Divider, Grid, Paper, Stack, TextField, Typography, Button } from '@mui/material';
import Amenities from './Amenities'

const TitleText = styled(Typography)(({theme})=> ({
    textTransform: 'none',
    
}))
const ReserveButton = styled(Button)(({theme})=> ({
    backgroundColor: '#FF385C',
    color: '#FFFFFF',
    padding: 8,
    marginTop: 10,
    '&:hover': {
     backgroundColor: '#FF385C'
 },
}))
function SingleFullVenue(props) {
 const token = useSelector(state => state.auth.token);
 const {vid} = useParams();
 const [singleVenue, setSingleVenue] = useState({});
 const [points, setPoints] = useState([]);
 const [amenitiesItems, setAmenitiesItems] = useState([]);
 const [checkIn, setCheckIn] = useState('');
 const [checkOut, setCheckOut] = useState('');
 const [numberOfGuests, setNumberOfGuests] = useState('');
 

    useEffect(() => {
       const getData = async() =>{
            const url = `${window.apiHost}/venue/${vid}`;
            const axiosRes = await axios.get(url);
            const singleVenueData = axiosRes.data;

            const pointUrl = `${window.apiHost}/points/get`;
            const pointAxiosRes = await axios.get(pointUrl);

            const points = singleVenueData.points.split(',').map((point, i) => {
                return <Point key={i} pointDesc={pointAxiosRes.data} point={point}/>
            })
            const amenitiesItems = singleVenueData.amenities.split(',').map((amenity, i) => {
                return <Amenities key={i} amenity={amenity}/>
            })
            setSingleVenue(singleVenueData);
            setPoints(points)
            setAmenitiesItems(amenitiesItems)
            console.log(singleVenue, 'singleVenue')
        }
    getData()
    }, [])

    const reserveNow = async(e) => {
        
        const startDateMoment = moment(checkIn)
        const endDateMoment = moment(checkOut)
        const diffDays = endDateMoment.diff(startDateMoment, 'days')
        if (diffDays < 1) {
            Swal.fire({
                icon: 'error',
                title: "Check-out date must be after check-in date", 
            })
        } else if(isNaN(diffDays)){
            Swal.fire({
                icon: 'error',
                title: "Please check if your dates are valid", 
            })
        } else {
            const pricePerNight = singleVenue.pricePerNight;
            const totalPrice = diffDays * pricePerNight;
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';
            const scriptUrl = 'https://js.stripe.com/v3'
            await loadScript(scriptUrl)
            const stripe = window.Stripe(stripePublicKey)
            const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
            const data = {
                venueData: singleVenue,
                totalPrice,
                diffDays,
                pricePerNight,
                checkIn: checkIn,
                checkOut: checkOut,
                token: token,
                numberOfGuests: numberOfGuests,
                currency: 'USD',
            }
            const sessionVar = await axios.post(stripeSessionUrl,data);
            console.log(sessionVar.data, 'sessionVar.data');
            stripe.redirectToCheckout({
                sessionId: sessionVar.data.id,
            }).then((result)=>{
                console.log(result);
                //if the network fails, this will run
            })
        }

    }
   
    const loginInAction = () => {
        props.openModal('open', <Login/>)
        console.log(token)
    }

    console.log(props.auth, "PROPS FROM SINGLEVenue")
  return (
    <Container maxWidth="lg">
        <Box xs={{display: 'flex', flexDirection: 'column'}}>
            <TitleText variant='h5'>{singleVenue.title}</TitleText>
            <Box sx={{display: 'flex', flexDirection: "row", color: "#484848", fontWeight: 800, marginY: 2}}>
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    <StarIcon fontSize="small"/>
                    <Typography>
                    {singleVenue.rating}
                    </Typography>
                </Box>
                <Typography component='span' sx={{marginX: 1}}>&#183;</Typography>
                <Typography>408 reviews</Typography>
                <Typography component='span' sx={{marginX: 1}}>&#183;</Typography>
                <Typography>{singleVenue.location}</Typography>
            </Box>
        </Box>
        <Box component='img' src={singleVenue.imageUrl} alt={singleVenue.title} sx={{ width: '80%', borderRadius: '20px' }}/>
    
     <Grid container component="main" sx={{ height: '100vh' }}>
     <Grid
       item
       xs={8}
       sm={8}
       md={8}
     >
        <Box sx={{marginTop: 4, marginRight: 8}}>
        <Box sx={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', paddingY: 2}}>
            <Box sx={{display: "flex", flexDirection: 'column'}}>
            <TitleText variant='h5'>Entire property hosted by Daniel</TitleText>
            <Box sx={{display: 'flex', flexDirection: "row", marginY: 1}}>
                <Typography>{singleVenue.guests} guests</Typography>
                <Typography component='span' sx={{marginX: 1}}>&#183;</Typography>
                <Typography>2 bedrooms</Typography>
                <Typography component='span' sx={{marginX: 1}}>&#183;</Typography>
                <Typography>3 bathrooms</Typography>
                </Box>
            </Box>
            <Avatar alt="Dani" src={avatar} sx={{ width: 80, height: 80 }} />
        </Box>
        <Divider/>
            <Box>
                {points}
                <Divider/>
                <Typography variant="body1" sx={{marginY: 3}}>{singleVenue.details}</Typography>
                <Box sx={{display: "flex", flexDirection: 'column'}}>
                    <Typography variant='h5'>Amenities: </Typography>
                    <Box sx={{display: "flex", flexDirection: 'row'}}>{amenitiesItems}</Box>    
                </Box>
            </Box>
        </Box>      
 </Grid>
 
 <Grid
       item
       xs={4}
       sm={4}
       md={4}
     >

        <Paper elevation={6} sx={{padding: 4, marginTop: 4}}>
        <Box sx={{display: 'flex', flexDirection: "row", color: "#484848", fontWeight: 800, justifyContent: 'space-between', paddingBottom: 2}}>
            <Typography style={{fontSize: '18px', fontWeight: 700}}>${singleVenue.pricePerNight} <Typography component='span' variant='body2'>night</Typography></Typography>
            <Box sx={{display: 'flex', flexDirection: "row"}}>
                <StarIcon fontSize="small"/>
                <Typography>
                {singleVenue.rating}
                </Typography>
            </Box>
            </Box>
            <Box>
            <Stack direction='row' spacing={0.5} pt={2}>
          <TextField type='date'
          fullWidth
          label="Check In"
          InputLabelProps={{
            style: { color: theme.palette.hof.main },
            shrink: true
          }}
          value={checkIn} 
          onChange={(e)=>setCheckIn(e.target.value)}/>

           <TextField type='date'
           fullWidth
           label="Check Out"
           InputLabelProps={{
             style: { color: theme.palette.hof.main },
             shrink: true
           }}
           value={checkOut} 
           onChange={(e)=>setCheckOut(e.target.value)}/>
          
         </Stack>
         <Stack direction='row' pt={2}>
            <TextField  
            fullWidth
            type='number'
            label='Guests'
            placeholder="2"
            InputLabelProps={{
              style: { color: theme.palette.hof.main },
              shrink: true
            }}
            value={numberOfGuests} 
            onChange={(e)=>setNumberOfGuests(e.target.value)}/>
         </Stack>
         <Box>
            {token ? <ReserveButton onClick={reserveNow} fullWidth>Reserve</ReserveButton> :
            <ReserveButton onClick={loginInAction} fullWidth>Log In To Reserve</ReserveButton>
             }
         </Box>
            </Box>
       
        </Paper>
        </Grid>
        </Grid>
    </Container>
  )
}
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue)

/*
 <div className='col s8 location-details offset-s2'>
            

            <div className='col s4 right-details'>
                <div className='price-per-day'>${singleVenue.pricePerNight}/per night</div>
                <div className='rating'>Rating: {singleVenue.rating}</div>
                <div className='col s6'>
                    Check-In
                    <input type='date' value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
                </div>
                <div className='col s6'>
                    Check-Out
                    <input type='date' value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}/>
                </div>

                <div className='col s12'>
                    <select className='browser-default' value={numberOfGuests} onChange={(e)=>setNumberOfGuests(e.target.value)}>
                        <option value='1'>1 Guest</option>
                        <option value='2'>2 Guests</option>
                        <option value='3'>3 Guests</option>
                        <option value='4'>4 Guests</option>
                        <option value='5'>5 Guests</option>
                        <option value='6'>6 Guests</option>
                        <option value='7'>7 Guests</option>
                        <option value='8'>8 Guests</option>
                    </select>
                </div>
                <div className='col s12 center'>
                    {token ? 
                    <button className='btn red accent-2' onClick={reserveNow}>Reserve</button> :
                    <div>You must <span className='text-link' onClick={() => {props.openModal('open', <Login/>)}}>Log In</span> to reserve</div>
                    }
                    
                </div>
            </div>
        </div>*/