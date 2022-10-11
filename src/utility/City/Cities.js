import React from 'react'
import City from './City'
import Slider from '../Slider/Slider'
import { Container, Grid, Typography } from '@mui/material'

const Cities = ({cities, header}) => {
  const citiesList =  cities.map((city, i) => {
      return(
        <Grid item xs={12} sm={6} md={4} key={i}>
          <City city={city} key={i} />
        </Grid>
      )
  })
  
  return(
    <Container maxWidth="lg">
          <Typography variant='h5' sx={{fontWeight: 600, marginY: 2}}>{header}</Typography>
              <Slider elements={citiesList}/>
      </Container>
  )
}

export default Cities;