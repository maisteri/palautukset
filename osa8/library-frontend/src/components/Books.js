import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const resultAllBooks = useQuery(ALL_BOOKS)

  if (resultAllBooks.loading) {
    return <div>loading...</div>
  }

  const books = resultAllBooks.data.allBooks
  const genres = Array.from(new Set(books.flatMap((book) => book.genres)))

  // const booksByGenre = books.filter((book) =>
  //   selectedGenre === 'all' ? true : book.genres.includes(selectedGenre)
  // )

  return (
    <div>
      <h2>books</h2>
      {!selectedGenre ? null : (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      )}
      <BookList genre={selectedGenre} />
      {genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre('')}>all genres</button>
    </div>
  )
}

export default Books
