import React, { useState, useEffect } from 'react';
import nerdamer from 'nerdamer/all';

const LinearEquationsSolver = () => {
  // Load state from local storage or use default values
  const initialState = JSON.parse(localStorage.getItem('linearEquationsSolverState')) || {
    equation: '',
    selectedVariable: 'x',
    solution: ''
  };

  const [state, setState] = useState(initialState);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('linearEquationsSolverState', JSON.stringify(state));
  }, [state]);

  const solveEquation = () => {
    try {
      // Solve the equation for the selected variable
      const result = nerdamer.solve(state.equation, state.selectedVariable);

      // Set the solution
      setState(prevState => ({
        ...prevState,
        solution: result.toString()
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        solution: 'Error: Invalid equation'
      }));
    }
  };

  const resetEquationSolver = () => {
    // Reset the state to initial values
    setState({
      equation: '',
      selectedVariable: 'x',
      solution: ''
    });

    // Clear local storage
    localStorage.removeItem('linearEquationsSolverState');
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='calculator'>
      <button onClick={goBack} className="backBtn">Back</button><br></br>
      <h2>Equation Solver</h2>
      <input
        type="text"
        value={state.equation}
        onChange={(e) => setState(prevState => ({ ...prevState, equation: e.target.value }))}
        placeholder="Enter equation (e.g., '5x - 4 = 0')"
      />
      <br />
      <label htmlFor="variables">Solve for:</label>
      <select
        id="variables"
        value={state.selectedVariable}
        onChange={(e) => setState(prevState => ({ ...prevState, selectedVariable: e.target.value }))}
      >
        <option value="x">x</option>
        <option value="y">y</option>
        <option value="z">z</option>
        <option value="s">s</option>
        <option value="t">t</option>
        <option value="p">p</option>
      </select>
      <br />
      <div>
      <button onClick={solveEquation}>Solve</button>
      <button onClick={resetEquationSolver}>Reset</button>
      </div>
      <div>
        <h3>Solution:</h3>
        <p>{state.selectedVariable} = {state.solution}</p>
      </div>
    </div>
  );
};

export default LinearEquationsSolver;
