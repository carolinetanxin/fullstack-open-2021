import {useEffect, useState} from "react";
import axios from "axios";

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(name)
                if (name) {
                    const countryRes = await axios.get(url)
                    const data = countryRes.data[0]
                    const found = true
                    console.log({data, found})
                    setCountry({data, found})
                }
            } catch (e) {
                const data = null
                const found = false
                setCountry({data, found})
            }
        }

        fetchData()
        //  useEffect的第二个参数[]，检测到指定参数发生变化，才会执行函数
    }, [name, url])

    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}
