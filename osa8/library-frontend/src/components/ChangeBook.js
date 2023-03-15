import { useState } from 'react'
import { EDIT_AUTHOR, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'

const ChangeBook = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, setBornTo: born },
    })
    setName('')
    setBorn('')
  }
  console.log(name)
  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={handleChange}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default ChangeBook
