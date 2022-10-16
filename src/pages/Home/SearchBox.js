import React, {useState} from 'react'
import useControlledInput from '../../customHooks/useControlledInput'
import {useNavigate} from 'react-router-dom'
import { styled } from '@mui/system'

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { theme } from '../../theme/theme';


const SearchStyledStack = styled(Box)(({theme})=> ({
  [theme.breakpoints.up('sm')] : {
    maxWidth: '360px',
    borderRadius: 3,
    boxShadow: '2px 2px 6px #767676',
    marginLeft: '60px',
    padding: '30px',
  },
  [theme.breakpoints.down('sm')] : {
      width: '100%',
      height: 'auto',
      padding: "40px 2px",
  },
    direction: 'column',
    backgroundColor: 'white',
}))
const HeadlineTypography = styled(Typography)(({theme})=> ({
  [theme.breakpoints.up('sm')] : {
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 'normal'
  },
  [theme.breakpoints.down('sm')] : {
      fontSize: 20,
      fontWeight: 500,
  },
}))
const SearchButton = styled(Button)(({theme})=> ({
     backgroundColor: '#FF385C',
     color: '#FFFFFF',
     padding: 8,
     marginTop: 10,
     '&:hover': {
      backgroundColor: '#FF385C'
  },
}))


function SearchBox(props) {
  const where = useControlledInput('');
  let navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate('/search/' + where.value)
  }
  return (
    <SearchStyledStack>
      
        <Box>
        <HeadlineTypography>Book unique places to stay and things to do.</HeadlineTypography>
        <Typography variant='body2' pt={2} style={{color: theme.palette.foggy.main}}>Discover entire homes, private rooms, entertainment perfect for any trip.</Typography>
        </Box>
       <Box pt={3}>
     <form  onSubmit={submitSearch}>
     
            <TextField
            required
            fullWidth
            label="Location"
            placeholder='Anywhere'
            type='text'
            {...where}
            
            InputLabelProps={{
              style: { color: theme.palette.hof.main },
              shrink: true
            }}
            />
            <SearchButton type='submit' fullWidth>Search</SearchButton>
          </form>
      </Box>
    </SearchStyledStack>
  )
}

export default SearchBox

{/*
const SearchStyledStack = styled(Stack)(({theme})=> ({
  [theme.breakpoints.up('sm')] : {
    maxWidth: '360px',
    marginTop: 34,
    borderRadius: '16px',
    boxShadow: 3,
    padding: '30px',
    marginLeft: "40px",
  },
  [theme.breakpoints.down('sm')] : {
      width: '100%',
      height: 'auto',
      padding: "40px 2px",
  },
    direction: 'column',
    backgroundColor: 'white',
}))
const HeadlineTypography = styled(Typography)(({theme})=> ({
  [theme.breakpoints.up('sm')] : {
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 'normal'
  },
  [theme.breakpoints.down('sm')] : {
      fontSize: 20,
      fontWeight: 500,
  },
}))
const SearchButton = styled(Button)(({theme})=> ({
     backgroundColor: '#FF385C',
     color: '#FFFFFF',
     padding: 8,
     marginTop: 10,
     '&:hover': {
      backgroundColor: '#FF385C'
  },
}))


function SearchBox(props) {
  const where = useControlledInput('');
  //const [checkOut, setCheckOut] = useState('')
  //const [checkIn, setCheckIn] = useState('');
  const checkOut = useControlledInput('');
  const checkIn = useControlledInput('');
  const adults = useControlledInput('');
  const children = useControlledInput('');

  let navigate = useNavigate();


  const submitSearch = (e) => {
    e.preventDefault();
    navigate('/search/' + where.value)
    console.log(where.value, "dfvhbfhjwbfjwehbf")
  }
  return (
    <SearchStyledStack>
      
        <Box>
        <HeadlineTypography>Book unique places to stay and things to do.</HeadlineTypography>
        <Typography variant='body2' pt={2} style={{color: theme.palette.foggy.main}}>Discover entire homes, private rooms, entertainment perfect for any trip.</Typography>
        </Box>
       <Box pt={3}>
     <form  onSubmit={submitSearch}>
     
            <TextField
            fullWidth
            label="Location"
            placeholder='Anywhere'
            type='text'
            {...where}
            
            InputLabelProps={{
              style: { color: theme.palette.hof.main },
              shrink: true
            }}
            />
          <Stack direction='row' spacing={0.5} pt={2}>
          <TextField type='date'
          fullWidth
          label="Check In"
          InputLabelProps={{
            style: { color: theme.palette.hof.main },
            shrink: true
          }}
            {...checkIn}/>

           <TextField type='date'
           fullWidth
           label="Check Out"
           InputLabelProps={{
             style: { color: theme.palette.hof.main },
             shrink: true
           }}
            {...checkOut}/>
          
         </Stack>
         <Stack direction='row' pt={2}>
            <TextField  
            fullWidth
            type='number'
            label='Adults'
            placeholder="2"
            InputLabelProps={{
              style: { color: theme.palette.hof.main },
              shrink: true
            }}
            {...adults}/>
         </Stack>
            <SearchButton type='submit' fullWidth>Search</SearchButton>
          </form>
      </Box>
    </SearchStyledStack>
  )
}

 <Stack direction='row' spacing={0.5} pt={2}>
          <TextField 
          type='date'
          fullWidth
          label="Check In"
          InputLabelProps={{
            style: { color: theme.palette.hof.main },
            shrink: true
          }}
            {...checkIn}/>

           <TextField 
           type='date'
           fullWidth
           label="Check Out"
           InputLabelProps={{
             style: { color: theme.palette.hof.main },
             shrink: true
           }}
            {...checkOut}/>
          
         </Stack>
         <Stack direction='row' pt={2}>
            <TextField  
            fullWidth
            type='number'
            label='Adults'
            placeholder="2"
            InputLabelProps={{
              style: { color: theme.palette.hof.main },
              shrink: true
            }}
            {...adults}/>
         </Stack>
  */}