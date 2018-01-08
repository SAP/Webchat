import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const IsTyping = ({ image }) => (
  <div className="RecastAppMessage bot">
    {image && <img className="RecastAppMessage--logo visible" src={image} />}

    <img src="https://cdn.recast.ai/webchat/istyping.gif" />
  </div>
)

IsTyping.propTypes = {
  image: PropTypes.string,
}

export default IsTyping
