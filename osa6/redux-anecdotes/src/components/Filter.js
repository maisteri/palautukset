import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer' 

const Filter = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter)
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    notification ?
      <div></div>
      :
      <div style={style}>
        filter
        <input value={filter} onChange={handleChange} />
      </div>
  )
}

export default Filter