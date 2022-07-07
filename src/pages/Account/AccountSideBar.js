import React from 'react'
import './Account.css'
import {Link} from 'react-router-dom'

function AccountSideBar(props) {
  return (
    <div>
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
    </div>
  )
}

export default AccountSideBar