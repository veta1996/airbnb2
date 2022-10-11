import React, { useState } from 'react'
import { Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { styled } from '@mui/system'


const ChangePasswordField = styled(TextField)(({theme})=> ({
  margin: 8,
  width: '300px',
  '&:hover, &:active, &:focus': {
      color: theme.palette.hof.main,
      backgroundColor: 'transparent',
      borderColor: theme.palette.hof.main,
      boxShadow: 'none',
    },
    InputLabelProps: {
      style: { color: theme.palette.hof.main },
      shrink: true
    },
}))
const ChangePasswordButton = styled(Button)(({theme})=> ({
  width: '300px',
  backgroundColor: '#FF385C',
  color: '#FFFFFF',
  margin: 20,
  '&:hover': {
   backgroundColor: '#FF385C'
},
}))
const PaperPassword = styled(Paper)(({theme})=> ({
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center', 
  justifyContent: 'center',
  //background: "#ee9ca7", 
  //background: "-webkit-linear-gradient(to right, #ffdde1, #ee9ca7)",  
  //background: "linear-gradient(to right, #ffdde1, #ee9ca7)", 
  [theme.breakpoints.up('sm')] : {
      width: 'auto',
      my: 8,
      mx: 4,
  },
  [theme.breakpoints.down('sm')] : {
      width: '400px',
},
}))
function ChangePassword() {

  const token = useSelector(state => state.auth.token)
  const [newPassword, setNewPassword] = useState("")
  const [newPasConfirm, setNewPasConfirm] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasConfirm){
      Swal.fire({
        title: "Please make sure that inputs are the same",
        icon: 'error'
      })
      setNewPassword('');
      setNewPasConfirm('');
    } else {
      const data = {
        token: token, 
        newPassword
      }
      const urlSetPassword = `${window.apiHost}/users/change-password`;
      const resp = await axios.post(urlSetPassword, data)
      if (resp.data.msg === 'passUpdated'){
        Swal.fire({
          title: "Your password has been updated successfully",
          icon: 'success'
        })
      } else if (resp.data.msg === 'badJwt'){
        Swal.fire({
          title: "There was a error cancelling",
          icon: 'error'
        })
        setNewPassword('');
        setNewPasConfirm('')
      }
    }
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
      <PaperPassword elevation={8}>
      <Typography variant="h6" sx={{margin: 3}}>Change Your Password</Typography>
             <ChangePasswordField 
            label="New Password"
            type="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
           <ChangePasswordField
            label="Confirm New Password"
            type="password"
            autoComplete="current-password"
            value={newPasConfirm}
            onChange={(e) => setNewPasConfirm(e.target.value)}
          />
          <ChangePasswordButton type='submit' fullWidth>Submit</ChangePasswordButton>
          </PaperPassword>
          </form>
        </Box>
  )
}



export default ChangePassword