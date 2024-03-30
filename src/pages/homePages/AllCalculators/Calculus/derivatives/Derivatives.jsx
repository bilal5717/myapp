import React, { useState, useEffect, useCallback } from 'react';
import { BlockMath } from 'react-katex';
import * as math from 'mathjs';
import Plotly from 'plotly.js-dist';

function Derivatives() {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [order, setOrder] = useState(1);
  const [results, setResults] = useState([]);
  const [option, setOption] = useState(false);
  const [graphData, setGraphData] = useState(null);

  // Load saved data from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('derivativesData'));
    if (savedData) {
      setExpression(savedData.expression || '');
      setVariable(savedData.variable || 'x');
      setOrder(savedData.order || 1);
      setResults(savedData.results || []);
      setGraphData(savedData.graphData || null);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'derivativesData',
      JSON.stringify({ expression, variable, order, results, graphData })
    );
  }, [expression, variable, order, results, graphData]);

  const calculateDerivative = useCallback(() => {
    setOption(true);
    try {
      let currentResult = expression;
      const calculatedResults = [];

      for (let i = 1; i <= order; i++) {
        const derivativeResult = math.derivative(currentResult, variable);
        calculatedResults.push(derivativeResult.toString());
        currentResult = derivativeResult.toString();
      }

      setResults(calculatedResults);
    } catch (error) {
      console.error('Error calculating derivatives:', error);
    }
  }, [expression, variable, order]);

  const resetInputs = () => {
    setOption(false);
    setExpression('');
    setVariable('x');
    setOrder(1);
    setResults([]);
  };

  useEffect(() => {
    if (option) {
      try {
        const xValues = math.range(-10, 10, 0.5).toArray();
        const yValues = xValues.map((x) => math.compile(expression).evaluate({ [variable]: x }));

        const traces = results.map((result, index) => ({
          x: xValues,
          y: xValues.map((x) => math.compile(result).evaluate({ [variable]: x })),
          mode: 'lines',
          name: `y' (${index + 1}-th order)`,
        }));

        const data = [{ x: xValues, y: yValues, mode: 'lines', name: 'y' }, ...traces];
        const layout = {
          xaxis: {
            title: 'x',
          },
          yaxis: {
            title: 'y',
          },
        };
        const config = { responsive: true };

        Plotly.newPlot('graph', data, layout, config);

        // Save the graph data
        setGraphData({ data, layout, config });
      } catch (error) {
        console.error('Error rendering graph:', error);
      }
    }
  }, [expression, variable, results, option]);
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='form_page'>
       <button onClick={goBack} className="backBtn">Back</button><br></br>
      <div className='form-group graph-container'>
        <label htmlFor='expression'>y =</label>
        <input
          type='text'
          id='expression'
          placeholder='Enter an expression...'
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        &nbsp;
        <label htmlFor='variable'>with respect to:</label>
        &nbsp;
        <input
          type='text'
          id='variable min'
          placeholder='Enter variable (e.g., x)'
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
        />
        &nbsp;
        <label htmlFor='order'>Derivative Order:</label>
        &nbsp;
        <input
          type='number'
          id='order'
          placeholder='Enter derivative order'
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
        &nbsp;
        <div>
          <button onClick={calculateDerivative}>Go!</button>
          &nbsp;
          <button onClick={resetInputs}>Reset</button>
        </div>
      </div>

      <br /><br />
      {option && (
        <div className='graph-container'>
          <h4>Derivatives:</h4>
          <br />
          {results.map((result, index) => (
            <div key={index}>
              {`y' (${index + 1}-th order) = `}
              <BlockMath math={result} />
            </div>
          ))}
          <br />
          <hr />
          <h4>Graph:</h4>
          <br />
          <div id='graph'></div>
          <br />
        </div>
      )}
    </div>
  );
}

export default Derivatives;
