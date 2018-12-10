import React from 'react'

const arrowRight = ({ className }) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox='0 0 512 512'
      className={className}
      style={{ marginRight: 3 }}
    >
      <path d='M192 128l128 128-128 128z' fill='cornflowerblue' />
    </svg>
  )
}

export default arrowRight
