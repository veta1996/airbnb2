import React from 'react'
import StarIcon from '@mui/icons-material/StarRate';
import {Link} from 'react-router-dom'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const Venue = ({venue}) => {
    
    return(
        <Card sx={{height: '100%', display: "flex", flexDirection: 'column', borderRadius: 3}}>
            <Link to={`/venue/${venue.id}`} style={{ textDecoration: 'inherit'}}> 
                <CardMedia component='img' src={venue.imageUrl} alt={venue.title}/>
               <CardContent sx={{display: 'flex', flexDirection: "column", flexGrow: 1}}>
                <Box sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-between'}}>
                <Typography style={{ color: "#484848", fontWeight: 800}} variant='body1'>
                {venue.location.charAt(0).toUpperCase() + venue.location.slice(1)}
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: "row", color: "#484848", fontWeight: 800}}>
                        <StarIcon fontSize="small"/>
                        <Typography>
                        {venue.rating}
                        </Typography>
                        </Box>
                </Box>
                    <Typography variant='subtitle2' style={{ color: "#767676"}}>
                    {venue.title.charAt(0).toUpperCase() + venue.title.slice(1)}
                    </Typography>
                    <Typography variant='body1' style={{ color: "#484848"}}>
                    <span style={{ fontWeight: 800}}>${venue.pricePerNight}</span> night
                    </Typography>
               </CardContent>
                
            </Link>
        </Card>
    )
}

export default Venue