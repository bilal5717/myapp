import React, { useState } from 'react';

const AreaConverter = () => {
  const [inputArea, setInputArea] = useState('');
  const [fromUnit, setFromUnit] = useState('square_meters');
  const [toUnit, setToUnit] = useState('square_feet');
  const [result, setResult] = useState('');

  const convertArea = () => {
    const areaMap = {
      square_meters: {
        square_feet: input => input * 10.764,
        square_yards: input => input * 1.196,
        acres: input => input * 0.0002471,
        hectares: input => input * 0.0001,
        square_inches: input => input * 1550,
        square_centimeters: input => input * 10000
      },
      square_feet: {
        square_meters: input => input * 0.0929,
        square_yards: input => input * 0.1111,
        acres: input => input * 0.00002296,
        hectares: input => input * 0.00000929,
        square_inches: input => input * 144,
        square_centimeters: input => input * 929.03
      },
      square_yards: {
        square_meters: input => input * 0.8361,
        square_feet: input => input * 9,
        acres: input => input * 0.0002066,
        hectares: input => input * 0.00008361,
        square_inches: input => input * 1296,
        square_centimeters: input => input * 8361.27
      },
      acres: {
        square_meters: input => input * 4046.856,
        square_feet: input => input * 43560,
        square_yards: input => input * 4840,
        hectares: input => input * 0.404686,
        square_inches: input => input * 6272640,
        square_centimeters: input => input * 40468564.2
      },
      hectares: {
        square_meters: input => input * 10000,
        square_feet: input => input * 107639.1,
        square_yards: input => input * 11959.9,
        acres: input => input * 2.47105,
        square_inches: input => input * 15500031,
        square_centimeters: input => input * 100000000
      },
      square_inches: {
        square_meters: input => input * 0.00064516,
        square_feet: input => input * 0.00694444,
        square_yards: input => input * 0.000771605,
        acres: input => input * 1.5942251e-7,
        hectares: input => input * 6.4516e-8,
        square_centimeters: input => input * 6.4516
      },
      square_centimeters: {
        square_meters: input => input * 0.0001,
        square_feet: input => input * 0.00107639,
        square_yards: input => input * 0.000119599,
        acres: input => input * 2.47105381e-8,
        hectares: input => input * 1e-8,
        square_inches: input => input * 0.155
      }
    };

    const convertedArea = areaMap[fromUnit][toUnit](parseFloat(inputArea));
    setResult(convertedArea.toFixed(2));
  };

  const resetFields = () => {
    setInputArea('');
    setResult('');
  };

  return (
    <div>
      <h2>Area Converter</h2>
      <div>
        <label>
          Input Area:
          <input
            type="number"
            value={inputArea}
            onChange={e => setInputArea(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          From:
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
            <option value="square_meters">Square Meters</option>
            <option value="square_feet">Square Feet</option>
            <option value="square_yards">Square Yards</option>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
            <option value="square_inches">Square Inches</option>
            <option value="square_centimeters">Square Centimeters</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          To:
          <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
            <option value="square_meters">Square Meters</option>
            <option value="square_feet">Square Feet</option>
            <option value="square_yards">Square Yards</option>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
            <option value="square_inches">Square Inches</option>
            <option value="square_centimeters">Square Centimeters</option>
          </select>
        </label>
      </div>
      <button onClick={convertArea}>Convert</button>
      <button onClick={resetFields}>Reset</button>
      {result && (
        <div>
          Result: {result} {toUnit}
        </div>
      )}
    </div>
  );
};

export default AreaConverter;
