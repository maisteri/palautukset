const Notification = ({ message, type }) => {

  if (type === 'error') {
    return (
      <p className='error' >{message}</p>
    )
  } else if (type === 'success') {
    return (
      <p className='personAdded' >{message}</p>
    )
  } else {
    return null
  }
}

export default Notification