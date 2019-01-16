import React from 'react'

const arrowLeft = ({ className }) => {
  return (
    <svg
      width={16} height={16} viewBox='0 0 512 512'
      className={className}>
      <path d='M320 128L192 256l128 128z' fill='grey' />
    </svg>
  )
}

export default arrowLeft
