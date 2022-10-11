import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import { Password} from '@mui/icons-material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListIcon from '@mui/icons-material/List';
import styled from '@emotion/styled';

const SideBarBox = styled(Box)((({theme}) => ({
    [theme.breakpoints.down('sm')] : {
        display: 'none'
    },
    [theme.breakpoints.up('sm')] : {
        width: 300,
    },
    display: 'flex',
    direction: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
})))

const AccountSideButtonGroup = styled(Toolbar)((({theme}) => ({
    [theme.breakpoints.down('sm')] : {
        display: 'flex'
    },
    [theme.breakpoints.up('sm')] : {
        display: 'none'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
})))

const ButtonGroupMobile = styled(Button)(({theme})=> ({
    textTransform: 'none',
    color: theme.palette.hof.main,
    borderColor: theme.palette.hof.main,
    border: '1px solid',
    lineHeight: 1.5,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    height: 'auto',
    '&:hover, &:active, &:focus': {
        color: theme.palette.hof.main,
        backgroundColor: 'transparent',
        borderColor: theme.palette.hof.main,
        boxShadow: 'none',
      }
}))

function AccountSideBar(props) {
  return (<>
        <SideBarBox>
        <List>
                <ListItem disablePadding component={Link} to="reservations/confirmed"  style={{color: '#484848'}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <PlaylistAddCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Confirmed Reservations" />
                    </ListItemButton>
                </ListItem>
         
         <Divider/>
    
            <ListItem disablePadding component={Link} to="reservations/past" style={{color: '#484848'}}>
                <ListItemButton>
                <ListItemIcon>
                    <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Past Reservations" />
                </ListItemButton>
            </ListItem>
        <Divider/>
         
          <ListItem disablePadding component={Link} to="change-pass" style={{color: '#484848'}}>
            <ListItemButton>
              <ListItemIcon>
                <Password />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>
         
        </List>
        </SideBarBox>

        <AccountSideButtonGroup variant="contained">
            <ButtonGroupMobile component={Link} to="reservations/confirmed">Confirmed Reservations</ButtonGroupMobile>
            <ButtonGroupMobile component={Link} to="reservations/past">Past Reservations</ButtonGroupMobile>
            <ButtonGroupMobile component={Link} to="change-pass">Change Password</ButtonGroupMobile>
        </AccountSideButtonGroup>
        </>
  )
}

export default AccountSideBar

{/*
<Divider orientation="vertical" flexItem />
 <ul className="sidenav sidenav-fixed">
            <li>
                <div className="user-view valign-wrapper center-align">
                    <img className="" src="https://airbnb-clone-prexel-images.s3.amazonaws.com/genericAvatar.png" alt="profile" />
                </div>
            </li>
            <li>
                <Link to="reservations/confirmed">Confirmed Reservations</Link>
            </li>
            <li>
                <Link to="reservations/past">Past Reservations</Link>
            </li>
            <li>
                <Link to="change-pass">Change Password</Link>
            </li>
            </ul>
        
        */}