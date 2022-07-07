import React from 'react'
import moment from 'moment'
import './Account.css'
import Swal from 'sweetalert2'
import axios from 'axios'


function Bookings(props) {
    const bookings = props.booking.map((booking, i) => {
        const dates = `${moment(booking.checkIn).format('MMM Do')} - ${moment(booking.checkOut).format('MMM Do YYYY')}`
       return(
                    <tr key={i} className="booking-row">
                <td>{props.type === 'upcoming'
                ? booking.status : 'completed'}</td>
                <td>
                    <div className="booking-detail">{dates}</div>
                    <div className="booking-detail">{booking.venueData.title}</div>
                    <div className="booking-detail">{booking.venueData.location}</div>
                </td>
                <td>
                    <div className="booking-detail">Confirmation #: {booking.conf}</div>
                    <div className="booking-detail">{booking.numberOfGuests} Guests, {booking.totalNights} Nights</div>
                    <div className="booking-detail">${booking.pricePerNight} per night</div>
                    <div className="booking-detail">${booking.totalPrice} Total</div>
                </td>
                <td>
                    <div className="booking-detail pointer">
                        Print Reservation
                    </div>
                    {props.type === 'upcoming' && booking.status !== 'cancelled' ? 
                    <div onClick={() => cancelBooking(booking.id, booking.venueData.location)} className="booking-detail pointer">Cancel Confirmation</div> : ''}
                </td>
                </tr>
       )
    })

    const cancelBooking = async(bid, location) => {

        const cancelReservation = await Swal.fire({
           title: `Are you sure that you want to cancel your trip to ${location}?`,
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: "YES",
       })
       
       if(cancelReservation.isConfirmed){
        const url = `${window.apiHost}/reservation/cancel`
        const data = {
            token: props.token,
            bid
        }
        const resp = await axios.post(url, data)
        if(resp.data.msg === 'cancelled'){
            Swal.fire("Reservation has been cancelled", '', 'success')
        }
       }else {
        Swal.fire("Changes are not saved", '', 'info')
    }
    }

  return (
             <div>
                    <table className="booking">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Dates and location</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   {bookings}
                </tbody>
            </table>
        </div>
  )
}

export default Bookings