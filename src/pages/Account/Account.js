import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual} from 'react-redux';
import { connect } from 'react-redux'
import { Routes, Route} from 'react-router-dom';
import AccountSideBar from './AccountSideBar'
import moment from 'moment';
import Bookings from './Bookings'
import ChangePassword from './ChangePassword'
import { Grid } from '@mui/material';
import { Box } from '@mui/system';


export const Account = (props) => {

    const token = useSelector(state => state.auth.token, shallowEqual)
    const [pastBookings, setPastBookings] = useState([])
    const [upcomingBookings, setUpcomingBookings] = useState([])
    
    useEffect(() => {
        const accountUrl = `${window.apiHost}/users/getBookings`
        const data = {
            token: token
        }
        const fetchAccountData = async() => {
            const resp = await axios.post(accountUrl, data)
            console.log(resp.data)
            resp.data.forEach(booking => {
                const today = moment();
                const checkOutDate = moment(booking.checkOut)
                const diffdays = checkOutDate.diff(today, 'days')
                if(diffdays < 0){
                    pastBookings.push(booking)
                } else {
                    upcomingBookings.push(booking)
                }
            })
            setPastBookings(pastBookings);
            setUpcomingBookings(upcomingBookings)
        }
        fetchAccountData()
    }, [])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={2}
          md={3}
        >
            <AccountSideBar/>
    
    </Grid>
    <Grid item xs={12} sm={10} md={9} square>
        <Box sx={{marginX: 4}}>
              <Routes>
              <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <h1>Choose the option on the left</h1>
                        </main>
                    }
                    />
                  <Route path="reservations/confirmed" element={<Bookings type='upcoming' booking={upcomingBookings}
                        token={token}/>} />
                  <Route path="reservations/past" element={<Bookings type='past' booking={pastBookings}/>} />
                  <Route path="change-pass" element={<ChangePassword token={token}/>} />
                  </Routes>
        </Box>
        </Grid>
    </Grid>
  )
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

function mapDispatchToProps(){

}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
