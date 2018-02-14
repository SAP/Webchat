export const getLastMessageId = state => {
  const { messages } = state
  const filteredMessage = messages.filter(message => !message.retry)
  return filteredMessage.length ? filteredMessage[filteredMessage.length - 1].id : null
}
