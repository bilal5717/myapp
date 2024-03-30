import React, { useState, useEffect } from 'react';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

const EdithCalculator = () => {
  const [userInput, setUserInput] = useState('');
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [result, setResult] = useState('');
  const [selectedOption, setSelectedOption] = useState('SelectO');
  const [error, setError] = useState('');

  // Load saved data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('edithCalculatorData'));
    if (savedData) {
      setUserInput(savedData.userInput || '');
      setFromInput(savedData.fromInput || '');
      setToInput(savedData.toInput || '');
      setSelectedOption(savedData.selectedOption || 'SelectO');
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'edithCalculatorData',
      JSON.stringify({ userInput, fromInput, toInput, selectedOption })
    );
  }, [userInput, fromInput, toInput, selectedOption]);

  const calculateResult = () => {
    try {
      let calculatedResult;
  
      switch (selectedOption) {
        case 'SelectO':
          throw new Error('Select an option from the drop-down list.');
        case 'Integration':
          if (!userInput.trim()) throw new Error('Enter a valid expression.');
          calculatedResult = nerdamer('integrate(' + userInput + ', x)').toString();
          break;
        case 'Definteg':
          if (!userInput.trim()) throw new Error('Enter a valid expression.');
          if (!fromInput.trim() || !toInput.trim()) throw new Error('Enter valid bounds.');
          calculatedResult = nerdamer('defint(' + userInput + ',' + fromInput + ',' + toInput + ')').toString();
          break;
        default:
          break;
      }
  
      setResult(calculatedResult);
      setError('');
      localStorage.setItem(
        'edithCalculatorData',
        JSON.stringify({ userInput, fromInput, toInput, selectedOption, result: calculatedResult })
      );
    } catch (error) {
      setError(`Error: ${error.message}`);
      setResult('');
    }
  };
  

  const clearText = () => {
    setUserInput('');
    setFromInput('');
    setToInput('');
    setResult('');
    setSelectedOption('SelectO');
    setError('');
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='form_page'>
       <button onClick={goBack} className="backBtn">Back</button><br></br>
      <h1>Integral Calculator</h1>
      <select id="stark" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
        <option value="SelectO">Select an option:</option>
        <option value="Integration">Integrate (indefinite)</option>
        <option value="Definteg">Integrate (definite)</option>
      </select>
      <div className="calculator">
        <input
          type="text"
          id="userInput"
          placeholder="Enter your expression"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div id="showText" style={{ display: selectedOption === 'Definteg' ? 'block' : 'none' }}>
          <input
            type="text"
            placeholder="First Bound"
            id="fromInput"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Second Bound"
            id="toInput"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
          />
          <br />
        </div>
        <div className='calculator'>
          <input type="text" id="Result" placeholder="Result" value={result} readOnly />
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
     
     <div>
     <button id="calc" onClick={calculateResult}>
        Calculate
      </button>
      <button onClick={clearText}>Reset</button>
     </div>
    </div>
  );
};

export default EdithCalculator;
