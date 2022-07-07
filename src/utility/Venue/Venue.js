import React from 'react'
import './Venue.css'
import {Link} from 'react-router-dom'

const Venue = ({venue}) => {
    
    return(
        <div className="venue col s12">
            <Link to={`/venue/${venue.id}`}>
                <div className="image">
                    <img src={venue.imageUrl} alt={venue.title}/>
                </div>
                <div className="location-stars">
                    <span className="location">{venue.location}</span>
                </div>
                <div className="rating">Rating: {venue.rating}</div>
                <div className="title">{venue.title}</div>
                <div className="price-per-night">${venue.pricePerNight}/night</div>
                
            </Link>
        </div>
    )
}

export default Venue