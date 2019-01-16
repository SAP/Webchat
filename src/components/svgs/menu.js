import React from 'react'
import cx from 'classnames'

import './style.scss'

const menu = ({ onClick, className }) => {
  return (
    <svg
      viewBox='0 0 512 512'
      id='menu-svg'
      width={18}
      height={18}
      onClick={onClick}
      className={cx('MenuSVG', { className })}
    >
      <path
        id='menu-svg-path'
        fill='cornflowerblue'
        d='M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z'
      />
    </svg>
  )
}
export default menu
