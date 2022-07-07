import React from 'react'
import './Activity.css'
import {Link} from 'react-router-dom'

const Activity = ({activity}) => {
    
    //console.log(activity, 'from activity')
  return (
    <div className='activity'>
        <Link to={`/activity/${activity.id}`}>
            <img src={activity.image} alt={activity.title}/>
            <div className='activity-type'>{activity.activityType}</div>
            <div className='title'>{activity.title}</div>  
            <div className='cost'>{activity.cost}</div>
            <div className='rating'>Rating: {activity.rating}</div>
            </Link>
    </div>
  )
}

export default Activity