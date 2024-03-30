import React, { useState } from 'react';

const QuadraticMeanCalculator = () => {
  const [numbers, setNumbers] = useState(''); // State to store the input numbers
  const [mean, setMean] = useState(null); // State to store the calculated mean
  const [steps, setSteps] = useState([]); // State to store the calculation steps

  // Function to handle input change
  const handleInputChange = (event) => {
    setNumbers(event.target.value);
  };

  // Function to calculate the quadratic mean
  const calculateMean = () => {
    // Step 1: Split the input string into an array of numbers
    const numArray = numbers.split(',').map(Number);

    // Step 2: Calculate the sum of squares of numbers
    const sumOfSquares = numArray.reduce((acc, curr) => acc + curr ** 2, 0);
    setSteps(prevSteps => [...prevSteps, `Step 2: Calculate the sum of squares of numbers: ${sumOfSquares}`]);

    // Step 3: Calculate the mean square by dividing the sum of squares by the number of elements
    const meanSquare = sumOfSquares / numArray.length;
    setSteps(prevSteps => [...prevSteps, `Step 3: Calculate the mean square by dividing the sum of squares by the number of elements: ${meanSquare}`]);

    // Step 4: Calculate the quadratic mean by taking the square root of the mean square
    const quadraticMean = Math.sqrt(meanSquare);
    setSteps(prevSteps => [...prevSteps, `Step 4: Calculate the quadratic mean by taking the square root of the mean square: ${quadraticMean}`]);

    // Step 5: Set the calculated quadratic mean value in state, rounded to 2 decimal places
    setMean(quadraticMean.toFixed(2));
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
    <div className='calculator form'>
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
        <button onClick={calculateMean}>Calculate Mean</button>
        {/* Button to reset the calculator */}
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {/* Display the calculated mean if it's not null */}
      {mean !== null && <p>The quadratic mean is: {mean}</p>}
      {/* Display the calculation steps */}
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

export default QuadraticMeanCalculator;
