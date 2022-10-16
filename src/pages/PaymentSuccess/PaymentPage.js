import React from 'react'
import moment from 'moment'
import { Container } from '@mui/system'
import { Typography, Grid, Box, Divider, Paper, Stack, List, ListItem, ListItemText } from '@mui/material'
import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';
import StarIcon from '@mui/icons-material/StarRate';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import { useLocation } from "react-router-dom";
import CreditCardSection from './CreditCardSection'



const PaymentPage = () => {
    const location = useLocation();
    console.log(location, "PAYMENT PAGE")
 

  return (
    
    <Container maxWidth='lg'>
        <Box sx={{display: 'flex', flexDirection: 'row', margin: 4}} >
            <DoubleArrowTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 1}}/>
            <Typography variant='h5'>Confirm and Pay</Typography>
        </Box>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item
                xs={12}
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
          primary={`${location.state.diffDays} nights in ${location.state.venueData.location}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Booked on {moment().format("MMMM Do, YYYY")}
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
                Check In: {moment(location.state.checkIn).format('MMMM Do, YY')}
              </Typography>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Check Out: {moment(location.state.checkOut).format('MMMM Do, YY')}
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
                {location.state.numberOfGuests} {`${location.state.numberOfGuests > 1 ? 'guests' : 'guest'}`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
            <Divider/>
            <CreditCardSection/>
            <Divider/>
        </Box>
       </Grid>
       <Grid item
       xs={12}
       sm={5}
       md={5}>
        <Paper elevation={5} sx={{padding: 4, borderRadius: 3, marginBottom: 4}}>
            <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', paddingBottom: 3}}>
                <Box component='img' src={location.state.venueData.imageUrl} sx={{maxWidth: '200px', borderRadius: 3}}/>
                <Box sx={{display: 'flex', flexDirection: 'column', marginX: 1}}>
                    <Typography variant="caption">Entire property</Typography>
                    <Typography variant='body2'>Fantastic {location.state.venueData.title}</Typography>
                    <Typography variant='body2'>Featuring {location.state.venueData.amenities}</Typography>
                    <Stack direction='row' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 4}}>
                        <StarIcon sx={{width: '16px', height: '16px'}}/>
                        <Typography variant='body2'>{location.state.venueData.rating} (38 reviews)</Typography>
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
                    <Typography>${location.state.pricePerNight} x {location.state.diffDays} nights</Typography>
                    <Typography>${location.state.pricePerNight * location.state.diffDays}</Typography>
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
                <Typography sx={{fontWeight: 700}}>${location.state.pricePerNight * location.state.diffDays + 195.00 + 169.69}</Typography>
            </Box>
        </Paper>
       </Grid>
        </Grid>
    </Container>
  )
}

export default PaymentPage

/*
<Box sx={{marginY: 3}}>
                <Stack direction='row'>
                    <SettingsTwoToneIcon sx={{width: "30px", height: '30px', marginRight: 1}}/>
                    <Typography variant='h6' sx={{fontWeight: 700}}>Need to modify your booking?</Typography>
                </Stack>
                <Typography>To review or make changes to your reservation, visit your <Link to="/account">account page</Link>.</Typography>
            </Box>
            */