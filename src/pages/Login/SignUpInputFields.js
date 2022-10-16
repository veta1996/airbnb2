import React from 'react'
import './Login.css'
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/system'
import { theme } from '../../theme/theme';

const LoginBox = styled(Box)(({theme})=> ({
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    my: 8,
    mx: 4,
    [theme.breakpoints.up('sm')] : {
        width: '460px',
    },
    [theme.breakpoints.down('sm')] : {
        width: '400px',
  },
}))
const LoginTextField = styled(TextField)(({theme})=> ({
    margin: 8,
    width: '300px',
    '&:hover, &:active, &:focus': {
        color: theme.palette.hof.main,
        backgroundColor: 'transparent',
        borderColor: theme.palette.hof.main,
        boxShadow: 'none',
      }
}))

const SubmitLoginButton = styled(Button)(({theme})=> ({
    margin: 8,
    width: '300px',
    backgroundColor: '#FF385C',
    color: '#FFFFFF',
    padding: 8,
    marginTop: 10,
    '&:hover': {
     backgroundColor: '#FF385C'
 },
}))
function SignUpInputFields(props) {
    console.log(props, 'from SignUpInputFields')
  return (
    <LoginBox>
        <LoginTextField 
                required
                type="text" 
                placeholder="Email address" 
                label="Email"
                InputLabelProps={{
                  style: { color: theme.palette.hof.main },
                  shrink: true
                }}
                onChange={(e) => props.setEmail(e.target.value)}
                />
                <LoginTextField
                 required
                 type="password" 
                 placeholder="Password" 
                label="Password"
                InputLabelProps={{
                  style: { color: theme.palette.hof.main },
                  shrink: true
                 }}
                onChange={(e) => props.setPassword(e.target.value)}/>
                <LoginTextField
                 required
                 type="password" 
                 placeholder="Confirm Password" 
                  label="Confirm Password"
                InputLabelProps={{
                  style: { color: theme.palette.hof.main },
                  shrink: true
                 }}
                 onChange={(e) => props.setConfirmPassword(e.target.value)}/>
                <SubmitLoginButton type='submit' fullWidth>Sign Up</SubmitLoginButton>
        
        </LoginBox>
  )
}

export default SignUpInputFields