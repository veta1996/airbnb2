import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual} from 'react-redux';
import { connect } from 'react-redux'
import { Routes, Route} from 'react-router-dom';
import NavBar from '../../utility/NavBar/NavBar'
import './Account.css'
import AccountSideBar from './AccountSideBar'
import moment from 'moment';
import Bookings from './Bookings'
import ChangePassword from './ChangePassword'

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
        console.log(pastBookings, "pastbooking")
    }, [])

  return (
    <div className='account container-fluid'>
      <NavBar/>
        <AccountSideBar/>
        <div className='row'>
            <div className='col s8 offset-s3'>
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
            </div>
        </div>
    </div>
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

