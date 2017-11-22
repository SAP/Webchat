export const getLastMessageId = state => {
  const { messages } = state

  return messages.length
    ? messages[messages.length - 1].id
    : null
}
