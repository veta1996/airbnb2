import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

const Amenities = ({amenity}) => {
  return (
    <List sx={{marginRight: 3}}>
        <ListItem sx={{border: '1px solid black', borderRadius: '20px'}}>
            <ListItemText sx={{display: 'flex'}}>
            {amenity}
            </ListItemText>
    </ListItem>
    </List>
  )
}

export default Amenities