import React, { useState } from 'react';

const LinearEquationSolver = () => {

    const [noOfEquations, setNoOfEquations] = useState(3);
    const [equations, setEquations] = useState(Array.from({ length: noOfEquations }, () => Array.from({ length: noOfEquations + 1 }, () => 0)));
    const [solution, setSolution] = useState(Array.from({ length: noOfEquations }, () => 0));

    function generateInitialEquations(numEquations) {
        return Array.from({ length: numEquations }, () => Array.from({ length: numEquations + 1 }, () => 0));
    }

    const handleNoOfEquationsChange = (event) => {
        const newValue = parseInt(event.target.value);
        setNoOfEquations(newValue);
        setEquations(generateInitialEquations(newValue));
        setSolution(Array.from({ length: newValue }, () => 0)); // Reset solution array
    };

    const handleEquationInputChange = (rowIndex, colIndex, event) => {
        const newEquations = [...equations];
        newEquations[rowIndex][colIndex] = parseFloat(event.target.value);
        setEquations(newEquations);
    };

    const solveEquations = () => {
        const A = equations.map(row => [...row.slice(0, noOfEquations)]);
        const B = equations.map(row => row[noOfEquations]);

        partial_pivot(A, B, noOfEquations);
        back_substitute(A, B, noOfEquations);

        setSolution(B);
    };

    const resetEquations = () => {
        setEquations(generateInitialEquations(noOfEquations));
        setSolution(Array.from({ length: noOfEquations }, () => 0));
    };

    const partial_pivot = (A, B, n) => {
        for (let i = 0; i < n; i++) {
            let pivotRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(A[j][i]) > Math.abs(A[pivotRow][i])) {
                    pivotRow = j;
                }
            }
            if (pivotRow !== i) {
                [A[i], A[pivotRow]] = [A[pivotRow], A[i]];
                [B[i], B[pivotRow]] = [B[pivotRow], B[i]];
            }
            for (let j = i + 1; j < n; j++) {
                const factor = A[j][i] / A[i][i];
                for (let k = i; k <= n; k++) {
                    A[j][k] -= factor * A[i][k];
                }
                B[j] -= factor * B[i];
            }
        }
    };

    const back_substitute = (A, B, n) => {
        for (let i = n - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += A[i][j] * B[j];
            }
            B[i] = (B[i] - sum) / A[i][i];
        }
    };
    const goBack = () => {
        window.history.back();
      };
    return (
        <div className='calculator'>
            <button onClick={goBack} className="backBtn">Back</button><br></br>
            <label htmlFor="noOfEquationsInput">Number of Equations:</label>
            <input type="number" id="noOfEquationsInput" value={noOfEquations} onChange={handleNoOfEquationsChange} />
            
            <table>
                <tbody>
                    {equations.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((col, colIndex) => (
                                <td key={colIndex}>
                                    <label>
                                        <span>{colIndex === noOfEquations ? '=' : `x${colIndex + 1}:`}</span>
                                        <input
                                            type="number"
                                            value={col}
                                            onChange={(event) => handleEquationInputChange(rowIndex, colIndex, event)}
                                        />
                                    </label>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <button onClick={solveEquations}>Solve</button>
            <button onClick={resetEquations}>Reset</button>
            </div>
            <div>
                <h2>Solution:</h2>
                <ul>
                    {solution.map((sol, index) => (
                        <li key={index}>x{index + 1}: {sol}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LinearEquationSolver;
