import React, { useState } from 'react'
import './Login.css'
import {bindActionCreators} from 'redux';
import {connect, useDispatch} from 'react-redux'
import openModal from '../../actions/openModal';
import SignUp from './SignUp';
import axios from 'axios';
import Swal from 'sweetalert2';
import regAction from '../../actions/regAction';
import { Box, Button,  Divider,  TextField, Typography } from '@mui/material';
import { styled } from '@mui/system'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
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

function Login(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const submitLogin = async(e) => {
        e.preventDefault();
        const url = `${window.apiHost}/users/login`
        const data = {
            email: email,
            password: password
        }
        
        const resp = await axios.post(url, data);
        const token = resp.data.token;

        if(resp.data.msg === 'noEmail'){
            Swal.fire({
                title: "That email is not registered",
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                  }
            })} else if (resp.data.msg === 'badPass'){
                Swal.fire({
                    title: "Invalid email/password",
                    text: "Please enter valid email and password",
                    icon: 'error',
                    customClass: {
                        container: 'my-swal'
                      }
                })
            } else if (resp.data.msg === 'loggedIn'){
                Swal.fire({
                    title: "Success!",
                    icon: 'success',
                    customClass: {
                        container: 'my-swal'
                      }
                })
                dispatch(regAction(resp.data))
            }
    }

  return (
       <Box>
             <form onSubmit={submitLogin}>
             <LoginBox>
                <Typography variant='h5' sx={{margin: 1}}>Log In</Typography>
                <Divider variant="middle" style={{width:'100%'}}/>
                <Typography variant='h6' sx={{margin: 3}}>Welcome to Airbnb Clone</Typography>
                <LoginButton variant='outlined' startIcon={<FacebookRoundedIcon/>} 
                >Connect With Facebook</LoginButton>
                <LoginButton variant='outlined' startIcon={<GoogleIcon/>}
                >Connect With Google</LoginButton>
                    <Divider variant="middle" style={{width:'80%', margin: 3}}>or</Divider>
                <LoginTextField 
                required
                type="text" 
                placeholder="Email address" 
                label="Email"
                InputLabelProps={{
                  style: { color: theme.palette.hof.main },
                  shrink: true
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <SubmitLoginButton type='submit' fullWidth>Login</SubmitLoginButton>
                <Divider />
                <Typography variant='body2' sx={{margin: 2}}>Don't have an account? <span onClick={() => props.openModal('open', <SignUp/>)} className="pointer" >Sign up</span></Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);


/*

   <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
<div className="login-form">
            <form onSubmit={submitLogin}>
                <button className="facebook-login">Connect With Facebook</button>
                <button className="google-login">Connect With Google</button>
                <div className="login-or center">
                    <span>or</span>
                    <div className="or-divider"></div>
                </div>
                <input type="text" className="browser-default" placeholder="Email address" 
                onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="browser-default" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
                <button className="sign-up-button">Login</button>
                <div className="divider"></div>
                <div>Don't have an account? <span onClick={() => props.openModal('open', <SignUp/>)} className="pointer" >Sign up</span></div>
            </form>
        </div>



        <>
       <Box onSubmit={submitLogin} component='form'>
                <Button>Connect With Facebook</Button>
                <Button>Connect With Google</Button>
                    <Typography>or</Typography>
                    <Divider/>
                <TextField type="text" placeholder="Email address" 
                onChange={(e) => setEmail(e.target.value)}/>
                <TextField type="password" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
                <Button>Login</Button>
                <Divider/>
                <Button>Don't have an account? <span onClick={() => props.openModal('open', <SignUp/>)} className="pointer" >Sign up</span></Button>
            </Box>
            </>


             <div className="login-form">
            <Box onSubmit={submitLogin} component='form'>
                <Button color='error'>Connect With Facebook</Button>
                <Button>Connect With Google</Button>
                    <Typography>or</Typography>
                    <Divider/>
                <TextField type="text" placeholder="Email address" 
                onChange={(e) => setEmail(e.target.value)}/>
                <TextField type="password" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
                <Button>Login</Button>
                <Divider/>
                <Button>Don't have an account? <span onClick={() => props.openModal('open', <SignUp/>)} className="pointer" >Sign up</span></Button>
            </Box>
        </div>
*/