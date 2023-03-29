import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GENRE_BOOKS } from '../queries'

const BookList = ({ genre }) => {
  const { loading, data, refetch } = useQuery(GENRE_BOOKS, {
    variables: { genre },
  })

  useEffect(() => {
    refetch(genre)
  }, [genre, refetch])

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookList
