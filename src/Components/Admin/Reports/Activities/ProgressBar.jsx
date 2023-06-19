const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    height: '2rem'
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}rem`,
    backgroundColor: '#D9D9D9',
    textAlign: 'right'
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
