import React, { useEffect } from 'react'
import './NavBar.css'
import {useDispatch} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import openModal from '../../actions/openModal'
import logoutAction from '../../actions/logoutAction'
import Login from '../../pages/Login/Login'
import SignUp from '../../pages/Login/SignUp'
import { useSelector } from 'react-redux'

function NavBar(props) {
    
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const email = useSelector(state => state.auth.email)

    useEffect(() => {
        dispatch(openModal('closed', ''))
    }, [token])

    let location = useLocation();
    let navColor = 'transparent'
    if (location.pathname !== '/'){
        navColor = 'black'
    }
  return (
      <div className='container-fluid nav'>
          <div className='row'>
              <nav className={navColor}>
              <div className='nav-wrapper'>
                <Link to='/' className='left'>airbnb</Link>
                <ul id="nav-mobile" className='right'>
                    <li><Link to='/'>English (US)</Link></li>
                    <li><Link to='/'>$ USD</Link></li>
                    <li><Link to='/'>Become a host</Link></li>
                    <li><Link to='/'>Help</Link></li>

                    { email ? <>
                    <li><Link to="/account">Hello, {email}</Link></li>
                    <li onClick={() => dispatch(logoutAction())}>LogOut</li>
                    </>
                    : <> 
                        <li className='login-signup' onClick={() => dispatch(openModal('open', <SignUp/>))}>SignUp</li>
                        <li className='login-signup' onClick={() => dispatch(openModal('open', <Login/>))}>Login</li>
                </>}
                   </ul>
              </div>
              </nav>
          </div>
      </div>
  )
}

function mapStateToProps(state){
    return {
        auth: state.auth,
    }
} 
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModal,
        logoutAction: logoutAction
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);