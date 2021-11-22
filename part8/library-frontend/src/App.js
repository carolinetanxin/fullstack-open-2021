import React, {useState, useEffect} from 'react'
import {
    useQuery, useMutation, useSubscription, useApolloClient, useLazyQuery
} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import {BOOK_ADDED, ALL_BOOKS} from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null);

    const client = useApolloClient();

    const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: "network-only",
    });

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map((p) => p.id).includes(object.id);

        const dataInStore = client.readQuery({query: ALL_BOOKS});

        console.log('dataInStore')
        console.log(dataInStore)

        // 防止添加两次
        if (!includedIn(dataInStore.allBooks, addedBook)) {

            console.log('subscribe')
            console.log(dataInStore.allBooks, addedBook)

            client.writeQuery({
                query: ALL_BOOKS,
                data: {allBooks: dataInStore.allBooks.concat(addedBook)},
            });
        }
    };

    // 使用
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            console.log(subscriptionData)
            const addedBook = subscriptionData.data.bookAdded;
            window.alert(`${addedBook.title} added`);
            updateCacheWith(addedBook);
        }
    })

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("library-user-token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
                result={result}
                getBooks={getBooks}
            />

            <NewBook updateCacheWith={updateCacheWith}
                     show={page === 'add'}
            />

        </div>
    )
}

export default App
