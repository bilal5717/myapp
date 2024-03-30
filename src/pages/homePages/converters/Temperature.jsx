import React, { useState } from 'react';
const TemperatureConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('celsius');
    const [outputUnit, setOutputUnit] = useState('fahrenheit');
    const [convertedValue, setConvertedValue] = useState('');
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleInputUnitChange = (event) => {
      setInputUnit(event.target.value);
    };
  
    const handleOutputUnitChange = (event) => {
      setOutputUnit(event.target.value);
    };
  
    const convertTemperature = () => {
      // Convert input value to a number
      const value = parseFloat(inputValue);
  
      // Check if the input value is a valid number
      if (isNaN(value)) {
        setConvertedValue('Invalid input');
        return;
      }
  
      // Convert temperature based on selected units
      let result;
      if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
        result = (value * 9 / 5) + 32;
      } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
        result = (value - 32) * 5 / 9;
      } else {
        // Conversion not supported
        setConvertedValue('Conversion not supported');
        return;
      }
  
      // Set the converted value
      setConvertedValue(result.toFixed(2) + ' ' + outputUnit.toUpperCase());
    };
  
    const resetConverter = () => {
      setInputValue('');
      setConvertedValue('');
    };
  
    return (
      <div className="calculator">
        <h2>Temperature Converter</h2>
        <div>
          <label htmlFor="from">From:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter value"
          />
          <select id="from" value={inputUnit} onChange={handleInputUnitChange}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <div>
          <button onClick={convertTemperature}>Convert</button>
          <button onClick={resetConverter}>Reset</button>
        </div>
        <div>
          <label htmlFor="to">To:</label>
          <select id="to" value={outputUnit} onChange={handleOutputUnitChange}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
          <span>{convertedValue}</span>
        </div>
      </div>
    );
  };
  export default TemperatureConverter