import React, { useState, useEffect } from 'react';

const GeometricMeanCalculator = () => {
  const [numbers, setNumbers] = useState(''); // State to store the input numbers
  const [mean, setMean] = useState(null); // State to store the calculated mean
  const [steps, setSteps] = useState([]); // State to store the steps

  // Load saved data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('geometricMeanCalculatorData'));
    if (savedData) {
      setNumbers(savedData.numbers || '');
      setMean(savedData.mean || null);
      setSteps(savedData.steps || []);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'geometricMeanCalculatorData',
      JSON.stringify({ numbers, mean, steps })
    );
  }, [numbers, mean, steps]);

  // Function to handle input change
  const handleInputChange = (event) => {
    setNumbers(event.target.value);
  };

  // Function to calculate the geometric mean
  const calculateMean = () => {
    // Step 1: Split the input string into an array of numbers
    const numArray = numbers.split(',').map(Number);

    // Step 2: Calculate the product of numbers
    const product = numArray.reduce((acc, curr) => acc * curr, 1);
    setSteps(prevSteps => [...prevSteps, `Step 2: Calculate the product of numbers: ${product}`]);

    // Step 3: Calculate the mean by taking the nth root of the product,
    // where n is the number of elements
    const meanValue = Math.pow(product, 1 / numArray.length);
    setSteps(prevSteps => [...prevSteps, `Step 3: Calculate the nth root of the product: ${meanValue}`]);

    // Step 4: Set the calculated mean value in state, rounded to 2 decimal places
    setMean(meanValue.toFixed(2));
  };

  // Function to reset the input field, mean value, and steps
  const resetCalculator = () => {
    setNumbers('');
    setMean(null);
    setSteps([]);
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='calculator'>
      <button onClick={goBack} className="backBtn">Back</button><br></br>
      {/* Input field to enter numbers separated by commas */}
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChange={handleInputChange}
      />
      <div>
        {/* Button to trigger the calculation */}
        <button onClick={calculateMean}>Calculate Geometric Mean</button>
        {/* Button to reset the calculator */}
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {/* Display the calculated mean if it's not null */}
      {mean !== null && <p>The geometric mean is: {mean}</p>}
      {/* Display the steps */}
      {steps.length > 0 && (
        <div>
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

export default GeometricMeanCalculator;
