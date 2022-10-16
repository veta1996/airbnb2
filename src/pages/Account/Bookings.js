import React from 'react'
import { styled } from '@mui/system'
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
    console.log(props, 'FROM BOOKING')
    const randonConfirmationCode = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
             }
        return result;
    }
    const bookings = props.booking.map((booking, i) => {
       return(
                <TableRow key={i}>
                <TableCell>
                    <TypographyTable>Reserved</TypographyTable>
                </TableCell>
                <TableCell>
                    <Box component='img' src={booking.image} sx={{width: '160px', maxHeight: '140px', borderRadius: 3}}/>
                    <TypographyTable>
                        <TypographySpan component='span'>Location: </TypographySpan>{booking.cityName.charAt(0).toUpperCase() + booking.cityName.slice(1)} </TypographyTable>
                </TableCell>
                <TableCell>
                    <TypographyTable><TypographySpan component='span'>Confirmation #: </TypographySpan>{randonConfirmationCode(9)}</TypographyTable>
                    <TypographyTable>
                        <TypographySpan component='span'>Dates: </TypographySpan>Dec 3th - 10th, 2022</TypographyTable>
                    <TypographyTable><TypographySpan component='span'>${booking.price} </TypographySpan> per night</TypographyTable>
                    <TypographyTable><TypographySpan component='span'>Total: </TypographySpan>${booking.price * 3 + 195.00}</TypographyTable>
                </TableCell>
                <TableCell>
                        <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                    >
                    <ActionButton>
                        Print Booking
                    </ActionButton>
                    <ActionButton >Cancel Booking</ActionButton> 
                    </ButtonGroup>
                </TableCell>
                </TableRow>
       )
    })

  return (
             <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} size="medium" aria-label="booking data">
                        <TableHead>
                            <TableRow>
                                <TableCell><TypographySpan sx={{fontSize: '16px'}}>Status</TypographySpan></TableCell>
                                <TableCell><TypographySpan sx={{fontSize: '16px'}}>Location</TypographySpan></TableCell>
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


