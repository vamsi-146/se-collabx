import React, { useEffect } from 'react';
import axios from 'axios';

const TestBackendConnection = () => {
  useEffect(() => {
    axios.get('http://localhost:5000/') // Endpoint from your backend
      .then(response => {
        console.log(response.data); // Log the backend response
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
      });
  }, []);

  return <div>Check the console for the backend response.</div>;
};

export default TestBackendConnection;
