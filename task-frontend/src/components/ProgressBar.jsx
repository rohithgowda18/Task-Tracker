import React from 'react'

export default function ProgressBar({ percent }){
  return (
    <div className="progress-wrap">
      <div className="progress" style={{width: `${percent}%`}} />
      <div className="progress-label">{percent}%</div>
    </div>
  )
}
