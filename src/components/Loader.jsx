import React from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

export default function Loader() {
  const getColor = () =>
    localStorage.getItem('darkTheme') === 'true' ? '#00ff00' : '#ff0000';

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <RiseLoader
          color={getColor()}
          cssOverride={{}}
          loading
          margin={10}
          size={15}
          speedMultiplier={1}
        />
      </div>
    </>
  );
}
