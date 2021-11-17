import React, {useState} from 'react'
import {useMutation} from '@apollo/client'

// https://github.com/jedwatson/react-select
import Select from 'react-select'

import {ALL_AUTHORS, UPDATE_AUTHOR} from '../queries'

const SetBirthYear = ({ options }) => {
    const [name, setName] = useState('')
    const [setBornTo, setBorn] = useState('')

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
        // 通知缓存更新
        refetchQueries: [
            { query: ALL_AUTHORS }
        ],
        onError: (error) => {
            console.error(error.message)
        }
    })

    const submit = async (event) => {
        event.preventDefault()

        console.log('update author birth...')
        await updateAuthor({variables: {
                name,
                setBornTo: Number(setBornTo)
        }})

        setName('')
        setBorn('')
    }


    return (
        <div>

            <form onSubmit={submit}>
                <div>
                    name
                    <Select defaultValue={name}
                            onChange={({ label }) => setName(label)}
                            options={options}
                    />
                </div>
                <div>
                    born
                    <input
                        value={setBornTo}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default SetBirthYear
