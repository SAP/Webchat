import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { truncate } from 'helpers'

import './style.scss'

const Button = ({ button, sendMessage }) => {
  const { value, title } = button
  const formattedTitle = truncate(title, 20)

  if (button.type === 'web_url' && sanitizeUrl(value) === 'about:blank') {
    return null
  }

  let content = null

  switch (button.type) {
    case 'web_url':
      content = (
        <a
          className='RecastAppButton-Link CaiAppButton-Link' href={value} target='_blank'
          rel='noopener noreferrer'>
          {formattedTitle}
        </a>
      )
      break

    case 'checkbox_confirm':
      content = (
        <div
          className='RecastAppButton CaiAppButton'
          onClick={() => {
            try{
              const container = document.getElementsByClassName("CaiCheckboxes--container")
              const len = container.length;
              const items = container[len-1].getElementsByTagName("label")
              const checkboxes = container[len-1].getElementsByTagName("input")
              let selectedItems = []

              if(items && checkboxes){
                for(let i = 0; i < items.length; i++){
                  if(checkboxes[i].checked){
                    selectedItems.push(items[i].firstElementChild.getAttribute("data-value"))
                  }
                }

                if(selectedItems.length !== 0){
                  sendMessage({ type: 'checkboxes', content: selectedItems }, title)
                }
              }

            }catch(ex){
              console.error(ex)
            }
          }}
        >
          {formattedTitle}
        </div>
      )
      break

    default:
      content = (
        <div
          className='RecastAppButton CaiAppButton'
          onClick={() => sendMessage({ type: 'button', content: button }, title)}
        >
          {formattedTitle}
        </div>
      )
      break
  }

  return content
}

Button.propTypes = {
  button: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default Button
