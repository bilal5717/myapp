import React, { useState, useEffect } from 'react';

const MedianCalculator = () => {
  const [data, setData] = useState('');
  const [median, setMedian] = useState(null);
  const [steps, setSteps] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem('medianData')) || [];
      setHistory(storedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      // Handle the error, such as setting an empty array as the history
      setHistory([]);
    }
  }, []);
  

  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  const calculateMedian = () => {
    setMedian(null);
    setSteps([]);

    const numbers = data.split(',').map(Number);
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const len = sortedNumbers.length;
    const middle = Math.floor(len / 2);
    let medianValue;

    if (len % 2 === 0) {
      medianValue = (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
    } else {
      medianValue = sortedNumbers[middle];
    }

    const medianText = `The median is: ${medianValue.toFixed(2)}`;
    setMedian(medianText);

    const newSteps = [`Step 1: Input data: ${data}`, `Step 2: Sort the numbers: ${sortedNumbers.join(', ')}`, `Step 3: Calculate the median: ${medianValue.toFixed(2)}`];
    setSteps(newSteps);

    const newEntry = {
      data: data,
      median: medianText,
      steps: newSteps,
    };

    const newHistory = [newEntry, ...history.slice(0, 29)]; // Store only the last 30 entries
    setHistory(newHistory);
    localStorage.setItem('medianData', JSON.stringify(newHistory));
  };

  const resetCalculator = () => {
    setData('');
    setMedian(null);
    setSteps([]);
    localStorage.removeItem('medianData');
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='calculator'>
      <button onClick={goBack} className="backBtn">Back</button><br></br>
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={data}
        onChange={handleInputChange}
      />
      <div>
        <button onClick={calculateMedian}>Calculate Median</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {median && <p className="result">{median}</p>}
      {steps.length > 0 && (
        <div className="">
          <h3>Calculation Steps:</h3>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
    </div>
  );
};

export default MedianCalculator;
