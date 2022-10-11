import React from 'react'
import moment from 'moment'
import { styled } from '@mui/system'
//import './Account.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Box, Button, ButtonGroup, Typography } from '@mui/material'

const ActionButton = styled(Button)(({theme})=> ({
    textTransform: 'none',
    color: theme.palette.hof.main,
    borderColor: theme.palette.hof.main,
    fontSize: '12px',
    width: '140px',
    '&:hover, &:active, &:focus': {
        color: theme.palette.hof.main,
        backgroundColor: 'transparent',
        borderColor: theme.palette.hof.main,
        boxShadow: 'none',
      }
}))

const TypographyTable = styled(Typography)(({theme})=> ({
    textTransform: 'none',
    color: theme.palette.hof.main,
    fontSize: '14px',
}))

const TypographySpan = styled(Typography)(({theme})=> ({
    textTransform: 'none',
    color: theme.palette.hof.main,
    fontSize: '14px',
    fontWeight: 700,
}))

function Bookings(props) {
    const bookings = props.booking.map((booking, i) => {
        const dates = `${moment(booking.checkIn).format('MMM Do')} - ${moment(booking.checkOut).format('MMM Do YYYY')}`
       return(
                <TableRow key={i}>
                <TableCell>
                    <TypographyTable>{props.type === 'upcoming'
                ? (booking.status.charAt(0).toUpperCase() + booking.status.slice(1)) : 'Completed'}
                </TypographyTable>
                </TableCell>
                <TableCell>
                    <TypographyTable>
                        <TypographySpan component='span'>Dates: </TypographySpan>{dates}</TypographyTable>
                    <TypographyTable>
                        <TypographySpan component='span'>Location: </TypographySpan>{booking.venueData.title}; {booking.venueData.location}</TypographyTable>
                </TableCell>
                <TableCell>
                    <TypographyTable><TypographySpan component='span'>Confirmation #: </TypographySpan>{booking.conf}</TypographyTable>
                    <TypographyTable>{booking.numberOfGuests} guests, {booking.totalNights} nights</TypographyTable>
                    <TypographyTable>${booking.pricePerNight} per night</TypographyTable>
                    <TypographyTable><TypographySpan component='span'>Total: </TypographySpan>${booking.totalPrice}</TypographyTable>
                </TableCell>
                <TableCell>
                        <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                    >
                    <ActionButton>
                        Print Booking
                    </ActionButton>
                    {props.type === 'upcoming' && booking.status !== 'cancelled' ? 
                    <ActionButton onClick={() => cancelBooking(booking.id, booking.venueData.location)}>Cancel Booking</ActionButton> : ''}
                    </ButtonGroup>
                </TableCell>
                </TableRow>
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
             <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} size="medium" aria-label="booking data">
                        <TableHead>
                            <TableRow>
                                <TableCell><TypographySpan sx={{fontSize: '16px'}}>Status</TypographySpan></TableCell>
                                <TableCell><TypographySpan sx={{fontSize: '16px'}}>Dates and Location</TypographySpan></TableCell>
                                <TableCell><TypographySpan sx={{fontSize: '16px'}}>Details</TypographySpan></TableCell>
                                <TableCell><TypographySpan sx={{fontSize: '16px'}}>Actions</TypographySpan></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings}
                        </TableBody>
            </Table>
        </TableContainer>
  )
}

export default Bookings;


/*

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
       )*/