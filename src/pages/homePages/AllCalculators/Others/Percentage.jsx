import React, { useState } from 'react';

const PercentageCalculator = () => {
  const [calculationType, setCalculationType] = useState('percentage');
  const [total, setTotal] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculatePercentage = () => {
    if (!total || !percentage) {
      setError('Please enter both total and percentage values.');
      return;
    }

    const totalValue = parseFloat(total);
    const percentageValue = parseFloat(percentage);

    if (isNaN(totalValue) || isNaN(percentageValue)) {
      setError('Please enter valid numeric values for total and percentage.');
      return;
    }

    const resultValue = (percentageValue / 100) * totalValue;
    setResult(resultValue.toFixed(2));
    setError('');
  };

  const calculatePercentageDifference = () => {
    if (!total || !percentage) {
      setError('Please enter both original and new values.');
      return;
    }
  
    const originalValue = parseFloat(total);
    const newValue = parseFloat(percentage);
  
    if (isNaN(originalValue) || isNaN(newValue)) {
      setError('Please enter valid numeric values for original and new values.');
      return;
    }
  
    const difference = newValue - originalValue;
    const percentageDifference = (Math.abs(difference) / originalValue) * 100; // Corrected here
    setResult(percentageDifference.toFixed(2) + '%');
    setError('');
  };
  

  const resetCalculator = () => {
    setTotal('');
    setPercentage('');
    setResult(null);
    setError('');
  };

  return (
    <div className="calculator">
      <h2>Percentage Calculator</h2>
      <div>
        <label>Calculation Type:</label>
        <select value={calculationType} onChange={(e) => setCalculationType(e.target.value)}>
          <option value="percentage">Percentage</option>
          <option value="percentageDifference">Percentage Difference</option>
        </select>
      </div>
      <div>
        <label>{calculationType === 'percentage' ? 'Total:' : 'Original:'}</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </div>
      <div>
        <label>{calculationType === 'percentage' ? 'Percentage:' : 'New:'}</label>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <span>{calculationType === 'percentage' ? '%' : ''}</span>
      </div>
      <div>
        <button onClick={calculationType === 'percentage' ? calculatePercentage : calculatePercentageDifference}>Calculate</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {error && <p className="error">{error}</p>}
      {result && <p className="result">The result is: {result}</p>}
    </div>
  );
};

export default PercentageCalculator;
