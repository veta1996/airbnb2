import React from 'react'

const Point = ({point, pointDesc}) => {
    //console.log(point, pointDesc, '--- from Point')
    const dataPoint = pointDesc.find((item) => item.pointTitle === point)
    //console.log(dataPoint.text, '--- from dataPoint')
  return (
      <div>
    <div className='point-title'>{point}</div>
    <div className='point-desc'>{dataPoint.text}</div>
    </div>
  )
}

export default Point