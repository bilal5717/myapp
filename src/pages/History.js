import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import HistoryOfGraph from './homePages/AllCalculators/Calculus/GraphsOfFunctions/HistoryOfGraph';
import HistoryDerivative from './homePages/AllCalculators/Calculus/derivatives/HistoryDerivative';
import HistoryOfIntegr from './homePages/AllCalculators/Calculus/Integration/HistoryOfIntegr';
import MeanHistory from './homePages/AllCalculators/Statistics/MeanHistory';
import HistoryAverage from './homePages/AllCalculators/Statistics/HistoryAverage';
import HistoryGeomatric from './homePages/AllCalculators/Statistics/HistoryGeomatric';
import HistoryMedian from './homePages/AllCalculators/Statistics/HistoryMedian';
import HistoryMode from './homePages/AllCalculators/Statistics/HistoryMode';
import HistoryStandar from './homePages/AllCalculators/Statistics/HistoryStandar';
import HistoryVarience from './homePages/AllCalculators/Statistics/HistoryVarience';

const StoredData = () => {
  const [option , setOption] =useState(false);
  const [storedData, setStoredData] = useState([]);
  const [gcfLcmStoredData, setGcfLcmStoredData] = useState([]);
  const [primeFactorsData, setPrimeFactorsData] = useState([]);
  const [SolveforData , setSolveforData] = useState([]);
  const [storedSlopeData, setSlopData] = useState([]);

  
  useEffect(() => {
    // Retrieve data from local storage when component mounts
    const storedDataString = localStorage.getItem('storedData');
    const gcfLcmStoredDataString = localStorage.getItem('gcf_lcm_storedData');
    const storedDataPrimeFactorsString = localStorage.getItem('prime_factors_data');
    const SolveforDataString = localStorage.getItem('linearEquationsSolverState');
    const slopeDataString = localStorage.getItem('pointSlopeData');
   
    if (slopeDataString) {
      const parsedSlopeData = JSON.parse(slopeDataString);
      setSlopData([parsedSlopeData]);
    }
    if (storedDataString) {
      const parsedData = JSON.parse(storedDataString);
      setStoredData(parsedData);
    }
    if (SolveforDataString) {
      const parsedDataSolvefor = JSON.parse(SolveforDataString);
      // Ensure SolveforData is an array
      setSolveforData(prevSolveforData => {
        const newSolveforData = [parsedDataSolvefor, ...prevSolveforData.slice(0, 14)]; // Limit to 15 records
        return newSolveforData;
      });
    }
    if (gcfLcmStoredDataString) {
      const parsedGcfLcmData = JSON.parse(gcfLcmStoredDataString);
      setGcfLcmStoredData(parsedGcfLcmData);
    }
    if (storedDataPrimeFactorsString) {
      const parsedPrimeFactorsData = JSON.parse(storedDataPrimeFactorsString);
      setPrimeFactorsData(parsedPrimeFactorsData);
    }
  }, []);

  const clearAllStorage = () => {
    localStorage.removeItem('storedData');
    localStorage.removeItem('gcf_lcm_storedData');
    localStorage.removeItem('prime_factors_data');
    localStorage.removeItem('linearEquationsSolverState');
    localStorage.removeItem('pointSlopeData');
    localStorage.clear();
    setStoredData([]);
    setGcfLcmStoredData([]);
    setPrimeFactorsData([]);
    setSolveforData([]);
    setSlopData([]);
    setOption(true);
  };

  return (
    <div className={(option === false)? "show" : "hide"}>
      <h2>Previously Stored Data</h2>
      <button onClick={clearAllStorage}>Clear All Storage</button>
      {storedData.length > 0 && (
        <ol>
          {storedData.map((data, index) => (
            <li key={index}>
              <p>Equation: {data.equation}</p>
              <p>Solution: {data.solution}</p>
              {data.graphData && (
                <Plot
                  data={data.graphData}
                  layout={{ width: 500, height: 400, title: 'Graph' }}
                />
              )}
            </li>
          ))}
        
          {gcfLcmStoredData.map((data, index) => (
            <li key={index}>
              <p>Input: {data.input}</p>
              <p>Output: {data.output}</p>
            </li>
          ))}

          {Array.isArray(primeFactorsData) && primeFactorsData.map((data, index) => (
            <li key={index}>
              <p>Input Value: {data.inputValue}</p>
              <p>Prime Factors: {data.primeFactors.join(', ')}</p>
              <p>Is Prime: {data.isPrime.toString()}</p>
              <p>Option: {data.option.toString()}</p>
            </li>
          ))}


          {SolveforData.map((data, index) => (
            <li key={index}>
              <p>Equation: {data.equation}</p>
              <p>Solution: {data.solution}</p>
              {data.graphData && (
                <Plot
                  data={data.graphData}
                  layout={{ width: 500, height: 400, title: 'Graph' }}
                />
              )}
            </li>
          ))}


    {storedSlopeData.map((data, index) => (
              <li key={index}>
                <h3>Data {index + 1}</h3>
                <p>X1: {data.x1}</p>
                <p>Y1: {data.y1}</p>
                <p>X2: {data.x2}</p>
                <p>Y2: {data.y2}</p>
                <p>CoeffX: {data.coeffX}</p>
                <p>CoeffY: {data.coeffY}</p>
                <p>Slope: {data.slope}</p>
                <p>Equation: {data.equation}</p>
              </li>
            ))}

            <li>
          <HistoryOfGraph myoption ={option}/>
            </li>
            <li>
              <HistoryDerivative />
            </li>
            <li>
              <HistoryOfIntegr />
            </li>
            <li>
            <MeanHistory />
            </li>
            <li>
            <HistoryAverage />
            </li>
            <li>
              <HistoryGeomatric />
            </li>
            <li>
                {<HistoryMedian /> }
            </li>
            <li>
              <HistoryMode />
            </li>
            <li>
                <HistoryStandar />
            </li>
            <li>
              <HistoryVarience />
            </li>
          </ol>
      )}
    </div>
  );
};

export default StoredData;
