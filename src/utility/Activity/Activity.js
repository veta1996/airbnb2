import React from 'react'
import {Link} from 'react-router-dom'
import StarIcon from '@mui/icons-material/StarRate';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const Activity = ({activity}) => {
  
  return (
         <Card sx={{height: '100%', display: "flex", flexDirection: 'column', borderRadius: 3}}>
         <Link to={`/activity/${activity.id}`} style={{ textDecoration: 'inherit'}}> 
             <CardMedia component='img' src={activity.image} alt={activity.title} sx={{maxHeight: '300px'}}/>
            <CardContent sx={{display: 'flex', flexDirection: "column", flexGrow: 1}}>
             <Box sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-between'}}>
             <Typography style={{ color: "#484848", fontWeight: 800}} variant='body1'>
             {activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1)}
                     </Typography>
                     <Box sx={{display: 'flex', flexDirection: "row", color: "#484848", fontWeight: 800}}>
                     <StarIcon fontSize="small"/>
                     <Typography>
                     {activity.rating}
                     </Typography>
                     </Box>
             </Box>
                 <Typography variant='subtitle2' style={{ color: "#767676"}}>
                 {activity.title.charAt(0).toUpperCase() + activity.title.slice(1)}
                 </Typography>
                 <Typography variant='body1' style={{ color: "#484848"}}>
                 <Typography component='span' sx={{ fontWeight: 800}}>${activity.cost}</Typography> night
                 </Typography>
            </CardContent>
             
         </Link>
     </Card>
  )
}

export default Activity