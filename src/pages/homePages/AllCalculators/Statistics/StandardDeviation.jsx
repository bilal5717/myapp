import React, { useState, useEffect } from 'react';

const StandardDeviationCalculator = () => {
  const [data, setData] = useState('');
  const [standardDeviation, setStandardDeviation] = useState(null);
  const [steps, setSteps] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('standardDeviationData')) || [];
    setHistory(storedData);
  }, []);

  const handleInputChange = (event) => {
    setData(event.target.value);
    setErrorMessage(''); // Clear error message when input changes
  };

  const validateInput = () => {
    if (!data.trim()) {
      setErrorMessage('Input cannot be empty. Please enter numeric values separated by commas.');
      return false;
    }
    const numbers = data.split(',').map(Number);
    const invalidNumbers = numbers.filter(num => isNaN(num)); // Filter out non-numeric values
    if (invalidNumbers.length > 0) {
      setErrorMessage('Invalid input. Please enter numeric values separated by commas.');
      return false;
    }
    return true;
  };

  const calculateStandardDeviation = () => {
    if (!validateInput()) {
      return; // Exit early if input is invalid
    }

    // Clear previous result and steps
    setStandardDeviation(null);
    setSteps([]);

    const numbers = data.split(',').map(Number);
    let calculatedSteps = [];

    const n = numbers.length;
    const mean = numbers.reduce((acc, curr) => acc + curr, 0) / n;
    calculatedSteps.push(`Step 1: Split the input string into an array of numbers (${numbers.join(', ')})`);

    const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
    calculatedSteps.push(`Step 2: Calculate the mean of the data set (${mean.toFixed(2)})`);

    const sumOfSquaredDifferences = squaredDifferences.reduce((acc, curr) => acc + curr, 0);
    calculatedSteps.push(`Step 3: Calculate the squared differences from the mean (${squaredDifferences.join(', ')})`);

    const variance = sumOfSquaredDifferences / n;
    calculatedSteps.push(`Step 4: Calculate the sum of squared differences (${sumOfSquaredDifferences.toFixed(2)})`);

    const stdDeviation = Math.sqrt(variance);
    calculatedSteps.push(`Step 5: Calculate the variance (${variance.toFixed(2)})`);

    setStandardDeviation(stdDeviation.toFixed(2));
    calculatedSteps.push(`Step 6: Calculate the standard deviation (${stdDeviation.toFixed(2)})`);

    setSteps(calculatedSteps);

    const newEntry = {
      data: data,
      standardDeviation: stdDeviation.toFixed(2),
      steps: calculatedSteps
    };

    const newHistory = [newEntry, ...history.slice(0, 29)]; // Store only the last 30 entries
    setHistory(newHistory);
    localStorage.setItem('standardDeviationData', JSON.stringify(newHistory));
  };

  const resetCalculator = () => {
    setData('');
    setStandardDeviation(null);
    setSteps([]);
    setErrorMessage('');
    localStorage.removeItem('standardDeviationData');
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
        <button onClick={calculateStandardDeviation}>Calculate Standard Deviation</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {standardDeviation !== null && <p className="result">The standard deviation is: {standardDeviation}</p>}
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

export default StandardDeviationCalculator;
