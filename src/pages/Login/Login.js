import React, { useState } from 'react'
import './Login.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import openModal from '../../actions/openModal';
import SignUp from './SignUp';
import axios from 'axios';
import Swal from 'sweetalert2';
import regAction from '../../actions/regAction';

function Login(props) {
    console.log(props, 'FROM LOGIM')
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
        //const token = resp.data.token
        
        console.log(resp.data)
        if(resp.data.msg === 'noEmail'){
            Swal.fire({
                title: "That email is not registered",
                icon: 'error'
            })} else if (resp.data.msg === 'badPass'){
                Swal.fire({
                    title: "Invalid email/password",
                    text: "Please enter valid email and password",
                    icon: 'error'
                })
            } else if (resp.data.msg === 'loggedIn'){
                Swal.fire({
                    title: "Success!",
                    icon: 'success'
                })
                props.regAction(resp.data)
            }
        
    }

  return (
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
