import React, { useState, useEffect } from "react";

function PointSlope() {
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [coeffX, setCoeffX] = useState('');
  const [coeffY, setCoeffY] = useState('');
  const [constant, setConstant] = useState('');
  const [option, setOption] = useState('Slope from two-points');
  const [equation, setEquation] = useState('');
  const [slope, setSlope] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Retrieve data from local storage when component mounts
    const storedData = JSON.parse(localStorage.getItem('pointSlopeData')) || {};
    setX1(storedData.x1 || '');
    setY1(storedData.y1 || '');
    setX2(storedData.x2 || '');
    setY2(storedData.y2 || '');
    setCoeffX(storedData.coeffX || '');
    setCoeffY(storedData.coeffY || '');
    setConstant(storedData.constant || '');
    setOption(storedData.option || 'Slope from two-points');
  }, []);

  useEffect(() => {
    // Save data to local storage whenever it changes
    const dataToStore = { x1, y1, x2, y2, coeffX, coeffY, constant, option, equation, slope };
    localStorage.setItem('pointSlopeData', JSON.stringify(dataToStore));
}, [x1, y1, x2, y2, coeffX, coeffY, constant, option, equation, slope]);


  const calculateSlope = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);

    if (!isNaN(x1Num) && !isNaN(y1Num) && !isNaN(x2Num) && !isNaN(y2Num)) {
      const deltaX = x2Num - x1Num;
      const deltaY = y2Num - y1Num;
      const slopeValue = deltaY / deltaX;
      setSlope(slopeValue);
      setShowResults(true);
    } else {
      setSlope(null);
      setShowResults(false);
    }
  };

  const SlopeOfLine = () => {
    const coX = parseFloat(coeffX);
    const coY = parseFloat(coeffY);

    if (!isNaN(coX) && !isNaN(coY)) {
      const coXsign = coX < 0 ? ` ${-Math.abs(coX)}` : `  ${+coX}`;
      const coYsign = coY < 0 ? `  ${-Math.abs(coY)}` : `  ${+coY}`;

      setSlope(-(coXsign / coYsign));
      setShowResults(true);
    } else {
      setSlope(null);
      setShowResults(false);
    }
  };

  const OnePointSlope = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const m = parseFloat(slope);

    if (!isNaN(x1Num) && !isNaN(y1Num) && !isNaN(m)) {
      const yintercept = y1Num - m * x1Num;
      const yInterceptSign = yintercept < 0 ? ` - ${Math.abs(yintercept)}` : ` + ${yintercept}`;
      setEquation(`y = ${m}x${yInterceptSign}`);

      setShowResults(true);
    } else {
      setSlope(null);
      setShowResults(false);
    }
  };

  const resetInputs = () => {
    setX1('');
    setY1('');
    setX2('');
    setY2('');
    setCoeffX('');
    setCoeffY('');
    setConstant('');
    setSlope(null);
    setShowResults(false);
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="form_page">
      <button onClick={goBack} className="backBtn">Back</button><br></br>
      <select id="input_select" onChange={(e) => {
        setOption(e.target.value)
        resetInputs();

      }}>
        <option className="option_field">Slope from two-points</option>
        <option className="option_field">Slope from Line Equation</option>
        <option className="option_field">Equation from one-point-slope</option>
      </select>
      <div id={option === 'Slope from Line Equation' ? "line_input" : "hide_line_input"}>
        <input type="number" placeholder="x" value={coeffX} onChange={(e) => setCoeffX(e.target.value)} />
        +
        <input type="number" placeholder="y" value={coeffY} onChange={(e) => setCoeffY(e.target.value)} />
        +
        <input type="number" placeholder="c" value={constant} onChange={(e) => setConstant(e.target.value)} />
      </div>
      <div id={option === 'Slope from two-points' ? "input" : "hide_result"}>
        <div>
          <input type="number" placeholder="X1" value={x1} onChange={(e) => setX1(e.target.value)} />
          <input type="number" placeholder="Y1" value={y1} onChange={(e) => setY1(e.target.value)} />
        </div>
        <div>
          <input type="number" placeholder="X2" value={x2} onChange={(e) => setX2(e.target.value)} />
          <input type="number" placeholder="Y2" value={y2} onChange={(e) => setY2(e.target.value)} />
        </div>
      </div>
      <div id={option === 'Equation from one-point-slope' ? "show" : "hide_result"}>
        <div>
          <input type="number" placeholder="X1" value={x1} onChange={(e) => setX1(e.target.value)} />
          <input type="number" placeholder="Y1" value={y1} onChange={(e) => setY1(e.target.value)} />
          <input type="number" placeholder="m" value={slope} onChange={(e) => setSlope(e.target.value)} />
        </div>
      </div>
      <div>
        <button type="button" onClick={
          () => {
            if (option === 'Slope from two-points') {
              calculateSlope();
            } else if (option === 'Equation from one-point-slope') {
              OnePointSlope();
            } else {
              SlopeOfLine();
            }
          }
        }>Calculate</button>
        <button type="button" onClick={() => { resetInputs(); setSlope(null) }}>Reset</button>
      </div>
      <div id={showResults ? "show_result" : "hide_result"}>
        {slope !== null ? (
          <div>
            <h3>Answers:</h3>
            <div className={option === 'Slope from two-points' ? "show" : "hide"}>
              <h3>m = (y2-y1)/(x2-x1)</h3>
              <h5 className="steps">
                <h2>Steps :</h2>
                m= ({y2}-{y1})/({x2}-{x1});<br />
                m= ({y2 - y1})/({x2 - x1});
              </h5>
              <span>Slope: {slope}</span>
              <br />
              <span>Δx: {x2 - x1}</span><br />
              <span>Δy: {y2 - y1}</span><br />
              <span>y-intercept : {((y1 - slope * x1)).toFixed(2)}</span><br />
              <span>x-intercept : {(-((y1 - slope * x1) / slope))}</span><br />
            </div>
            <br />
            <div className={option === 'Slope from Line Equation' ? "show" : "hide"}>
              <span>Slope: {slope}</span>
              <br />
              <span>x-intercept: {(-(constant / coeffX)).toFixed(2)}</span>
              <br />
              <span>y-intercept: {(-(constant / coeffY)).toFixed(2)}</span>
            </div>
            <div className={option === 'Equation from one-point-slope' ? "show" : "hide"}>
              <span>Line Equation is : {equation}</span> <br />
              <div className="Steps">
                <h1>Formula :</h1>
                <h4>y-y1 = m(x-x1)</h4>
                <h3>Steps : </h3>
                <h3>x1 = {x1} , y1 ={y1} , m= {slope}</h3>
                <h4>By putting values in above equation</h4>
                y-{y1} = {slope}(x-{x1})<br />
                y-{y1} = {slope}x{(slope < 0) ? `+${slope}` : `-${slope * x1}`}<br />
                y = {slope}x{(slope < 0) ? `+${slope}` : `-${slope * x1}`}{(y1 < 0) ? `-${y1}` : `+${y1}`}<br />
                {equation}
              </div>
              <br />
            </div>
          </div>
        ) : (
          <span>Please Enter All values</span>
        )}
      </div>
    </div>
  );
}

export default PointSlope;
