process.on('unhandledRejection', (reason) => {
  console.warn('Warning: unhandledRejection - reason:', reason)
  process.exit(1)
})

