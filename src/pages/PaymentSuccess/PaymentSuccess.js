import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PaymentSuccess.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useSelector } from 'react-redux'
import Spinner from '../../utility/Spinner/Spinner'
import moment from 'moment'
import { Container } from '@mui/system'
import { Typography, Grid, Box, Divider, Paper, Stack, List, ListItem, ListItemText } from '@mui/material'
import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';
import StarIcon from '@mui/icons-material/StarRate';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
library.add(faLongArrowAltRight)



function PaymentSuccess(props) {

    const {stripeToken} = useParams()
    const token = useSelector(state => state.auth.token)
    const [reservationDetails, setReservationDetails] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [venueDetails, setVenuedetails] = useState({})
    const [waiting, setWaiting] = useState(true)
   
    useEffect(() => {
        const getData = async(e) => {
        const data = {stripeToken, token}
        const successUrl = `${window.apiHost}/payment/success`
        const resp = await axios.post(successUrl, data)
        setReservationDetails(resp.data)
        setWaiting(false)
        //setUserData(resp.data.userData)
        console.log(data, resp.data)
    }
    getData()
    }, [])

    if(waiting) {
        return <Spinner/>
    }

    const vd = reservationDetails.reservationDetails.venueData
    const rd = reservationDetails.reservationDetails
    const ud = reservationDetails.userData
    console.log(vd, "VD")
    console.log(reservationDetails, "reservationDetails")

  return (
    <Container maxWidth='lg'>
        <Box sx={{display: 'flex', flexDirection: 'row', margin: 4}} >
            <DoubleArrowTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 1}}/>
            <Typography variant='h5'>Your trip is confirmed on {moment().format("MMMM Do, YYYY")}</Typography>
        </Box>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item
                xs={7}
                sm={7}
                md={7}>
                    
        <Box sx={{marginRight: 8}}>
            <Paper elevation={5} sx={{padding: 4, borderRadius: 3}}>
                 <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Stack direction='column' sx={{paddingRight: 2}}>
                        <Typography sx={{fontWeight: 800}}>Good price.</Typography>
                        <Typography>Your dates are $30 less than the avg. nightly rate over the last 3 months.</Typography>
                    </Stack>
                    <LocalOfferTwoToneIcon sx={{width: "40px", height: '40px'}}/> 
                </Box>
            </Paper>
            <Box sx={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                <EmojiEmotionsTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 1}}/>
                <Typography variant='h6' sx={{fontWeight: 700}}>Your Trip Details</Typography>
            </Box>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemText
          primary={`${rd.diffDays} nights in ${vd.location}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Booked by: {ud.email}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemText
          primary="Dates"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Check In: {moment(rd.checkIn).format('MMMM Do, YY')}
              </Typography>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Check Out: {moment(rd.checkOut).format('MMMM Do, YY')}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem >
      <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemText
          primary="Guests"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {vd.guests} {`${vd.guests > 1 ? 'guests' : 'guest'}`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
            <Divider/>
            <Box sx={{marginY: 3}}>
                <Stack direction='row'>
                    <SettingsTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 1}}/>
                    <Typography variant='h6' sx={{fontWeight: 700}}>Need to modify your booking?</Typography>
                </Stack>
                <Typography>To review or make changes to your reservation, visit your <Link to="/account">account page</Link>.</Typography>
            </Box>
        </Box>
       </Grid>
       <Grid item
       xs={5}
       sm={5}
       md={5}>
        <Paper elevation={5} sx={{padding: 4, borderRadius: 3}}>
            <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', paddingBottom: 3}}>
                <Box component='img' src={vd.imageUrl} sx={{maxWidth: '200px', borderRadius: 3}}/>
                <Box sx={{display: 'flex', flexDirection: 'column', marginX: 1}}>
                    <Typography variant="caption">Entire property</Typography>
                    <Typography variant='body2'>Fantastic {vd.title}</Typography>
                    <Typography variant='body2'>Featuring {vd.amenities}</Typography>
                    <Stack direction='row' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 4}}>
                        <StarIcon sx={{width: '16px', height: '16px'}}/>
                        <Typography variant='body2'>{vd.rating} (38 reviews)</Typography>
                    </Stack>
                </Box>
            </Box>
        </Box> 
            <Divider/>
            <Box sx={{marginY: 2, borderRadius: 3}}>
                <Typography>Your booking is protecting by <Typography component='span'
                sx={{fontWeight: 800, color: '#FF5A5F'}}>air</Typography>
                    <Typography component='span' sx={{fontWeight: 800}}>cover</Typography>
                </Typography>
            </Box>
            <Divider/>
            <Box sx={{marginY: 3}}>
                <Typography variant='h6' sx={{fontWeight: 700}}>Price details</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginY: 2}}>
                    <Typography>${rd.pricePerNight} x {rd.diffDays} nights</Typography>
                    <Typography>${rd.pricePerNight * rd.diffDays}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginY: 2}}>
                    <Typography sx={{textDecoration: 'underline', textDecorationThickness: 1}}>Cleaning Fee</Typography>
                    <Typography>$195.00</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginY: 2}}>
                    <Typography sx={{textDecoration: 'underline', textDecorationThickness: 1}}>Service Fee</Typography>
                    <Typography>$169.69</Typography>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                <Typography sx={{fontWeight: 700}}>Total(USD)</Typography>
                <Typography sx={{fontWeight: 700}}>${rd.pricePerNight * rd.diffDays + 195.00 + 169.69}</Typography>
            </Box>
        </Paper>
       </Grid>
        </Grid>
    </Container>
  )
}
function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PaymentSuccess)

/*


<div className="reservation-success row">
    <h1 className="col m12 center">Start Packing!</h1>
    <div className="resv-details col s8 offset-s2">
        <div className="confirmed col m12 row">
            <FontAwesomeIcon icon="long-arrow-alt-right" size="1x" color="#ED0000" />Confirmed: {rd.diffDays} nights in {vd.location}
            <div className="header-text">
                <div>Booked by: {ud.email}</div>
                <div>{moment().format("MMMM Do, YYYY")}</div>
            </div>
        </div>
        <div className="confirmed-detail row">
            <div className="col m5">
                <div className="bordered col">
                    <div className="col m12 upper">
                        <div className="left">Check in</div><div className="right">Check out</div>
                    </div>
                    <div className="col m12 lower">
                        <div className="left">{moment(rd.checkIn).format('MMMM Do, YY')}</div><div className="right">{moment(rd.checkOut).format('MMMM Do, YY')}</div>
                    </div>
                    <div className="col m12 title-text">
                        {vd.title}
                    </div>  
                    <div className="col m12 details">
                        {vd.details}
                    </div>  
                </div>
            </div>


            <div className="col m7">
                <div className="bordered col">
                    <div className="col m12 upper charges">
                        <div className="charges-text col m12">Charges</div>
                        <div className="row col m12">
                            <div className="left">${rd.pricePerNight} x {rd.diffDays} nights</div>
                            <div className="right">${rd.totalPrice}</div>
                        </div>
                        <div className="row col m12">
                            <div className="left">Discount</div>
                            <div className="right">$0</div>
                        </div>                                
                        <div className="row col m12 total">
                            <div className="left">TOTAL</div>
                            <div className="right">${rd.totalPrice}</div>
                        </div>
                    </div>
                    <div className="col m12 row">To rview or make changes to your reservation in the future, visit your <Link to="/account">account page</Link>.</div>
                    <div className="col m12 resv-image"><img src={vd.imageUrl} /></div>
                </div>
            </div>
        </div>
    </div>
</div>*/