import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PaymentSuccess.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useSelector } from 'react-redux'
import Spinner from '../../utility/Spinner/Spinner'
import moment from 'moment'
library.add(faLongArrowAltRight)



function PaymentSuccess(props) {

    const {stripeToken} = useParams()
    const token = useSelector(state => state.auth.token)
    const [reservationDetails, setReservationDetails] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [venueDetails, setVenuedetails] = useState({})
    const [waiting, setWaiting] = useState(true)
   
    useEffect(() => {
        const getData = async(e) => {
        const data = {stripeToken, token}
        const successUrl = `${window.apiHost}/payment/success`
        const resp = await axios.post(successUrl, data)
        setReservationDetails(resp.data)
        setWaiting(false)
        //setUserData(resp.data.userData)
        console.log(data, resp.data)
    }
    getData()
    }, [])

    if(waiting) {
        return <Spinner/>
    }

    const vd = reservationDetails.reservationDetails.venueData
    const rd = reservationDetails.reservationDetails
    const ud = reservationDetails.userData
    console.log(vd, "VD")
    console.log(reservationDetails, "reservationDetails")
  return (
    <div className="reservation-success row">
    <h1 className="col m12 center">Start Packing!</h1>
    <div className="resv-details col s8 offset-s2">
        <div className="confirmed col m12 row">
            <FontAwesomeIcon icon="long-arrow-alt-right" size="1x" color="#ED0000" />Confirmed: {rd.diffDays} nights in {vd.location}
            <div className="header-text">
                <div>Booked by: {ud.email}</div>
                <div>{moment().format("MMMM Do, YYYY")}</div>
            </div>
        </div>
        <div className="confirmed-detail row">
            <div className="col m5">
                <div className="bordered col">
                    <div className="col m12 upper">
                        <div className="left">Check in</div><div className="right">Check out</div>
                    </div>
                    <div className="col m12 lower">
                        <div className="left">{moment(rd.checkIn).format('MMMM Do, YY')}</div><div className="right">{moment(rd.checkOut).format('MMMM Do, YY')}</div>
                    </div>
                    <div className="col m12 title-text">
                        {vd.title}
                    </div>  
                    <div className="col m12 details">
                        {vd.details}
                    </div>  
                </div>
            </div>


            <div className="col m7">
                <div className="bordered col">
                    <div className="col m12 upper charges">
                        <div className="charges-text col m12">Charges</div>
                        <div className="row col m12">
                            <div className="left">${rd.pricePerNight} x {rd.diffDays} nights</div>
                            <div className="right">${rd.totalPrice}</div>
                        </div>
                        <div className="row col m12">
                            <div className="left">Discount</div>
                            <div className="right">$0</div>
                        </div>                                
                        <div className="row col m12 total">
                            <div className="left">TOTAL</div>
                            <div className="right">${rd.totalPrice}</div>
                        </div>
                    </div>
                    <div className="col m12 row">To rview or make changes to your reservation in the future, visit your <Link to="/account">account page</Link>.</div>
                    <div className="col m12 resv-image"><img src={vd.imageUrl} /></div>
                </div>
            </div>
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

export default connect(mapStateToProps)(PaymentSuccess)