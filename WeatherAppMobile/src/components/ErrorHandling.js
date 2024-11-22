// src/components/ErrorHandling.js
import React from 'react';

const ErrorHandling = ({ error }) => {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default ErrorHandling;
