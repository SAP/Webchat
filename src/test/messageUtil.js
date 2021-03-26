export const createTextModel = (params) => {
  const { text } = params
  const message = {
    type: 'text',
    content: {
    },
  }
  message.content = text
  return message
}

export const createButtonElement = (title, value, type) => {
  return { title, value, type }
}

export const createCardHeaderElement = (title, subtitle, params) => {
  const { image } = params
  const message = {
    title: { value: title || 'Testing', dataType: 'text' },
  }
  if (subtitle) {
    message.subtitle = { value: subtitle, dataType: 'text' }
  }
  if (image) {
    message.image = { imageUrl: image }
  }
  return message
}

const createCardSections = (params) => {
  const { sections } = params
  if (sections) {
    return sections.map(section => ({
      title: section.title,
    }))
  }
  return null

}
export const createCardModel = (params) => {
  const { title, subtitle } = params
  return {
    type: 'object',
    content: {
      header: createCardHeaderElement(title, subtitle, params),
      sections: createCardSections(params),
    },
  }
}

export const createListModel = (params, numberOfItems) => {
  const { addInLineButton } = params
  const message = {
    type: 'list',
    content: {
      list: [],
    },
  }
  for (let i = 0; i < numberOfItems; ++i) {
    const cardParams = {
      status1: `Status - ${i}`,
      image: 'sap-icon://add' }
    const card = createCardHeaderElement(`Card Title - ${i}`, `Card Subtitle - ${i}`, cardParams)
    message.content.list.push({ content: { header: card } })
    if (addInLineButton) {
      message.content.list[i].buttons = [{ title: 'Card button', value: 'hi', type: 'postback' }]
    }
  }
  return message
}

export const createButtonsModel = (type, numberOfItems, addLongTextToLine3) => {
  const message = {
    type,
    content: {
      text: `Buttons for ${type}`,
      buttons: [],
    },
  }
  for (let i = 0; i < numberOfItems; ++i) {
    let posttype
    switch (i % 3) {
    case 2:
      posttype = 'phone'
      break
    case 1:
      posttype = 'link'
      break
    default:
      posttype = 'postback'
      break
    }
    message.content.buttons.push({ title: `Button number ${i}`, value: 'hi', type: posttype })
    if (addLongTextToLine3 && i === 2) {
      message.content.buttons[i].title = `Button number ${i} - This is a test of a button with a long text string to determine the trunication.`
    }
  }
  return message
}

export const createPictureModel = (type) => {
  return {
    type: type || 'picture',
    content: {
      picture: { url: 'https://picture.jpeg' },
    },
  }
}

export const createCarouselModel = (params, numberOfItems) => {
  const { addHeader, addButtons, addPicture, addSections } = params
  const message = {
    content: {
      carousel: [],
    },
    type: 'carousel',
  }
  for (let i = 0; i < numberOfItems; ++i) {
    const content = { picture: { url: addPicture ? 'sap-icon://activate' : '/path/test.png' } }
    if (addHeader) {
      content.header = createCardHeaderElement(`Header text ${i}`, 'List Subtitle', {})
    }
    if (addSections) {
      content.sections = [{
        title: 'Header',
        attributes: [{
          label: 'Label 1',
          title: 'This is the value',
        },
        {
          title: 'This is the value',
        }],
      }]
    }
    if (addButtons) {
      content.buttons = [createButtonElement(`Button ${i}`, 'hi', 'postback')]
    }
    message.content.carousel.push(content)
  }
  return message
}

export const createMessage = (type, text, params, numberOfItems) => {
  let message
  switch (type) {
  case 'object':
    message = createCardModel(params)
    break
  case 'list':
    message = createListModel({ addHeader: false }, numberOfItems ? numberOfItems : 3)
    break
  case 'image':
  case 'picture':
    message = createPictureModel(type)
    break
  case 'carousel':
    message = createCarouselModel({ addHeader: true, addButtons: false }, numberOfItems ? numberOfItems : 3)
    break
  case 'buttons':
  case 'quickreplies':
    message = createButtonsModel(type, numberOfItems ? numberOfItems : 3)
    break
  case 'text':
    message = createTextModel({ text, ...params })
    break
  default:
    message = {
      type,
      content: {
      },
    }
    break
  }
  return message
}

export const createAttachment = (id, type, isBot, params) => {
  const { text, markdown, delay } = params
  const message = createMessage(type, text, params)
  return {
    attachment: {
      ...message,
    },
    participant: {
      isBot,
    },
    id,
    markdown: markdown || false,
    delay: delay || 0,
  }
}
