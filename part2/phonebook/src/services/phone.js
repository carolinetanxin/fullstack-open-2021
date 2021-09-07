import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject);
    return req.then(res => res.data);
}

const update = (newObject) => {
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject);
    return req.then(res => res.data);
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

export default {getAll, create, update, remove}
