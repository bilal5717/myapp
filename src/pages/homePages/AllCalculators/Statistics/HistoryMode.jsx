import React, { useState, useEffect } from 'react';

const SavedData = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem('modeData')) || [];
      setHistory(storedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      // Handle the error more gracefully, such as showing a message to the user
      setHistory([]);
    }
  }, []);

  return (
    <div className="saved-data">
       <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <p>Data: {entry.data}</p>
            <p>{entry.mode}</p>
            <h4>Calculation Steps:</h4>
            <ol>
              {entry.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default SavedData;
