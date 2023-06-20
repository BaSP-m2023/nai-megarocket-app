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
    backgroundColor: '#0F232E',
    textAlign: 'right',
    borderRadius: '5px'
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
