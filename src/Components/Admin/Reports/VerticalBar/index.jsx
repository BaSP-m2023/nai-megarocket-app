import React from 'react';

const VerticalBar = ({ name, value }) => {
  const getColor = (name) => {
    switch (name) {
      case 'Gold':
        return '#F0BE48';
      case 'Silver':
        return '#d7d9d8';
      case 'Black':
        return '#0f232e';
      default:
        return '#0f232e';
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '200px',
    width: '50px',
    margin: '0 10px',
    justifyContent: 'flex-end'
  };

  const barStyles = {
    height: `${value * 5}px`,
    width: '3rem',
    backgroundColor: getColor(name),
    borderRadius: '5px',
    marginBottom: '5px'
  };

  return (
    <div style={containerStyles}>
      <div style={barStyles}></div>
      <h3>{name}</h3>
    </div>
  );
};

export default VerticalBar;
