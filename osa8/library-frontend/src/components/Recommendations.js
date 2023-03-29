import { useQuery } from '@apollo/client'
import BookList from './BookList'
import { ME } from '../queries'

const Recommendations = (props) => {
  const { loading, data } = useQuery(ME)

  if (loading) return <div>loading...</div>

  // const { loading, data, refetch } = useQuery(GENRE_BOOKS, {
  //   variables: { genre: resultMe.data.favoriteGenre },
  // })
  // console.log(resultMe)

  const favoriteGenre = data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        <b>books</b> in your favorite genre <b>{favoriteGenre}</b>{' '}
      </p>
      <BookList genre={favoriteGenre} />
    </div>
  )
}

export default Recommendations
