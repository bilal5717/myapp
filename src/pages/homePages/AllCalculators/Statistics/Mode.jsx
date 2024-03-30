import React, { useState, useEffect } from 'react';

const ModeCalculator = () => {
  const [data, setData] = useState('');
  const [mode, setMode] = useState(null);
  const [steps, setSteps] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('modeData')) || [];
    setHistory(storedData);
  }, []);

  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  const calculateMode = () => {
    // Clear previous result and steps
    setMode(null);
    setSteps([]);

    const numbers = data.split(',').map(Number);
    const frequencyMap = new Map();
    numbers.forEach(num => {
      if (frequencyMap.has(num)) {
        frequencyMap.set(num, frequencyMap.get(num) + 1);
      } else {
        frequencyMap.set(num, 1);
      }
    });

    let maxFrequency = 0;
    let modeValue = [];
    frequencyMap.forEach((freq, num) => {
      if (freq > maxFrequency) {
        maxFrequency = freq;
        modeValue = [num];
      } else if (freq === maxFrequency) {
        modeValue.push(num);
      }
    });

    setMode(modeValue.length === numbers.length ? 'No mode' : modeValue.join(', '));

    const newEntry = {
      data: data,
      mode: modeValue.length === numbers.length ? 'No mode' : modeValue.join(', '),
      steps: [
        'Step 1: Split the input string into an array of numbers',
        'Step 2: Count the frequency of each number',
        'Step 3: Find the number(s) with the highest frequency'
      ]
    };

    const newHistory = [newEntry, ...history.slice(0, 29)]; // Store only the last 30 entries
    setHistory(newHistory);
    localStorage.setItem('modeData', JSON.stringify(newHistory));
  };

  const resetCalculator = () => {
    setData('');
    setMode(null);
    setSteps([]);
    localStorage.removeItem('modeData');
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
        <button onClick={calculateMode}>Calculate Mode</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {mode !== null && <p className="result">The mode is: {mode}</p>}
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

export default ModeCalculator;
