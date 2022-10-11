import React from 'react'
import City from './City'
import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'


const CitySearch = ({cities, header}) => {
    const citiesList =  cities.map((city, i) => {
        return(
          <Box sx={{maxWidth: '300px'}}>
            <City city={city} key={i} />
          </Box>
        )
    })
    
    return(
      <Container maxWidth="lg">
            <Typography variant='h6'>{header}</Typography>
                {citiesList}
        </Container>
    )
}

export default CitySearch