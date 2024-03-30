import React, { useState } from 'react';

const VolumeConverter = () => {
  const [inputVolume, setInputVolume] = useState('');
  const [fromUnit, setFromUnit] = useState('cubic_meters');
  const [toUnit, setToUnit] = useState('cubic_feet');
  const [result, setResult] = useState('');

  const convertVolume = () => {
    const volumeMap = {
      cubic_meters: {
        cubic_feet: input => input * 35.315,
        liters: input => input * 1000,
        gallons: input => input * 264.172,
        cubic_inches: input => input * 61023.7,
        cubic_centimeters: input => input * 1000000,
        milliliters: input => input * 1000000,
        cubic_yards: input => input * 1.30795,
        tablespoons: input => input * 67628.0454,
        teaspoons: input => input * 202884.136
      },
      cubic_feet: {
        cubic_meters: input => input * 0.0283168,
        liters: input => input * 28.3168,
        gallons: input => input * 7.48052,
        cubic_inches: input => input * 1728,
        cubic_centimeters: input => input * 28316.8,
        milliliters: input => input * 28316.8,
        cubic_yards: input => input * 0.037037,
        tablespoons: input => input * 1915.01299,
        teaspoons: input => input * 5745.03897
      },
      liters: {
        cubic_meters: input => input * 0.001,
        cubic_feet: input => input * 0.0353147,
        gallons: input => input * 0.264172,
        cubic_inches: input => input * 61.0237,
        cubic_centimeters: input => input * 1000,
        milliliters: input => input * 1000,
        cubic_yards: input => input * 0.001308,
        tablespoons: input => input * 67.6280454,
        teaspoons: input => input * 202.884136
      },
      gallons: {
        cubic_meters: input => input * 0.00378541,
        cubic_feet: input => input * 0.133681,
        liters: input => input * 3.78541,
        cubic_inches: input => input * 231,
        cubic_centimeters: input => input * 3785.41,
        milliliters: input => input * 3785.41,
        cubic_yards: input => input * 0.00495113,
        tablespoons: input => input * 256,
        teaspoons: input => input * 768
      },
      cubic_inches: {
        cubic_meters: input => input * 0.0000163871,
        cubic_feet: input => input * 0.000578704,
        liters: input => input * 0.0163871,
        gallons: input => input * 0.004329,
        cubic_centimeters: input => input * 16.3871,
        milliliters: input => input * 16.3871,
        cubic_yards: input => input * 0.0000214335,
        tablespoons: input => input * 1.10822511,
        teaspoons: input => input * 3.32467534
      },
      cubic_centimeters: {
        cubic_meters: input => input * 0.000001,
        cubic_feet: input => input * 0.0000353147,
        liters: input => input * 0.001,
        gallons: input => input * 0.000264172,
        cubic_inches: input => input * 0.0610237,
        milliliters: input => input * 1,
        cubic_yards: input => input * 0.000001308,
        tablespoons: input => input * 0.0676280454,
        teaspoons: input => input * 0.202884136
      },
      milliliters: {
        cubic_meters: input => input * 0.000001,
        cubic_feet: input => input * 0.0000353147,
        liters: input => input * 0.001,
        gallons: input => input * 0.000264172,
        cubic_inches: input => input * 0.0610237,
        cubic_centimeters: input => input * 1,
        cubic_yards: input => input * 0.000001308,
        tablespoons: input => input * 0.0676280454,
        teaspoons: input => input * 0.202884136
      },
      cubic_yards: {
        cubic_meters: input => input * 0.764554858,
        cubic_feet: input => input * 27,
        liters: input => input * 764.554858,
        gallons: input => input * 201.974,
        cubic_inches: input => input * 46656,
        cubic_centimeters: input => input * 764554.858,
        milliliters: input => input * 764554.858,
        tablespoons: input => input * 39370.1,
        teaspoons: input => input * 118110.281
      },
      tablespoons: {
        cubic_meters: input => input * 1.47867648e-5,
        cubic_feet: input => input * 0.000522189,
        liters: input => input * 0.0147867648,
        gallons: input => input * 0.00390625,
        cubic_inches: input => input * 0.902344,
        cubic_centimeters: input => input * 14.7867648,
        milliliters: input => input * 14.7867648,
        cubic_yards: input => input * 2.53907e-5,
        teaspoons: input => input * 3
      },
      teaspoons: {
        cubic_meters: input => input * 4.92892161e-6,
        cubic_feet: input => input * 0.000174063,
        liters: input => input * 0.00492892161,
        gallons: input => input * 0.00130208,
        cubic_inches: input => input * 0.300781,
        cubic_centimeters: input => input * 4.92892161,
        milliliters: input => input * 4.92892161,
        cubic_yards: input => input * 8.4567e-6,
        tablespoons: input => input * 0.333333
      }
    };

    const convertedVolume = volumeMap[fromUnit][toUnit](parseFloat(inputVolume));
    setResult(convertedVolume.toFixed(2));
  };

  const resetFields = () => {
    setInputVolume('');
    setResult('');
  };

  return (
    <div>
      <h2>Volume Converter</h2>
      <div>
        <label>
          Input Volume:
          <input
            type="number"
            value={inputVolume}
            onChange={e => setInputVolume(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          From:
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
            <option value="cubic_meters">Cubic Meters</option>
            <option value="cubic_feet">Cubic Feet</option>
            <option value="liters">Liters</option>
            <option value="gallons">Gallons</option>
            <option value="cubic_inches">Cubic Inches</option>
            <option value="cubic_centimeters">Cubic Centimeters</option>
            <option value="milliliters">Milliliters</option>
            <option value="cubic_yards">Cubic Yards</option>
            <option value="tablespoons">Tablespoons</option>
            <option value="teaspoons">Teaspoons</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          To:
          <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
            <option value="cubic_meters">Cubic Meters</option>
            <option value="cubic_feet">Cubic Feet</option>
            <option value="liters">Liters</option>
            <option value="gallons">Gallons</option>
            <option value="cubic_inches">Cubic Inches</option>
            <option value="cubic_centimeters">Cubic Centimeters</option>
            <option value="milliliters">Milliliters</option>
            <option value="cubic_yards">Cubic Yards</option>
            <option value="tablespoons">Tablespoons</option>
            <option value="teaspoons">Teaspoons</option>
          </select>
        </label>
      </div>
      <button onClick={convertVolume}>Convert</button>
      <button onClick={resetFields}>Reset</button>
      {result && (
        <div>
          Result: {result} {toUnit}
        </div>
      )}
    </div>
  );
};

export default VolumeConverter;
