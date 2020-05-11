import React from 'react'
// Card
const cardFreeStyle = [
  { type: 'text', content: 'Here is a Card' },
  {
    type: 'card',
    delay: 2,
    content: {
      title: 'Card Title Here',
      subtitle: 'Subtitle',
      imageUrl: 'https://image.shutterstock.com/image-photo/beautiful-autumn-scene-hintersee-lake-600w-747646759.jpg',
      buttons: [
        {
          title: 'Button Text',
          value: 'value',
          type: 'postback',
        },
      ],
    },
  },
]
// Buttons
const buttonsFreeStyle = [
  { type: 'text', content: 'Here is the Buttons' },
  {
    type: 'buttons',
    delay: 0,
    content: {
      title: 'This is the list of buttons',
      buttons: [
        {
          title: 'Button Text',
          value: 'value',
          type: 'postback',
        },
        {
          value: 'NoTitleOnlyValue',
          type: 'postback',
        },
      ],
    },
  },
]
// Quick Reply
const quickReplyFreeStyle = [
  { type: 'text', content: 'Here is the Quick Reply' },
  {
    type: 'quickReplies',
    delay: 0,
    markdown: true,
    content: {
      title: 'This is a **quick reply** markdown title\n- pick one\n- Or Not',
      buttons: [
        {
          title: 'Button Text 1',
          value: 'value',
        },
        {
          title: 'Button Text 2',
          value: 'value',
        },
      ],
    },
  },
]
// Image
const imageFreeStyle = [
  { type: 'text', content: 'Here is the Image' },
  {
    type: 'picture',
    content: 'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-600w-407021107.jpg',
  },
]
// Carousel
const carouselFreeStyle = [
  { type: 'text', content: 'Here is the Carousel' },
  {
    type: 'carousel',
    delay: 0,
    content: [
      {
        title: 'Carousel Title 1',
        subtitle: 'Subtitle',
        imageUrl: 'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-600w-407021107.jpg',
        buttons: [
          {
            title: 'Button Text',
            value: 'value',
            type: 'postback',
          },
        ],
      },
      {
        title: 'Carousel Title 2',
        subtitle: 'Subtitle',
        imageUrl: 'https://image.shutterstock.com/image-photo/coast-background-top-view-turquoise-600w-1383002420.jpg',
        buttons: [
          {
            title: 'Button Text',
            value: 'value',
            type: 'postback',
          },
        ],
      },
    ],

  },
]

// List example
const listFreeStyleUserMessage = {
  type: 'text',
  content: 'Free Style list display.',
}
const listFreeStyleGood = [
  { type: 'text', content: 'Here is the list items' },
  {
    type: 'list',
    delay: 0,
    content: {
      elements: [
        {
          title: 'Title 1',
          subtitle: 'Subtitle 1',
          imageUrl: 'https://image.shutterstock.com/image-photo/beautiful-autumn-scene-hintersee-lake-600w-747646759.jpg',
          buttons: [
            {
              title: 'Button Text',
              value: 'value',
              type: 'postback',
            },
          ],
        },
        {
          title: 'Title ',
          subtitle: 'Subtitle 2',
          imageUrl: 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg',
          buttons: [
            {
              title: 'Button Text',
              value: 'value',
            },
          ],
        },
        {
          title: 'Title 3',
          subtitle: 'Subtitle 3',
          imageUrl: 'https://static01.nyt.com/images/2019/11/05/science/28TB-SUNSET1/merlin_163473282_fe17fc6b-78b6-4cdd-b301-6f63e6ebdd7a-superJumbo.jpg?quality=90&auto=webp',
        },

      ],
    },
  },

]
const listFreeStyleMissingElements = [
  { type: 'text', content: 'Here is the list with missing elements' },
  {
    type: 'list',
    delay: 0,
    content: {
      elements1: [
        {
          title: 'Test',
          subtitle: '<CARD_SUBTITLE>',
          imageUrl: '<LINK_VALUE>',
          buttons: [
            {
              title: 'Button Text',
              value: 'value',
              type: 'postback',
            },
          ],
        },
      ],
    },
  },
]
const badTestHandling = [
  { type: 'text', content: 'Bad data test - Text' },
  { type: 'text', title: 'Bad data test' },
  { type: 'text', content: { title: 'Bad data test' } },
  { type1: 'text', content: { title: 'Bad data test' } },
  { type: 'text', content: 'Bad data test - Card' },
  {
    type: 'card',
    delay: '2',
    content: {
      title: { text: 'Card Title Here' },
      subtitle: false,
      buttons: [
        {
          title: 'Button Text',
          value: 'value',
          type: 'postback',
        },
      ],
    },
  },

]
const listItems = [
  ...cardFreeStyle,
  ...buttonsFreeStyle,
  ...listFreeStyleGood,
  ...listFreeStyleMissingElements,
  ...carouselFreeStyle,
  ...imageFreeStyle,
  ...badTestHandling,
  ...quickReplyFreeStyle,
]
export const showInfo = false
export const readOnlyMode = false

export const secondaryView = false

export const onClickShowInfo = (message) => {
  console.info('Show Info for message: ', message)
}

export const sendMessagePromise = (message) => {
  return new Promise((resolve, reject) => {
    if (!message.attachment) {
      reject('Test Reject')
    } else {
      const results = { data: { messages: [{ type: 'text', content: `Got your question: ${message.attachment.content}` }] } }
      results.data.messages.push({ type: 'text', content: 'Let me think about that...', delay: 5 })
      results.data.messages.push({ type: 'text', content: 'Sorry, Don\'t have an anwser.  Try [Google](https://www.google.com)', markdown: true })
      resolve(results)
    }
  })
}

export const conversationHistoryId = '4e48a1be-8a34-4113-9a47-191c345f4bc8'

export const loadConversationHistoryPromise = (conversationId) => {
  return new Promise((resolve, reject) => {
    if (conversationId !== conversationHistoryId) {
      reject('Unknown conversation ID')
    } else {
      const results = [{ data: { messages: [] }, id: `local-${Math.random()}`, isBot: false }, { data: { messages: [] }, id: `local-${Math.random()}`, isBot: true }]
      results[0].data.messages.push(listFreeStyleUserMessage)
      results[1].data.messages.push()
      listItems.map((item) => {
        results[1].data.messages.push(item)
      })
      resolve(results)
    }
  })
}

export const primaryHeader = (closeFnc) => {
  return (
    <div
      className='RecastAppHeader CaiAppHeader caiHeader'
      style={{ background: 'black', color: 'white' }}>
      <div style={{ paddingLeft: '1.0rem' }} className='RecastAppHeader--title CaiAppHeader--title'>Primary Header</div>
      <div className='RecastAppHeader--btn CaiAppHeader--btn' onClick={closeFnc}>
        <img src='https://cdn.cai.tools.sap/webchat/close.svg' />
      </div>
    </div>
  )
}

export const secondaryHeader = (
  <div
    className='RecastAppHeader CaiAppHeader caiHeader'
    style={{ background: 'black', color: 'white' }}>
    <div style={{ paddingLeft: '1.0rem' }} className='RecastAppHeader--title CaiAppHeader--title'>Secondary Header</div>
  </div>
)

export const secondaryContent = (<div>New Content here</div>)
export const defaultMessageDelay = 1
