  
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

import SetBirthYear from './SetBirthYear'

const Authors = (props) => {
  const { data } = useQuery(ALL_AUTHORS)

  const options = data?.allAuthors?.map((option) => {
    return {
      value: option.name,
      label: option.name
    };
  });

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data?.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <SetBirthYear options={options}/>

    </div>
  )
}

export default Authors
