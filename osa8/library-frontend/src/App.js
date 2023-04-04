import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, GENRE_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('books-user-token'))
  }, [setToken])

  // const cacheData = client.cache.extract()
  // console.log(cacheData)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      const authorAdded = data.data.bookAdded.author
      window.alert(`a new book ${bookAdded.title} added`)

      const variables = { genre: '' }

      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const authorAlreadyInList = allAuthors
          .map((a) => a.name)
          .some((name) => name === authorAdded.name)
        if (authorAlreadyInList) return { allAuthors }
        return {
          allAuthors: allAuthors.concat(authorAdded),
        }
      })

      client.cache.updateQuery(
        { query: GENRE_BOOKS, variables },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(bookAdded),
          }
        }
      )
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/books')
  }

  const padding = {
    padding: 5,
  }

  return (
    <>
      <div>
        <Link style={padding} to='/authors'>
          authors
        </Link>
        <Link style={padding} to='/books'>
          books
        </Link>
        {token ? (
          <>
            <Link style={padding} to='/add'>
              add book
            </Link>
            <Link style={padding} to='/recommend'>
              recommend
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link style={padding} to='/login'>
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path='/authors' element={<Authors token={token} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/' element={<Navigate replace to='/authors' />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/recommend' element={<Recommendations />} />
      </Routes>
    </>
  )
}

export default App
