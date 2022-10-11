import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, ListItemIcon  } from '@mui/material'
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import FireplaceTwoToneIcon from '@mui/icons-material/FireplaceTwoTone';
import SelfImprovementTwoToneIcon from '@mui/icons-material/SelfImprovementTwoTone';

const Point = ({point, pointDesc}) => {
    const dataPoint = pointDesc.find((item) => item.pointTitle === point)
  return (
      <Box>
         <List>
      <ListItem  alignItems="flex-start" sx={{padding: 0}}>
        <ListItemIcon sx={{width: "20px"}}>
            {point === 'Entire home' ? <HomeWorkTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
            {point === 'Sparkling clean' ? <DoneOutlineTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
            {point === 'Great location' ? <ExploreTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
            {point === 'Superhost' ? <MoodTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
            {point === 'Self check-in' ? <SelfImprovementTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
            {point === 'Indoor fireplace' ? <FireplaceTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
            {point === 'Great check-in experience' ? <ThumbUpAltTwoToneIcon sx={{width: "40px", height: '40px'}}/> : ''}
        </ListItemIcon>
        <ListItemText
          primary={point}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {dataPoint.text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </Box>
  )
}

export default Point

/*

        <Typography variant='h6'>{point}</Typography>
        <Typography variant='subtitle1'>{dataPoint.text}</Typography>*/