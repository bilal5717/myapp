import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Tesseract from 'tesseract.js';

const QuadraticEquationSolver = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState(0);
  const [dstr, setDstr] = useState('');
  const [x1, setX1] = useState('');
  const [x2, setX2] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage when component mounts
    const storedQuadraticData = localStorage.getItem('quadratic_data');
    if (storedQuadraticData) {
      const parsedData = JSON.parse(storedQuadraticData);
      setA(parsedData.a);
      setB(parsedData.b);
      setC(parsedData.c);
      setD(parsedData.d);
      setDstr(parsedData.dstr);
      setX1(parsedData.x1);
      setX2(parsedData.x2);
      setPlotData(parsedData.plotData);
    }
  }, []);

  const quadcalc = () => {
    if (a === '' || b === '' || c === '') {
      setDstr('❌ Fill All 3 Boxes');
    } else {
      if (a === 0) {
        setDstr('❌ Error coefficient of x^2 should be > 0');
      } else {
        calculate();
      }
    }
  };

  const clearall = () => {
    setA('');
    setB('');
    setC('');
    setD(0);
    setDstr('Fill your Equation');
    setX1('');
    setX2('');
    setPlotData(null);
  };

  const dshow = () => {
    if (d > 0) {
      setDstr('Both roots are Real & Distinct');
    } else if (d < 0) {
      setDstr('Both roots are Distinct & Imaginary');
    } else if (d === 0) {
      setDstr('Both roots are Real & Equal');
    }
  };

  const calculate = () => {
    let delta = b * b - 4 * a * c;
    setD(delta);
    dshow();

    if (delta >= 0) {
      let root1 = (-b + Math.sqrt(delta)) / (2 * a);
      let root2 = (-b - Math.sqrt(delta)) / (2 * a);
      setX1(Number.isInteger(root1) ? root1 : root1.toFixed(3));
      setX2(Number.isInteger(root2) ? root2 : root2.toFixed(3));
    } else {
      delta = Math.sqrt(Math.abs(delta));
      let realPart = -b / (2 * a);
      let imgPart = delta / (2 * a);

      setX1(realPart + (imgPart > 0 ? ' + ' : ' - ') + Math.abs(imgPart) + 'i');
      setX2(realPart + (imgPart > 0 ? ' - ' : ' + ') + Math.abs(imgPart) + 'i');
    }

    // Generate plot data for the quadratic equation
    const xValues = [];
    const yValues = [];
    for (let i = -10; i <= 10; i++) {
      xValues.push(i);
      yValues.push(a * i * i + b * i + c);
    }

    const newData = [{ x: xValues, y: yValues, type: 'scatter', mode: 'lines', name: 'Quadratic Equation' }];
    setPlotData(newData);

    // Save data to local storage
    const dataToStore = { a, b, c, d, dstr, x1, x2, plotData };
    localStorage.setItem('quadratic_data', JSON.stringify(dataToStore));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        performOCR(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const performOCR = async (imageData) => {
    try {
      const result = await Tesseract.recognize(imageData, 'eng');
      console.log('OCR Result:', result.data.text);
      const text = result.data.text;
      const coefficients = parseCoefficients(text);
      console.log('Parsed Coefficients:', coefficients);
      if (coefficients.length === 3) {
        setA(coefficients[0]);
        setB(coefficients[1]);
        setC(coefficients[2]);
      } else {
        console.error('Error: Unable to parse coefficients from the image.');
      }
    } catch (error) {
      console.error('Error during OCR:', error);
    }
  };

  const parseCoefficients = (text) => {
    // Split the text into individual terms
    const terms = text.split(/\s*[+=-]\s*/);
    let a = 1, b = 1, c = 0;
  
    // Loop through each term and identify coefficients
    terms.forEach(term => {
      // Remove whitespace and ensure lowercase for easier matching
      term = term.trim().toLowerCase();
      if (term.includes('x^2')) {
        // Extract coefficient for x^2
        a = parseInt(term.split('x^2')[0]) || 1; // Default to 1 if no coefficient is found
      } else if (term.includes('x')) {
        // Extract coefficient for x
        b = parseInt(term.split('x')[0]) || 1; // Default to 1 if no coefficient is found
      } else {
        // Extract constant term
        c = parseInt(term) || 0; // Default to 0 if no constant term is found
      }
    });
  
    return [a, b, c];
  };
  

  const clearImage = () => {
    setImage(null);
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="outerbox">
      <button onClick={goBack} className="backBtn">Back</button><br></br>
      <div className="form_page">
        <p className="entertext">Enter your quadratic equation</p>
        <div className="quadeqbox">
          <input type="number" autoComplete="off" id="a" value={a} onChange={(e) => setA(e.target.value)} />
          <span className="vboxvar">x<sup>2</sup>+</span>
          <input type="number" autoComplete="off" id="b" value={b} onChange={(e) => setB(e.target.value)} />
          <span className="vboxvar">x+</span>
          <input type="number" autoComplete="off" id="c" value={c} onChange={(e) => setC(e.target.value)} />
          <span className="vboxvar">= 0</span>
        </div>
        <div>
          <button onClick={quadcalc}>Calculate</button>
          <button onClick={clearall}>Reset</button>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={clearImage}>Clear Image</button>
        </div>
        <div className="dbox">
          <p id="dtext">{dstr}</p>
        </div>
        <div>
          <p>Roots: x1 = {x1}, x2 = {x2}</p>
        </div>
        <div>
          {plotData && (
            <Plot
              data={plotData}
              layout={{ width: 500, height: 400, title: 'Quadratic Equation Graph' }}
            />
          )}
        </div>
        <div>
          {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
        </div>
      </div>
    </div>
  );
};

export default QuadraticEquationSolver;
