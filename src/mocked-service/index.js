import reportsResponse from './reports-response.json'

const responseMap = {
  '/reports': reportsResponse
}

const request = (url) => {
  const response = responseMap[url]
  
  return Promise.resolve(response?.payload || [])
}

export default request