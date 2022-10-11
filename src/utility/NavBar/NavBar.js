import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link} from "react-router-dom"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import openModal from '../../actions/openModal'
import logoutAction from '../../actions/logoutAction'
import { useSelector } from 'react-redux'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { AppBar, Divider } from '@mui/material'
import { styled } from '@mui/system'
import Logo from '../../images/airbnb-logos-495225.png'
import { Box } from '@mui/system'
import { Menu } from '@mui/material'
import { MenuItem } from '@mui/material'
import {MenuOpen} from '@mui/icons-material'

const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 40,
})

const UserBox = styled(Box)(({theme})=> ({
    [theme.breakpoints.up('sm')] : {
        display: 'flex'
    },
    [theme.breakpoints.down('sm')] : {
        display: 'none'
    }
 }))

 const IconBox = styled(Box)(({theme})=> ({
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    gap: "20px",
    [theme.breakpoints.up('sm')] : {
        display: 'none'
    }
 }))
 const MenuButton = styled(Button)({
    '&:focus, &.Mui-focused': {
        backgroundColor: 'transparent'
    },
    color: "#484848",
    textTransform: 'none',
    letterSpacing: 0.25,
    fontSize: 14,
    disableRipple: true,
    fontWeight: 500,
 })

function NavBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const email = useSelector(state => state.auth.email)

    useEffect(() => {
        dispatch(openModal('closed', ''))
        console.log(email, "from useeffect")
    }, [token])
    console.log(props)

    

  return ( 
  <React.Fragment>
    <AppBar position='static' elevation={0} sx={{marginTop: 1}}>
        <StyledToolBar>
            <Link to="/">
                <img src={Logo} alt="Logo" style={{width: 120, marginTop: 4}}/>
            </Link>
                <UserBox>
                    <MenuButton href='/'>Become a host</MenuButton>
                    <MenuButton href='/'>Help</MenuButton>
                { email ? <Box>
                            <MenuButton color='error' component={Link} to="/account">Hey, {email}</MenuButton>
                            <MenuButton  onClick={() => dispatch(logoutAction())}>Log out</MenuButton>
                        </Box>
                            : <Box> 
                                <MenuButton onClick={() => dispatch(openModal('open', 'SignUp'))}>Sign up</MenuButton>
                                <MenuButton onClick={() => dispatch(openModal('open', 'Login'))}>Log in</MenuButton>
                        </Box>}
                </UserBox>
        
              <IconBox 
              id="basic-demo-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{color: '#484848'}}>
                      <MenuOpen sx={{display: {width: '40px', height: '40px'}}}/>
                  </IconBox>
                  <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}>English (US)</MenuItem>
                    <MenuItem onClick={handleClose}>Help</MenuItem>
                    { email ? <Box>
                                <MenuItem onClick={handleClose}><Link to="/account" style={{ textDecoration: 'inherit', color: '#484848', fontWeight: 'normal'}}>Hey, {email}</Link></MenuItem>
                                <MenuItem onClick={() => {dispatch(logoutAction()); handleClose()}}>Log Out</MenuItem>
                                </Box>
                                : <Box> 
                                    <MenuItem onClick={() => {dispatch(openModal('open', 'SignUp')); handleClose()}}>Sign Up</MenuItem>
                                    <MenuItem onClick={() => {dispatch(openModal('open', "Login")); handleClose()}}>Log In</MenuItem>
                            </Box>}
                </Menu>
             </StyledToolBar>
        </AppBar>
        <Divider sx={{marginBottom: 2}}/>
    </React.Fragment>
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
 