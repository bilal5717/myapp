import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

const WeightConverter = () => {
  const [inputWeight, setInputWeight] = useState('');
  const [fromUnit, setFromUnit] = useState('kilograms');
  const [toUnit, setToUnit] = useState('pounds');
  const [result, setResult] = useState('');
  const navigate = useNavigate(); // Initialize useHistory

  const convertWeight = () => {
    const weightMap = {
      kilograms: {
        pounds: input => input * 2.20462,
        ounces: input => input * 35.274,
        grams: input => input * 1000,
        milligrams: input => input * 1000000
      },
      pounds: {
        kilograms: input => input * 0.453592,
        ounces: input => input * 16,
        grams: input => input * 453.592,
        milligrams: input => input * 453592
      },
      ounces: {
        kilograms: input => input * 0.0283495,
        pounds: input => input * 0.0625,
        grams: input => input * 28.3495,
        milligrams: input => input * 28349.5
      },
      grams: {
        kilograms: input => input * 0.001,
        pounds: input => input * 0.00220462,
        ounces: input => input * 0.035274,
        milligrams: input => input * 1000
      },
      milligrams: {
        kilograms: input => input * 0.000001,
        pounds: input => input * 0.00000220462,
        ounces: input => input * 0.000035274,
        grams: input => input * 0.001
      }
    };

    const convertedWeight = weightMap[fromUnit][toUnit](parseFloat(inputWeight));
    setResult(convertedWeight.toFixed(2));
  };

  const resetFields = () => {
    setInputWeight('');
    setResult('');
  };

  const goBack = () => {
    navigate(-1); // Navigate back using useNavigate
  };
  return (
    <div>
      <h2>Weight Converter</h2>
      <div>
        <label>
          Input Weight:
          <input
            type="number"
            value={inputWeight}
            onChange={e => setInputWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          From:
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
            <option value="kilograms">Kilograms</option>
            <option value="pounds">Pounds</option>
            <option value="ounces">Ounces</option>
            <option value="grams">Grams</option>
            <option value="milligrams">Milligrams</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          To:
          <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
            <option value="kilograms">Kilograms</option>
            <option value="pounds">Pounds</option>
            <option value="ounces">Ounces</option>
            <option value="grams">Grams</option>
            <option value="milligrams">Milligrams</option>
          </select>
        </label>
      </div>
      <button onClick={convertWeight}>Convert</button>
      <button onClick={resetFields}>Reset</button>
      <button onClick={goBack}>Go Back</button> {/* Add the Go Back button */}
      {result && (
        <div>
          Result: {result} {toUnit}
        </div>
      )}
    </div>
  );
};

export default WeightConverter;
