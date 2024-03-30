import React, { useState, useEffect } from 'react';

const SavedData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('averageCalculatorData'));
    setData(savedData);
  }, []);

  return (
    <div className="saved-data">
      {data && (
        <div>
          <h3>Input Numbers: {data.input}</h3>
          <h3>Average: {data.average}</h3>
        </div>
      )}
    </div>
  );
};

export default SavedData;
