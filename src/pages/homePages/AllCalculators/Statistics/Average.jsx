import React, { useState, useEffect } from 'react';

const AverageCalculator = () => {
  const [input, setInput] = useState('');
  const [average, setAverage] = useState(null);
  const [steps, setSteps] = useState([]);

  // Load saved data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('averageCalculatorData'));
    if (savedData) {
      setInput(savedData.input || '');
      setAverage(savedData.average || null);
      setSteps(savedData.steps || []);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'averageCalculatorData',
      JSON.stringify({ input, average, steps })
    );
  }, [input, average, steps]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateAverage = () => {
    const numbers = input.split(',').map(Number);

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    setSteps(prevSteps => [...prevSteps, `Step 2: Calculate the sum of numbers: ${sum}`]);

    const avg = sum / numbers.length;
    setAverage(avg.toFixed(2));
    setSteps(prevSteps => [...prevSteps, `Step 3: Calculate the average by dividing the sum by the number of elements: ${avg}`]);
  };

  const resetCalculator = () => {
    setInput('');
    setAverage(null);
    setSteps([]);
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
        value={input}
        onChange={handleInputChange}
      />
      <div>
        <button onClick={calculateAverage}>Calculate Average</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {average !== null && <p>The average is: {average}</p>}
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

export default AverageCalculator;
