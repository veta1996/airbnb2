import React, { useState } from 'react'
import { Typography, Box, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';


const style = {
  width: '260px',
  margin: "20px 0",
};

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
    <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            width: '600px',
            display: "flex",
            flexDirection: 'column', 
          }}
          
          autoComplete="off"
    >
      <Typography variant="h3">Change Your Password</Typography>
             <TextField 
            sx={style}
            id="outlined-newpassword-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
           <TextField
            sx={style}
            id="outlined-confirmpassword-input"
            label="Confirm New Password"
            type="password"
            autoComplete="current-password"
            value={newPasConfirm}
            onChange={(e) => setNewPasConfirm(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={style}>Submit</Button>
          </Box>
  )
}



export default ChangePassword