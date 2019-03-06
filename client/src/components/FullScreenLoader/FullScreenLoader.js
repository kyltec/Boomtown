import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const FullScreenLoader = () => {
  return (
    <div>
      <CircularProgress color="primary" size={60} thickness={3} />
    </div>
  );
};

export default FullScreenLoader;
