import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import Card from './Card'
import { PrevArrow, NextArrow } from 'components/arrows'

import './style.scss'

const Carousel = ({ content, sendMessage }) => {
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
        {content.map((card, i) => (
          <div key={i}>
            <Card content={card} sendMessage={sendMessage} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

Carousel.propTypes = {
  content: PropTypes.array,
  sendMessage: PropTypes.func,
}

export default Carousel
