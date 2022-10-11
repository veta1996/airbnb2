import React from 'react'
import Activity from './Activity'
import { Container, Grid, Typography } from '@mui/material'

const Activities = ({activities, header}) => {
  console.log(activities, header, 'props from activities')
  const activitiesData = activities.map((activity, i) => {
    return (
            <Grid item key={i} xs={6} sm={4} md={4}>
              <Activity activity={activity}/>
          </Grid>)
  })
  return  (<Container sx={{py: 8}} maxWidth="lg">
        <Typography variant='h5' sx={{fontWeight: 600, marginY: 2}}>{header}</Typography>
            <Grid container spacing={2}>
                {activitiesData}
            </Grid>
      </Container>)
}

export default Activities;