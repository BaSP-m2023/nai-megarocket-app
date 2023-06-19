import React from 'react';

const VerticalBar = ({ month, value }) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '200px',
    width: '50px',
    margin: '0 10px'
  };

  const barStyles = {
    height: `${value * 5}px`,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: '5px',
    marginBottom: '5px'
  };

  return (
    <div style={containerStyles}>
      <div style={barStyles}></div>
      <span>{month}</span>
    </div>
  );
};

export default VerticalBar;
