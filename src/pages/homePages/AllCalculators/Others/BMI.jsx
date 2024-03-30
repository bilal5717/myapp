import React, { useState } from 'react';

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric'); // 'metric', 'imperial', or 'us'
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // 'male' or 'female'
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [error, setError] = useState('');
  const [bmiMessage, setBMIMessage] = useState('');

  const calculateBMI = () => {
    if (!age || !height || !weight) {
      setError('Please enter age, height, and weight.');
      return;
    }

    let weightValue = parseFloat(weight);
    let heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
      setError('Please enter valid numeric values for height and weight.');
      return;
    }

    if (unit === 'imperial') {
      weightValue *= 0.453592; // convert pounds to kilograms
      heightValue *= 2.54; // convert inches to centimeters
    } else if (unit === 'us') {
      weightValue *= 0.453592; // convert pounds to kilograms
      heightValue *= 0.0254; // convert inches to meters
    }

    const bmiValue = weightValue / ((heightValue / 100) * (heightValue / 100));
    setBMI(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setBMIMessage('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBMIMessage('Normal weight');
    } else if (bmiValue >= 24.9 && bmiValue < 29.9) {
      setBMIMessage('Overweight');
    } else {
      setBMIMessage('Obese');
    }

    setError('');
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div>
        <label htmlFor="unit">Unit:</label>
        <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
          <option value="us">US Customary</option>
        </select>
      </div>
      <div>
        <label htmlFor="age">Age (years):</label>
        <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="height">Height ({unit === 'metric' ? 'cm' : unit === 'us' ? 'in' : 'ft'}):</label>
        <input type="text" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div>
        <label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lb'}):</label>
        <input type="text" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {error && <p className="error">{error}</p>}
      {bmi && <p className="result">Your BMI is: {bmi}</p>}
      {bmiMessage && <p className="bmi-message">You are {bmiMessage}</p>}
    </div>
  );
};

export default BMICalculator;
