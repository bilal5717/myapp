import React, { useState, useEffect } from 'react';

const ArithmeticMeanCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [mean, setMean] = useState(null);
  const [steps, setSteps] = useState([]);

  // Load saved data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('arithmeticMeanCalculatorData'));
    if (savedData) {
      setNumbers(savedData.numbers || '');
      setMean(savedData.mean || null);
      setSteps(savedData.steps || []);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'arithmeticMeanCalculatorData',
      JSON.stringify({ numbers, mean, steps })
    );
  }, [numbers, mean, steps]);

  const handleInputChange = (event) => {
    setNumbers(event.target.value);
  };

  const calculateMean = () => {
    const numArray = numbers.split(',').map(Number);
    const sum = numArray.reduce((acc, curr) => acc + curr, 0);
    setSteps(prevSteps => [...prevSteps, `Calculate the sum of numbers: ${sum}`]);
    const meanValue = sum / numArray.length;
    setSteps(prevSteps => [...prevSteps, `Calculate the mean: ${meanValue}`]);
    setMean(meanValue.toFixed(2));
  };

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
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChange={handleInputChange}
      />
      <div>
        <button onClick={calculateMean}>Calculate Mean</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {mean !== null && <p>The arithmetic mean is: {mean}</p>}
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

export default ArithmeticMeanCalculator;
