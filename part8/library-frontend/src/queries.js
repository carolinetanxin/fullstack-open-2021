import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      bookCount
      born
    }
    published
    genres
    id
  }
`;

// 获取所有书本
export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;


// 获取所有作者
export const ALL_AUTHORS = gql`
 query {
   allAuthors {
    name
    born
    bookCount
  }
 }
`;

// 创建书本
export const CREATE_BOOK = gql`
 mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
 ) {
  addBook (
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    ...BookDetails
  }
 }
 ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

// 更新作者年份
export const UPDATE_AUTHOR = gql`
 mutation updateAuthor(
    $name: String!,
    $setBornTo: Int!
 ) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
      id
      bookCount
    }
 }
`
