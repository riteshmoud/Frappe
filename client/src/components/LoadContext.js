import axios from "axios"

export const getBooks = async () => {
    const res = await axios.get('http://127.0.0.1:8000/getBooks')
    return res.data.data
}

export const getMembers = async () => {
    const res = await axios.get('http://127.0.0.1:8000/getMembers')
    return res.data.data
}

export const getTxn = async () => {
    const res = await axios.get('http://127.0.0.1:8000/getTxn')
    return res.data.data
}