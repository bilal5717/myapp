import React, { useState, useEffect } from 'react';

const SavedData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('arithmeticMeanCalculatorData'));
    setData(savedData);
  }, []);

  return (
    <div className="saved-data">
      {data && (
        <div>
          <h3>Numbers: {data.numbers}</h3>
          <h3>Mean: {data.mean}</h3>
          <h3>Calculation Steps:</h3>
          <ol>
            {data.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SavedData;
