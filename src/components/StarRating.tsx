import React from 'react'

const StarRating = ({ rating, scale = 1 }: { rating: number, scale?: number }) => {
  return (
    <span aria-hidden="true"><span className="__star" style={{
      background: `linear-gradient(to right, currentcolor ${rating/5*68}px, #80868b 0%)`,
      transform: `scaleX(${scale})`
    }}></span></span>
  )
}

export default StarRating