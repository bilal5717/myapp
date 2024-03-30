import React, { useState } from 'react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState({
    years: null,
    months: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null
  });
  const [error, setError] = useState('');

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please enter a valid birth date.');
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth >= today) {
      setError('Birth date cannot be in the future.');
      return;
    }

    const diff = today - birth;
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const millisecondsPerMonth = millisecondsPerYear / 12;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisecondsPerHour = 1000 * 60 * 60;
    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerSecond = 1000;

    const years = Math.floor(diff / millisecondsPerYear);
    const months = Math.floor((diff % millisecondsPerYear) / millisecondsPerMonth);
    const days = Math.floor((diff % millisecondsPerMonth) / millisecondsPerDay);
    const hours = Math.floor((diff % millisecondsPerDay) / millisecondsPerHour);
    const minutes = Math.floor((diff % millisecondsPerHour) / millisecondsPerMinute);
    const seconds = Math.floor((diff % millisecondsPerMinute) / millisecondsPerSecond);

    setAge({ years, months, days, hours, minutes, seconds });
    setError('');
  };

  const resetCalculator = () => {
    setBirthDate('');
    setAge({
      years: null,
      months: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    });
    setError('');
  };

  return (
    <div className="calculator">
      <h2>Age Calculator</h2>
      <div>
        <label>Insert your Birth Date:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div>
        <button onClick={calculateAge}>Calculate Age</button>
        <button onClick={resetCalculator}>Reset</button>
      </div>
      {error && <p className="error">{error}</p>}
      {age.years !== null && (
        <div className="result">
          <p>Your age is:</p>
          <p>{age.years} Years</p>
          <p>{age.months} Months</p>
          <p>{age.days} Days</p>
          <p>{age.hours} Hours</p>
          <p>{age.minutes} Minutes</p>
          <p>{age.seconds} Seconds</p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
