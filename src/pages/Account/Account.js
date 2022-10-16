import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual} from 'react-redux';
import { connect } from 'react-redux'
import { Routes, Route} from 'react-router-dom';
import AccountSideBar from './AccountSideBar'
import Bookings from './Bookings'
import ChangePassword from './ChangePassword'
import { Grid } from '@mui/material';
import { Box } from '@mui/system';


export const Account = (props) => {
    const token = useSelector(state => state.auth.token, shallowEqual)
    const [upcomingBookings, setUpcomingBookings] = useState([])
    
    useEffect(() => {
        const accountUrl = `${window.apiHost}/cities/recommended`
        const data = {
            token: token
        }
        const fetchAccountData = async() => {
            const resp = await axios.get(accountUrl)
            console.log(resp.data, 'DATA')
            setUpcomingBookings(resp.data)
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
    <Grid item xs={12} sm={10} md={9}>
        <Box sx={{marginX: 4}}>
              <Routes>
              <Route
                    path="*"
                    element={<Bookings type='upcoming' booking={upcomingBookings}
                    token={token}/>}
                    />
                  <Route path="reservations/confirmed" element={<Bookings type='upcoming' booking={upcomingBookings}
                        token={token}/>} />
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
export default connect(mapStateToProps)(Account)
