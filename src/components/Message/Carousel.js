import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Slider from 'react-slick'

import Card from './Card'
import { PrevArrow, NextArrow } from 'components/arrows'

import './style.scss'

// TODO
// title: 80 chars
// subtitle: 80 chars
// buttons: 0-3 buttons

const Carousel = ({ content, isBot, sendMessage }) => {
  return (
    <div className={cx('Carousel', { bot: isBot })}>
      <Slider
        arrows
        centerMode
        centerPadding={10}
        speed={200}
        infinite={false}
        draggable={false}
        slidesToScroll={1}
        className='Slider'
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {content.map((card, i) => (
          <div key={i}>
            <Card
              content={card}
              isBot={isBot}
              sendMessage={sendMessage}
            />
          </div>
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
