import React, { useEffect, useRef } from 'react';
import Desmos from 'desmos';

const SlopeInterceptCalculator = () => {
  const desmosRef = useRef(null);
  const calculator = useRef(null);

  useEffect(() => {
    // Initialize Desmos calculator when the component mounts
    calculator.current = Desmos.GraphingCalculator(desmosRef.current);

    // Retrieve data from local storage when the component mounts
    const storedData = JSON.parse(localStorage.getItem('slopeInterceptData')) || { m: 2, b: 1 };
    updateGraph(storedData.m, storedData.b);

    // Cleanup when the component unmounts
    return () => {
      calculator.current.destroy();
    };
  }, []);

  // Function to update the graph based on user input
  const updateGraph = (m, b) => {
    const expression = `y=${m}*x+${b}`;
    calculator.current.setExpression({ id: 'graph1', latex: expression });

    // Save data to local storage whenever it changes
    localStorage.setItem('slopeInterceptData', JSON.stringify({ m, b }));
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="graph-container">
       <button onClick={goBack} className="backBtn">Back</button><br></br>
      <h2>Easy Graph Plotter</h2>
      <div ref={desmosRef} className="graph"></div>
    </div>
  );
};

export default SlopeInterceptCalculator;
