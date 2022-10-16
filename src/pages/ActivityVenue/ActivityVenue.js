import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import avatar from '../../../src/images/avatar3.png'
import image3 from '../../../src/images/image3.jpeg'
import image7 from '../../../src/images/image7.jpeg'
import axios from 'axios'
import StarIcon from '@mui/icons-material/StarRate';
import Login from '../Login/Login';
import {connect, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import moment from 'moment'
import Swal from 'sweetalert2';
import { Container, styled } from '@mui/system'
import { theme } from '../../theme/theme';
import { Avatar, Box, Divider, Grid, Paper, Stack, TextField, Typography, Button} from '@mui/material';
import { List, ListItem, ListItemText, ListItemIcon  } from '@mui/material'
import StarOutlineTwoToneIcon from '@mui/icons-material/StarOutlineTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';



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
  

const ActivityVenue = (props) => {
    console.log(props, "ActivityVenue")
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const {vid} = useParams();
    const [singleActivity, setSingleActivity] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async() =>{
             const url = `${window.apiHost}/activity/${vid}`;
             const axiosRes = await axios.get(url);
             const singleActivityData = axiosRes.data;
             setSingleActivity(singleActivityData);
             console.log(singleActivityData, 'singleActivityData')
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
                title: "Check out date must be after check in date", 
            })
        } else if(isNaN(diffDays)){
            Swal.fire({
                icon: 'error',
                title: "Please check if your dates are valid", 
            })
        } else if(!numberOfGuests){
          Swal.fire({
              icon: 'error',
              title: "Please check the number of guests", 
          })
      }else {
          const pricePerNight = singleActivity.cost;
          const totalPrice = diffDays * pricePerNight;
          const data = {
              venueData: singleActivity,
              totalPrice,
              diffDays,
              pricePerNight,
              checkIn: checkIn,
              checkOut: checkOut,
              token: token,
              numberOfGuests: numberOfGuests,
              currency: 'USD',
          }
         navigate(`/payment-success-activity/${token}`, {state: data})
        }
    }

  return (
    <Container maxWidth="lg">
    <Box xs={{display: 'flex', flexDirection: 'column'}}>
        <TitleText variant='h5'>{singleActivity.title}</TitleText>
        <Box sx={{display: 'flex', flexDirection: "row", color: "#484848", fontWeight: 800, marginY: 2}}>
            <Box sx={{display: 'flex', flexDirection: "row"}}>
                <StarIcon fontSize="small"/>
                <Typography>
                {singleActivity.rating}
                </Typography>
            </Box>
            <Typography component='span' sx={{marginX: 1}}>&#183;</Typography>
            <Typography>{singleActivity.totalRatings} reviews</Typography>
        </Box>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "row", width: '100%', maxHeight: '500px', justifyContent: 'space-between'}}>
      <Box component='img' src={singleActivity.image} alt={singleActivity.title} 
      sx={{borderRadius: 3, maxWidth: '400px'}}/>
      <Box component='img' src={image3} alt={singleActivity.title} 
      sx={{borderRadius: 3, maxWidth: '300px'}}/>
      <Box component='img' src={image7} alt={singleActivity.title} 
      sx={{borderRadius: 3, maxWidth: '400px'}}/>
    </Box>

 <Grid container component="main" sx={{ height: '100vh' }}>
 <Grid
   item
   xs={12}
   sm={8}
   md={8}
 >
    <Box sx={{marginTop: 4, marginRight: 8}}>
    <Box sx={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', paddingY: 2}}>
        <Box sx={{display: "flex", flexDirection: 'column'}}>
        <TitleText variant='h5'>Experience hosted by Flavio</TitleText>
        <Box sx={{display: 'flex', flexDirection: "row", marginY: 1}}>
            <Typography>{singleActivity.duration}</Typography>
            <Typography component='span' sx={{marginX: 1}}>&#183;</Typography>
            <Typography>Hosted in English, Spanish, and Portuguese</Typography>
            
            </Box>
        </Box>
        <Avatar alt="Dani" src={avatar} sx={{ width: 80, height: 80 }} />
    </Box>
    <Divider/>
        <Box>
        <List>
       <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemIcon sx={{width: "40px", height: '40px'}}>
            <StarOutlineTwoToneIcon/>
            </ListItemIcon>
        <ListItemText
          primary='Once-in-a-lifetime'
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Guests say it's special and unique.
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemIcon sx={{width: "40px", height: '40px'}}>
            <PeopleOutlineTwoToneIcon/>
            </ListItemIcon>
        <ListItemText
          primary='Fun for couples'
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Something to try together.
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemIcon sx={{width: "40px", height: '40px'}}>
            <DateRangeTwoToneIcon/>
            </ListItemIcon>
        <ListItemText
          primary='Cancellation flexibility'
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Free cancellation up to 24 hours before the start time.
                </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start" sx={{padding: 0}}>
        <ListItemIcon sx={{width: "40px", height: '40px'}}>
            <ThumbUpAltTwoToneIcon/>
            </ListItemIcon>
        <ListItemText
          primary='Excellent value'
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                 Guests say it's well worth the price.
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

    </List>
        </Box>
    <Divider/>
     <Box sx={{marginY: 3}}>
        <Typography variant='h5' sx={{marginY: 3, fontWeight: 800}} >What you'll do</Typography>
        <Typography>{singleActivity.description}</Typography>
     </Box>
    </Box>      
</Grid>

<Grid
   item
   xs={12}
   sm={4}
   md={4}
 >

    <Paper elevation={6} sx={{padding: 4, marginTop: 4}}>
    <Box sx={{display: 'flex', flexDirection: "row", color: "#484848", fontWeight: 800, justifyContent: 'space-between', paddingBottom: 2}}>
        <Typography style={{fontSize: '18px', fontWeight: 700}}>From ${singleActivity.cost} <Typography component='span' variant='body2'>/ person</Typography></Typography>
        <Box sx={{display: 'flex', flexDirection: "row"}}>
            <StarIcon fontSize="small"/>
            <Typography>
            {singleActivity.rating}
            </Typography>
        </Box>
        </Box>
        <Box>
        <Stack direction='row' spacing={0.5} pt={2}>
      <TextField
      type='date'
      fullWidth
      label="Check In"
      InputLabelProps={{
        style: { color: theme.palette.hof.main },
        shrink: true
      }}
      value={checkIn} 
      onChange={(e)=>setCheckIn(e.target.value)}/>

       <TextField 
       type='date'
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
        <ReserveButton onClick={() => dispatch(openModal('open', <Login/>))} fullWidth>Log In</ReserveButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityVenue)
