import React from 'react'

export const showInfo = true
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
      const results = [{ data: { messages: [] }, id: `local-${Math.random()}`, isBot: false }, { data: { messages: [] }, id: `local-${Math.random()}`, isBot: true }]
      results[0].data.messages.push({ type: 'text', content: 'Where are you type 2?' })
      results[1].data.messages.push({ type: 'text', content: 'Over here now!' })
      resolve(results)
    } else {
      const results = [{ data: { messages: [] }, id: `local-${Math.random()}`, isBot: false }, { data: { messages: [] }, id: `local-${Math.random()}`, isBot: true }]
      results[0].data.messages.push({ type: 'text', content: 'Where are you?' })
      results[1].data.messages.push({ type: 'text', content: 'Over here!' })
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

export const secondaryHeader = (closeFnc) => {
  return (
    <div
      className='RecastAppHeader CaiAppHeader caiHeader'
      style={{ background: 'black', color: 'white' }}>
      <div style={{ paddingLeft: '1.0rem' }} className='RecastAppHeader--title CaiAppHeader--title'>Secondary Header</div>
    </div>
  )
}

export const secondaryContent = (<div>New Content here</div>)
export const defaultMessageDelay = 1
