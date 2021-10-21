import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {Authorization: token}
  }
  const res = await axios.get(baseUrl, config)
  return res.data
}

const create = async newObject => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

export default { getAll, setToken, create, update }
