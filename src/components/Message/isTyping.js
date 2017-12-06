import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const IsTyping = ({ image }) => (
  <div className="Message bot">
    {image && <img className="Message--logo" src={image} />}

    <img src="https://cdn.recast.ai/webchat/istyping.gif" />
  </div>
)

IsTyping.propTypes = {
  image: PropTypes.string,
}

export default IsTyping
