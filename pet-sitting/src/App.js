import React from 'react';
import axios from 'axios';

function App() {
  const apiCall = async () => {
    try {
      const { data } = await axios.get('http://88.200.63.148:4000/');
      console.log('Response:', data);
    } catch (err) {
      console.error(' API call failed:', err);
    }
  };

  return (
    <div className="App">
      <button onClick={apiCall}>
        Make API Call
      </button>
    </div>
  );
}

export default App;
