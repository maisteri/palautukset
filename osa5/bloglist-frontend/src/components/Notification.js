import { useSelector } from 'react-redux'

const Notification = (props) => {
  const { message, type } = useSelector((state) => state.notification)

  if (type === 'error') {
    return <p className="error">{message}</p>
  } else if (type === 'success') {
    return <p className="personAdded">{message}</p>
  } else {
    return null
  }
}

export default Notification
