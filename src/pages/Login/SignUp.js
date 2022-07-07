import React, { useEffect, useState } from 'react'
import './Login.css'
import openModal from '../../actions/openModal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Login from './Login'
import SignUpInputFields from './SignUpInputFields'
import axios from 'axios'
import Swal from 'sweetalert2'
import regAction from '../../actions/regAction'


function SignUp(props) {
    console.log(props, 'PROPS')
    const [signUpForm, setSignUpForm] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    useEffect(() => {
        setSignUpForm(
            <button type='button'
            onClick={showSignUpInputs}
            className='sign-up-button'>Sign Up with Email</button>
        )
    }, [])

    const showSignUpInputs = () => {
        setSignUpForm(<SignUpInputFields email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}/>)
    }

    const submitLogin = async(e) => {
        e.preventDefault();
        const url = `${window.apiHost}/users/signup`
        const data = {
            email: email,
            password: password
        }
        //console.log(data, 'data')
        const resp = await axios.post(url, data)
        //console.log(resp.data, 'resp DATA')
        //const token = resp.data.token;
        //console.log(token, 'token')

        if(resp.data.msg === 'userExists'){
           Swal.fire({
                title: "Email Exists",
                text: "The email you provided is already registered. Please try another.",
                icon: 'error'
            })
        } else if(resp.data.msg === 'invalidData'){
            Swal.fire({
                title: "Invalid Email/Password",
                text: "Please provide valid email and password",
                icon: 'error'
            })
        } else if (resp.data.msg === 'userAdded'){
            Swal.fire({
                title: "Success!",
                icon: 'success',
                allowOutsideClick: true,
                backdrop: true,
            })
            props.regAction(resp.data)
        }
        console.log(props.auth, "props.auth")
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
          {signUpForm}
        <div className="divider"></div>
        <div>Already have an account? <span onClick={() => props.openModal('open', <Login/>)} className="pointer">Log in</span></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
