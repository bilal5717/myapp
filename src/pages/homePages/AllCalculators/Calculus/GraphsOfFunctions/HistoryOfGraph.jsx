import React, { useEffect, useState, useRef } from 'react';
import Desmos from 'desmos';

const SavedInputData = ({option}) => {
  const [savedData, setSavedData] = useState(null);
  const desmosRef = useRef(null);
  const calculator = useRef(null);

 const  clearHistory =(clearOption)=>{
        if(clearOption === true){
          localStorage.removeItem('slopeInterceptData');
          setSavedData([]);
        }
  }
  clearHistory(option);
  useEffect(() => {
    // Retrieve saved data from local storage
    const storedData = JSON.parse(localStorage.getItem('slopeInterceptData'));
    setSavedData(storedData);

    // Initialize Desmos calculator when the component mounts
    calculator.current = Desmos.GraphingCalculator(desmosRef.current);

    // Add an initial example graph
    calculator.current.setExpression({ id: 'graph1', latex: 'y=mx+b' });

    // Example usage: update graph with saved slope m and y-intercept b
    if (storedData) {
      const { m, b } = storedData;
      updateGraph(m, b);
    }

    // Cleanup when the component unmounts
    return () => {
      calculator.current.destroy();
    };
  }, []);

  // Function to update the graph based on user input
  const updateGraph = (m, b) => {
    const expression = `y=${m}*x+${b}`;
    calculator.current.setExpression({ id: 'graph1', latex: expression });
  };

  return (
    <div>
      {savedData ? (
        <div>
          <p>m: {savedData.m}</p>
          <p>b: {savedData.b}</p>
        </div>
      ) : (
        ''
      )}
      <div ref={desmosRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default SavedInputData;
