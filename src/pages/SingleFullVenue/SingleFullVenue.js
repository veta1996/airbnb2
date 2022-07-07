import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './SingleFullVenue.css'
import axios from 'axios'
import Point from './Point';
import NavBar from '../../utility/NavBar/NavBar';
import Login from '../Login/Login';
import {connect, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import moment from 'moment'
import Swal from 'sweetalert2';
import loadScript from '../../utilityFunctions/loadScript';

function SingleFullVenue(props) {
   
    const token = useSelector(state => state.auth.token);

 const {vid} = useParams();
 const [singleVenue, setSingleVenue] = useState({});
 const [points, setPoints] = useState([]);
 const [checkIn, setCheckIn] = useState('');
 const [checkOut, setCheckOut] = useState('');
 const [numberOfGuests, setNumberOfGuests] = useState('')

    useEffect(() => {
       const getData = async() =>{
            const url = `${window.apiHost}/venue/${vid}`;
            const axiosRes = await axios.get(url);
            const singleVenueData = axiosRes.data;

            const pointUrl = `${window.apiHost}/points/get`;
            const pointAxiosRes = await axios.get(pointUrl);

            const points = singleVenueData.points.split(',').map((point, i) => {
                return <Point key={i} pointDesc={pointAxiosRes.data} point={point}/>
            })
            setSingleVenue(singleVenueData);
            setPoints(points)

        }
    getData()
    }, [])
console.log(singleVenue)
    const reserveNow = async(e) => {
        
        const startDateMoment = moment(checkIn)
        const endDateMoment = moment(checkOut)
        const diffDays = endDateMoment.diff(startDateMoment, 'days')
        if (diffDays < 1) {
            Swal({
                title: "Check out date must be after check out date", 
                icon: "Error"
            })
        } else if(isNaN(diffDays)){
            Swal({
                title: "Please check if your dates are valid", 
                icon: "Error"
            })
        } else {
            const pricePerNight = singleVenue.pricePerNight;
            const totalPrice = diffDays * pricePerNight;
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';
            const scriptUrl = 'https://js.stripe.com/v3'
            await loadScript(scriptUrl)
            const stripe = window.Stripe(stripePublicKey)
            const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
            const data = {
                venueData: singleVenue,
                totalPrice,
                diffDays,
                pricePerNight,
                checkIn: checkIn,
                checkOut: checkOut,
                token: token,
                numberOfGuests: numberOfGuests,
                currency: 'USD',
            }
            const sessionVar = await axios.post(stripeSessionUrl,data);
            console.log(sessionVar.data);
            stripe.redirectToCheckout({
                sessionId: sessionVar.data.id,
            }).then((result)=>{
                console.log(result);
                //if the network fails, this will run
            })
        }

    }
   
    console.log(props.auth, "PROPS FROM SINGLEVenue")
  return (
    <div className='row single-venue'>
         <NavBar/>
        <div className='col s12 center'>
            <img src={singleVenue.imageUrl} alt={singleVenue.title}/>
        </div>
        <div className='col s8 location-details offset-s2'>
            <div className='col s8 left-details'>
                <div className='location'>{singleVenue.location}</div>
                <div className='title'>{singleVenue.title}</div>
                <div className='guests'>{singleVenue.guests}</div>
                <div className='divider'></div>
                    {points}
                <div className='details'>{singleVenue.details}</div>
                <div className='amenities'>{singleVenue.amenities}</div>
            </div>

            <div className='col s4 right-details'>
                <div className='price-per-day'>${singleVenue.pricePerNight}/per night</div>
                <div className='rating'>Rating: {singleVenue.rating}</div>
                <div className='col s6'>
                    Check-In
                    <input type='date' value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
                </div>
                <div className='col s6'>
                    Check-Out
                    <input type='date' value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}/>
                </div>

                <div className='col s12'>
                    <select className='browser-default' value={numberOfGuests} onChange={(e)=>setNumberOfGuests(e.target.value)}>
                        <option value='1'>1 Guest</option>
                        <option value='2'>2 Guests</option>
                        <option value='3'>3 Guests</option>
                        <option value='4'>4 Guests</option>
                        <option value='5'>5 Guests</option>
                        <option value='6'>6 Guests</option>
                        <option value='7'>7 Guests</option>
                        <option value='8'>8 Guests</option>
                    </select>
                </div>
                <div className='col s12 center'>
                    {token ? 
                    <button className='btn red accent-2' onClick={reserveNow}>Reserve</button> :
                    <div>You must <span className='text-link' onClick={() => {props.openModal('open', <Login/>)}}>Log In</span> to reserve</div>
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue)