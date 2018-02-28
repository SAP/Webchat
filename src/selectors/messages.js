export const getLastMessageId = state => {
  const { messages } = state
  const filteredMessage = messages.filter(
    message => !message.retry && !message.isSending && !message.isWelcomeMessage,
  )
  return filteredMessage.length ? filteredMessage[filteredMessage.length - 1].id : null
}
