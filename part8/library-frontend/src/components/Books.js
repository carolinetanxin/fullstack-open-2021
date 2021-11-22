import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({
                   show,
                   getBooks,
                   result
               }) => {
    const { data } = useQuery(ALL_BOOKS)
    const books = result?.data?.allBooks
        ? result?.data?.allBooks
        : data?.allBooks;

    console.log(books)

    useEffect(() => {
        getBooks();
    }, []);

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                <tr>
                    <th>title</th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {books.map(a =>
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Books
