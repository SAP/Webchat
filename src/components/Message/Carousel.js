import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import Card from './Card'
import { PrevArrow, NextArrow } from 'components/arrows'
import { safeArrayOfItem } from 'helpers'

import './style.scss'

const Carousel = ({ content, sendMessage, readOnlyMode, isLastMessage }) => {
  return (
    <div className={'RecastAppCarousel CaiAppCarousel'}>
      <Slider
        arrows
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        centerMode
        centerPadding='10px'
        speed={200}
        infinite={false}
        draggable={false}
        slidesToScroll={1}
        className='Slider'
      >
        {safeArrayOfItem(content).map((card, i) => (
          <div key={i}>
            <Card isLastMessage={isLastMessage} content={card} sendMessage={sendMessage} readOnlyMode={readOnlyMode} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

Carousel.propTypes = {
  isLastMessage: PropTypes.bool,
  content: PropTypes.array,
  sendMessage: PropTypes.func,
  readOnlyMode: PropTypes.bool,
}

export default Carousel
