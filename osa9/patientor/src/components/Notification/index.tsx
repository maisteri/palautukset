const Notification = ({ message }: { message: string }): JSX.Element => {
  const notificationStyle = {
    color: 'red',
    paddingBottom: '20px',
  };

  if (!message) return <div></div>;
  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
