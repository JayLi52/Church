import { API_BASE } from "@utils/constants"
async function request (method: string, url: string, params: any): Promise<Response> {
  url = API_BASE + url
  method = method || 'GET'
  if (method === 'GET') {
    const queryString = new URLSearchParams(params).toString()
    url = `${url}?${queryString}`
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjUxMWMwYjk4LWEzZjQtNDA3Ny1hYTcxLTJlODE1YjE2ZmY4ZiJ9.gCn-LzY2NdS6YtT6qJARuqe38J_7qAKv-v2Gj6xqQGAdMlOodkiLQjHb5e_iH_4Y3rCAP3l64s20wbfSZyFgog'
        },
        body: method === 'GET' ? null : JSON.stringify(params),
      })
      .then((response) => response.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    } catch (e) {
      reject(e)
    }
  })
}

export default request