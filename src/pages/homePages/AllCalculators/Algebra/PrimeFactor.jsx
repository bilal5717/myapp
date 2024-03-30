import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';

function PrimeFactors() {
    const [inputValue, setInputValue] = useState('');
    const [primeFactors, setPrimeFactors] = useState([]);
    const [isPrime, setIsPrime] = useState(false);
    const [option, setOption] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [outputVisible, setOutputVisible] = useState(false);
    const fileInputRef = useRef(null); // Ref for file input element

    useEffect(() => {
        // Save data to local storage when any state changes
        const dataToStore = [{ inputValue, primeFactors, isPrime, option }];
        localStorage.setItem('prime_factors_data', JSON.stringify(dataToStore));
    }, [inputValue, primeFactors, isPrime, option]);
    

    const primes = [2];

    const go = () => {
        setOption(true);
        if (inputValue.trim() === '') {
            setErrorMessage('Please enter an integer value.');
            setOutputVisible(false);
            return;
        }
        const numbers = inputValue.replace(/\s/g, '').split(',');
        if (numbers.length > 1) {
            setErrorMessage('Please enter only one integer value.');
            setOutputVisible(false);
            return;
        }
        const query = parseInt(inputValue);
        if (!isNaN(query) && Number.isInteger(query)) {
            setPrimeFactors([1]);
            setIsPrime(false);
            factor(query, 0);
            setErrorMessage('');
            setOutputVisible(true);
        } else {
            setErrorMessage('Please enter a valid integer.');
            setOutputVisible(false);
        }
    };

    const factor = (x, p) => {
        if (p + 1 > primes.length || x === 1) {
            if (x !== 1) {
                continueToRoot(x, primes[p - 1]);
            }
            setIsPrime(primeFactors.length === 1);
        } else {
            if (x % primes[p] === 0) {
                setPrimeFactors(prevFactors => [...prevFactors, primes[p]]);
                factor(x / primes[p], p);
            } else {
                factor(x, p + 1);
            }
        }
    };

    const continueToRoot = (x, q) => {
        if (q < Math.sqrt(x)) {
            if (x % q === 0) {
                setPrimeFactors(prevFactors => [...prevFactors, q]);
                continueToRoot(x / q, q);
            } else {
                continueToRoot(x, q + 1);
            }
        } else if (q === Math.sqrt(x)) {
            setPrimeFactors(prevFactors => [...prevFactors, q, q]);
        } else {
            setPrimeFactors(prevFactors => [...prevFactors, x]);
        }
    };

    const primeFactorizationString = () => {
        const factorsSimplified = [];
        let lastFactor = 0;
        let frequency = 1;

        for (let i = 0; i < primeFactors.length; i++) {
            if (primeFactors[i] === lastFactor) {
                frequency++;
                if (i === primeFactors.length - 1) {
                    if (frequency > 1) factorsSimplified.push(`${primeFactors[i]}<sup>${frequency}</sup>`);
                }
            } else {
                if (frequency > 1) factorsSimplified.push(`${primeFactors[i - 1]}<sup>${frequency}</sup>`);
                else if (i > 0) factorsSimplified.push(primeFactors[i - 1]);
                frequency = 1;
                lastFactor = primeFactors[i];
                if (i === primeFactors.length - 1) factorsSimplified.push(primeFactors[i]);
            }
        }

        return `${inputValue} = ${factorsSimplified.join(' × ')}`;
    };

    const reset = () => {
        setInputValue('');
        setPrimeFactors([]);
        setIsPrime(false);
        setOption(false);
        setErrorMessage('');
        setOutputVisible(false);
        handleResetFileInput(); // Reset the file input
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
            // Preprocess the text: remove any unwanted characters or symbols
            const preprocessedText = text.replace(/[^\d]/g, '');
            setInputValue(preprocessedText);
            go(); // Automatically find prime factors after extracting text from image
        }).catch((error) => {
            console.error('OCR Error:', error);
            setErrorMessage('Error occurred during OCR. Please try again.');
        });
    };

    // Function to reset the file input and clear its selection
    const handleResetFileInput = () => {
        fileInputRef.current.value = ''; // Clear the file input value
    };

    return (
        <div className='calculator'>
            <button onClick={() => window.history.back()}>Go Back</button>
            <h3>Prime Factors</h3>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="well">
                <form name="form" className="form-horizontal">
                    <div className="control-group info">
                        <div className="input-append">
                            <input
                                className="span6"
                                name="input"
                                type="text"
                                placeholder="insert integer value"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                autoFocus
                            />
                            <input ref={fileInputRef} type="file" accept=".png,.jpeg,.jpg" onChange={handleFileUpload} />
                         <div>
                            <button className="btn btn-success" type="button" onClick={go}>Find Prime Factors!</button>
                            <button className="btn btn-danger" type="button" onClick={reset}>Reset</button>
                         </div>
                        </div>
                    </div>
                    {outputVisible && (
                        <div className="output">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr className="info">
                                        <td><b>Query: </b></td>
                                        <td className="lead"><b>{inputValue}</b></td>
                                    </tr>
                                    <tr className="info">
                                        <td><b>Prime Factors: </b></td>
                                        <td className="lead"><b>{primeFactors.join(', ')}</b></td>
                                    </tr>
                                    <tr className="warning">
                                        <td><b>Prime Factorization: </b></td>
                                        <td className="lead" dangerouslySetInnerHTML={{ __html: primeFactorizationString() }} />
                                    </tr>
                                    <tr id="prime?box" className={isPrime ? "success" : "error"}>
                                        <td><b>Is it a Prime Number?: </b></td>
                                        <td className="lead"><b>{isPrime ? "YES!" : "Nope."}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PrimeFactors;
