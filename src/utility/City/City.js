import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Card, CardMedia, Typography } from '@mui/material'

function City(props) {
    const {cityName, image, price, id} = props.city
  return (
   
      <Card>
        <Link to={`/city/${cityName}`} style={{ textDecoration: 'inherit'}}>
        <Box sx={{display: 'flex', flexDirection: 'column' }}>
        <CardMedia
                    component="img"
                    src={image} 
                    alt={cityName}
                  />
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.25)',
                    color: "#F8F8FF",
                    padding: '10px',
                    marginTop: '-93px'
                  }}
                >
                  
                  <Typography variant="h5">{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</Typography>
                  <Typography variant="body2"> <Typography component='span' sx={{ fontWeight: 800}}>${price}</Typography> /night average</Typography>
          
        </Box>
        </Box>
        </Link>
        </Card>
  )
}

export default City

