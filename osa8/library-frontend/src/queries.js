import { gql } from '@apollo/client'

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      author {
        bookCount
        born
        id
        name
      }
      genres
      id
      published
      title
    }
  }
`

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      genres
      id
      published
      author {
        bookCount
        id
        born
        name
      }
    }
  }
`

export const GENRE_BOOKS = gql`
  query genreBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        bookCount
        born
        name
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
      username
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      id
      genres
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`
