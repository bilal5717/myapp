import React, { useState, useEffect } from 'react';

const SavedData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('edithCalculatorData'));
    setData(savedData);
  }, []);

  return (
    <div className="saved-data">
      {data && (
        <div>
          <h3>User Input: {data.userInput}</h3>
          {data.selectedOption === 'Definteg' && (
            <div>
              <h3>From Input: {data.fromInput}</h3>
              <h3>To Input: {data.toInput}</h3>
            </div>
          )}
          <h3>Result: {data.result}</h3> {/* Display the result */}
        </div>
      )}
    </div>
  );
};

export default SavedData;
