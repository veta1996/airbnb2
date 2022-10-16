import React from 'react'
import Venue from './Venue'
import { Grid, Typography, Box} from '@mui/material'


const Venues = ({venues, header}) => {
    
    const venuesData = venues.map((venue, i)=>{
        
        return(
            <Grid item key={i} xs={6} sm={4} md={3}>
                <Venue venue={venue}/>
            </Grid>
        )
    })
    return(
        <Box sx={{py: 8}} maxWidth="lg">
            <Typography variant='h5' sx={{fontWeight: 600, marginY: 2}}>{header}</Typography>
                <Grid container spacing={2}>
                    {venuesData}
                </Grid>
        </Box>
        
    )
}

export default Venues;

