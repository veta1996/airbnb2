import React from 'react'
import './Login.css'

function SignUpInputFields(props) {
    console.log(props, 'from SignUpInputFields')
  return (
    <div className='sign-up-wrapper'>
        <div className='col m12'>
            <div className='input-field' id='email'>
                <input type="text" placeholder='Email' 
                onChange={(e) => props.setEmail(e.target.value)}/>
            </div>
        </div>
        <div className='col m12'>
            <div className='input-field' id='password'>
                <input type="password" placeholder='Password' 
                onChange={(e) => props.setPassword(e.target.value)}/>
            </div>
        </div>
        <div className='col m12'>
                <button type="submit" className='btn red accent-1'>Sign Up</button>
        </div>
    </div>
  )
}

export default SignUpInputFields