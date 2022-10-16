import React, { useEffect, useState } from 'react'
import './Login.css'
import openModal from '../../actions/openModal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SignUpInputFields from './SignUpInputFields'
import axios from 'axios'
import Swal from 'sweetalert2'
import regAction from '../../actions/regAction'
import { Box, Button,  Divider, Typography } from '@mui/material';
import { styled } from '@mui/system'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';

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

const LoginButton = styled(Button)(({theme})=> ({
    textTransform: 'none',
    color: theme.palette.hof.main,
    borderColor: theme.palette.hof.main,
    borderRadius: 6,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    margin: 4,
    width: '300px',
    '&:hover, &:active, &:focus': {
        color: theme.palette.hof.main,
        backgroundColor: 'transparent',
        borderColor: theme.palette.hof.main,
        boxShadow: 'none',
      }
}))


const SignUpWithEmailButton = styled(Button)(({theme})=> ({
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

function SignUp(props) {
    const [signUpForm, setSignUpForm] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setSignUpForm(
            <SignUpWithEmailButton type='button'
            onClick={showSignUpInputs}
            variant='contained'>Sign Up with Email</SignUpWithEmailButton>
        )
    }, [])

    const showSignUpInputs = () => {
        setSignUpForm(<SignUpInputFields email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/>)
    }

    const submitLogin = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword){
            Swal.fire({
                title: "Passwords don't match",
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                  }
            })} else {
        const url = `${window.apiHost}/users/signup`
        const data = {
            email: email,
            password: password
        }
        //console.log(data, 'data')
        const resp = await axios.post(url, data)
        console.log(resp.data, 'resp DATA')
        //const token = resp.data.token;
        //console.log(token, 'token')

        if(resp.data.msg === 'userExists'){
           Swal.fire({
                title: "Email Exists",
                text: "The email you provided is already registered. Please try another.",
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                  }
            })
        } else if(resp.data.msg === 'invalidData'){
            Swal.fire({
                title: "Invalid Email/Password",
                text: "Please provide valid email and password",
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                  }
            })
        } else if (resp.data.msg === 'userAdded'){
            Swal.fire({
                title: "Success!",
                icon: 'success',
                allowOutsideClick: true,
                backdrop: true,
                customClass: {
                    container: 'my-swal'
                  }
            })
            props.regAction(resp.data)
        }
    }
}
 

  return (
    <Box>
    <form onSubmit={submitLogin}>
    <LoginBox>
       <Typography variant='h5' sx={{margin: 1}}>Sign up</Typography>
       <Divider variant="middle" style={{width:'100%'}}/>
       <Typography variant='h6' sx={{margin: 3}}>Welcome to Airbnb Clone</Typography>
       <LoginButton variant='outlined' startIcon={<FacebookRoundedIcon/>} 
       >Connect With Facebook</LoginButton>
       <LoginButton variant='outlined' startIcon={<GoogleIcon/>}
       >Connect With Google</LoginButton>
           <Divider variant="middle" style={{width:'80%', margin: 3}}>or</Divider>
         {signUpForm}
       <Divider />
       <Typography variant='body2' sx={{margin: 2}}>Already have an account? <span onClick={() => props.openModal('open', 'Login')} className="pointer">Log in</span></Typography>
       </LoginBox>
   </form>
</Box>
  )
}
function mapStateToProps(state){
    return{
        auth: state.auth
    }
}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal, 
        regAction: regAction
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
