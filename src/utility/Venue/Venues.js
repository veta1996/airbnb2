import React from 'react'
import './Venue.css'
import Venue from './Venue'


const Venues = ({venues, header}) => {
    
    const venuesData = venues.map((venue, i)=>{
        
        return(
            <div key={i} className="col m6 l3">
                <Venue venue={venue}/>
            </div>
        )
    })
    return(
        <div className="venues">
            <h1 className="main-header-text">{header}</h1>
            {venuesData}
        </div>
    )
}

export default Venues;