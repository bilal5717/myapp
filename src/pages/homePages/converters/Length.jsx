import React, { useState } from 'react';

const LengthConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('m');
    const [outputUnit, setOutputUnit] = useState('cm');
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
  
    const convertLength = () => {
      const inputValueFloat = parseFloat(inputValue);
      if (!isNaN(inputValueFloat)) {
        let convertedLength = inputValueFloat;
  
        // Convert to base unit (meters)
        switch (inputUnit) {
          case 'mm':
            convertedLength /= 1000;
            break;
          case 'cm':
            convertedLength /= 100;
            break;
          case 'm':
            // No conversion needed for meters
            break;
          case 'km':
            convertedLength *= 1000;
            break;
          case 'μm':
            convertedLength /= 1000000;
            break;
          case 'nm':
            convertedLength /= 1000000000;
            break;
          case 'mile':
            convertedLength *= 1609.344;
            break;
          case 'yard':
            convertedLength *= 0.9144;
            break;
          case 'foot':
            convertedLength *= 0.3048;
            break;
          case 'inch':
            convertedLength *= 0.0254;
            break;
          default:
            break;
        }
  
        // Convert from base unit to output unit
        switch (outputUnit) {
          case 'mm':
            convertedLength *= 1000;
            break;
          case 'cm':
            convertedLength *= 100;
            break;
          case 'm':
            // No conversion needed for meters
            break;
          case 'km':
            convertedLength /= 1000;
            break;
          case 'μm':
            convertedLength *= 1000000;
            break;
          case 'nm':
            convertedLength *= 1000000000;
            break;
          case 'mile':
            convertedLength /= 1609.344;
            break;
          case 'yard':
            convertedLength /= 0.9144;
            break;
          case 'foot':
            convertedLength /= 0.3048;
            break;
          case 'inch':
            convertedLength /= 0.0254;
            break;
          default:
            break;
        }
  
        setConvertedValue(convertedLength.toFixed(2));
      } else {
        setConvertedValue('Invalid input');
      }
    };
  
    const resetConverter = () => {
      setInputValue('');
      setConvertedValue('');
    };
  
    return (
      <div className="calculator">
        <h2>Length Converter</h2>
        <div>
          <label htmlFor="from">From:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter length"
          />
          <select id="from" value={inputUnit} onChange={handleInputUnitChange}>
            <option value="mm">Millimeters</option>
            <option value="cm">Centimeters</option>
            <option value="m">Meters</option>
            <option value="km">Kilometers</option>
            <option value="μm">Micrometers</option>
            <option value="nm">Nanometers</option>
            <option value="mile">Miles</option>
            <option value="yard">Yards</option>
            <option value="foot">Feet</option>
            <option value="inch">Inches</option>
          </select>
        </div>
        <div>
          <button onClick={convertLength}>Convert</button>
          <button onClick={resetConverter}>Reset</button>
        </div>
        <div>
          <label htmlFor="to">To:</label>
          <select id="to" value={outputUnit} onChange={handleOutputUnitChange}>
            <option value="mm">Millimeters</option>
            <option value="cm">Centimeters</option>
            <option value="m">Meters</option>
            <option value="km">Kilometers</option>
            <option value="μm">Micrometers</option>
            <option value="nm">Nanometers</option>
            <option value="mile">Miles</option>
            <option value="yard">Yards</option>
            <option value="foot">Feet</option>
            <option value="inch">Inches</option>
          </select>
          <span>{convertedValue}</span>
        </div>
      </div>
    );
  };
  export default LengthConverter