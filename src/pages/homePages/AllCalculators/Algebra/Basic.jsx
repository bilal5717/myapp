import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import Tesseract from 'tesseract.js';

const EquationSolver = () => {
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [myhistory, setHistory] = useState([]);
  const fileInputRef = useRef(null); // Ref for file input element

  const handleNavigateBack = () => {
    window.history.back(); // Navigate back in the browser history
  };

  // Function to solve linear equations
  const solveLinearEquation = () => {
    // Reset error message
    setErrorMessage('');

    // Parse the equation
    const sides = equation.split('=');
    if (sides.length !== 2) {
      setErrorMessage('Invalid equation');
      setSolution('');
      setPlotData(null);
      return;
    }

    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();

    // Extract coefficients and constants
    let leftCoefficient = 0;
    let leftConstant = 0;
    let rightCoefficient = 0;
    let rightConstant = 0;

    if (leftSide.includes('x')) {
      const parts = leftSide.split('x');
      leftCoefficient = parts[0] ? parseFloat(parts[0]) : 1;
      leftConstant = parseFloat(parts[1] || 0);
    } else {
      leftConstant = parseFloat(leftSide);
    }

    if (rightSide.includes('x')) {
      const parts = rightSide.split('x');
      rightCoefficient = parts[0] ? parseFloat(parts[0]) : 1;
      rightConstant = parseFloat(parts[1] || 0);
    } else {
      rightConstant = parseFloat(rightSide);
    }

    // Solve for the variable
    let x;
    let solutionText;
    if (leftCoefficient === rightCoefficient) {
      if (leftConstant === rightConstant) {
        solutionText = 'Infinite solutions';
      } else {
        solutionText = 'No solution';
      }
    } else {
      x = (rightConstant - leftConstant) / (leftCoefficient - rightCoefficient);
      solutionText = `x = ${x}`;

      // Generate plot data for the line graph
      const xValues = [-10, 10];
      const yValues = [leftCoefficient * xValues[0] + leftConstant, leftCoefficient * xValues[1] + leftConstant];
      const newData = [{ x: xValues, y: yValues, type: 'scatter', mode: 'lines' }];

      // Add marker at solution point
      const solutionPoint = { x: x, y: rightCoefficient * x + rightConstant };
      newData.push({
        x: [solutionPoint.x],
        y: [solutionPoint.y],
        mode: 'markers',
        marker: { color: 'red', size: 10 }
      });

      setPlotData(newData);

      // Save input, output, and graph data to history
      const newEntry = {
        equation: equation,
        solution: solutionText,
        graphData: newData
      };
      const newHistory = [newEntry, ...myhistory.slice(0, 29)]; // Store only the last 30 entries
      setHistory(newHistory);
      localStorage.setItem('storedData', JSON.stringify(newHistory));
    }

    setSolution(solutionText);
  };

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      const reader = new FileReader();
      reader.onload = () => {
        extractTextFromImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('Invalid file format. Please upload a PNG, JPEG, or JPG image.');
    }
  };

  // Function to extract text from the uploaded image using Tesseract.js
  const extractTextFromImage = (imageData) => {
    Tesseract.recognize(
      imageData,
      'eng', // Language
      { logger: (m) => console.log(m) } // Optional logger function for debugging
    ).then(({ data: { text } }) => {
      // Preprocess the text: replace em dash with minus sign
      const preprocessedText = text.replace(/—/g, '-');
      setEquation(preprocessedText);
      solveLinearEquation(); // Automatically solve the equation after extracting text from image
    }).catch((error) => {
      console.error('OCR Error:', error);
      setErrorMessage('Error occurred during OCR. Please try again.');
    });
  };

  // Function to reset the component state
  const handleReset = () => {
    setEquation('');
    setSolution('');
    setPlotData(null);
    setErrorMessage('');
    handleResetFileInput(); // Reset the file input
  };

  // Function to reset the file input and clear its selection
  const handleResetFileInput = () => {
    fileInputRef.current.value = ''; // Clear the file input value
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    setHistory(storedData);
  }, []);
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='calculator'>
       <button onClick={goBack} className="backBtn">Back</button><br></br>
      <button onClick={handleNavigateBack}>Go Back</button>
      <h2>Linear Equation Solver</h2>
      <input
        type="text"
        placeholder="Enter equation (e.g., 'x + 4 = 10')"
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
      />
      <input ref={fileInputRef} type="file" accept=".png,.jpeg,.jpg" onChange={handleFileUpload} />
      <div>
        <button onClick={solveLinearEquation}>Solve</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {solution && <p>{solution}</p>}
      {plotData && <Plot data={plotData} layout={{ width: 500, height: 400, title: 'Equation Graph' }} />}
    </div>
  );
};

export default EquationSolver;
