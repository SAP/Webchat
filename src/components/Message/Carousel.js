import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Slider from 'react-slick'

import Card from './Card'
import { PrevArrow, NextArrow } from 'components/arrows'

import './style.scss'

const Carousel = ({ content, isBot, sendMessage }) => {
  console.log(content)

  return (
    <div className={cx('Carousel', { bot: isBot })}>
      <Slider
        arrows
        variableWidth
        speed={200}
        draggable={false}
        slidesToScroll={1}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        className='Slider'
      >
        {content.map((card, i) => (
          <Card
            key={i}
            content={card}
            isBot={isBot}
            sendMessage={sendMessage}
          />
        ))}
      </Slider>
    </div>
  )
}

Carousel.propTypes = {
  isBot: PropTypes.bool,
  content: PropTypes.array,
  sendMessage: PropTypes.func,
}

export default Carousel
