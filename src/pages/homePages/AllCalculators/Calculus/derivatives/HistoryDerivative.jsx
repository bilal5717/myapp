import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

function SavedData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('derivativesData'));
    setData(savedData);
  }, []);

  useEffect(() => {
    if (data && data.graphData) {
      Plotly.newPlot('saved-graph', data.graphData.data, data.graphData.layout, data.graphData.config);
    }
  }, [data]);

  return (
    <div className="saved-data">
      {data && (
        <div>
          <h3>Expression: {data.expression}</h3>
          <h3>Variable: {data.variable}</h3>
          <h3>Order: {data.order}</h3>
          <h3>Results:</h3>
          {data.results && data.results.map((result, index) => (
            <div key={index}>
              <p>{`y' (${index + 1}-th order): ${result}`}</p>
            </div>
          ))}
          <div id="saved-graph"></div>
        </div>
      )}
    </div>
  );
}

export default SavedData;
