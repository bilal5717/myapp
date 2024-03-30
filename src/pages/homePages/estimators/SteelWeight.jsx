import React, { useState } from 'react';

const SteelWeightCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [density, setDensity] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');

  const calculateWeight = () => {
    if (!length || !width || !thickness || !density) {
      setError('Please fill out all fields.');
      return;
    }
    
    const volume = parseFloat(length) * parseFloat(width) * parseFloat(thickness);
    const steelWeight = volume * parseFloat(density);
    setWeight(steelWeight.toFixed(2));
    setError('');
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h2>Steel Weight Calculator</h2>
      <button onClick={goBack}>Back</button>
      <div>
        <label htmlFor="length">Length (in meters): </label>
        <input
          type="number"
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="width">Width (in meters): </label>
        <input
          type="number"
          id="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="thickness">Thickness (in meters): </label>
        <input
          type="number"
          id="thickness"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="density">Density (in kg/m³): </label>
        <input
          type="number"
          id="density"
          value={density}
          onChange={(e) => setDensity(e.target.value)}
        />
      </div>
      <button onClick={calculateWeight}>Calculate Weight</button>
      {weight && (
        <div>
          <h3>Steel Weight:</h3>
          <p>{weight} kg</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
    </div>
  );
};

export default SteelWeightCalculator;
