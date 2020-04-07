const config = (() => {
  const script = document.currentScript || document.getElementById('cai-webchat')
  const apiRoot = (script && script.getAttribute('apiRoot')) || 'https://api.cai.tools.sap'

  return {
    apiUrl: `${apiRoot}${apiRoot.slice(-1) === '/' ? '' : '/'}connect/v1`,
  }
})()

export default config
