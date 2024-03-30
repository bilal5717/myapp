import React, { useEffect, useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

// Define the glc function
function glc(numbers) {
    if (numbers.length < 2) {
        return "At least two numbers are required.";
    }

    // Function to calculate GCF
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

    // Function to calculate LCM
    const lcm = (a, b) => (a * b) / gcd(a, b);

    // Calculate GCF and LCM iteratively
    let gcfResult = numbers[0];
    let lcmResult = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        gcfResult = gcd(gcfResult, numbers[i]);
        lcmResult = lcm(lcmResult, numbers[i]);
    }

    return {
        input: numbers.join(', '),
        output: {
            gcf: gcfResult,
            lcm: lcmResult
        }
    };
}

function GLCCalculator() {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [isValidInput, setIsValidInput] = useState(false);
    const [storedData, setStoredData] = useState([]);
    const fileInputRef = useRef(null); // Ref for file input element

    useEffect(() => {
        // Retrieve stored data from local storage when component mounts
        const storedDataString = localStorage.getItem('gcf_lcm_storedData');
        if (storedDataString) {
            const parsedData = JSON.parse(storedDataString);
            setStoredData(parsedData);
        }
    }, []);

    const validateInput = (input) => {
        const numbers = input.replace(/\s/g, '').split(',').map(num => parseInt(num.trim()));
        const isValid = numbers.length >= 2 && numbers.every(num => !isNaN(num));
        setIsValidInput(isValid);
    };

    const calculate = () => {
        const numbers = inputValue.replace(/\s/g, '').split(',').map(num => parseInt(num.trim()));
        const result = glc(numbers);
        const output = `Input: [${result.input}]\nGCF: ${result.output.gcf}\nLCM: ${result.output.lcm}`;
        setOutputValue(output);

        // Save input, output data to local storage
        const newEntry = {
            input: result.input,
            output: output
        };
        const newData = [...storedData, newEntry];
        localStorage.setItem('gcf_lcm_storedData', JSON.stringify(newData));
        setStoredData(newData);
    };

    const reset = () => {
        setInputValue('');
        setOutputValue('');
        setIsValidInput(false);
        localStorage.removeItem('gcf_lcm_storedData');
        setStoredData([]);
        handleResetFileInput(); // Reset the file input
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setInputValue(input);
        validateInput(input);
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
            // Handle invalid file format error
            console.error('Invalid file format. Please upload a PNG, JPEG, or JPG image.');
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
            const preprocessedText = text.replace(/[^\d,\s]/g, '');
            setInputValue(preprocessedText);
            validateInput(preprocessedText);
        }).catch((error) => {
            console.error('OCR Error:', error);
        });
    };

    // Function to reset the file input and clear its selection
    const handleResetFileInput = () => {
        fileInputRef.current.value = ''; // Clear the file input value
    };

    return (

        <div className='calculator'>
            <button onClick={() => window.history.back()}>Go Back</button>
            <h3>LCM & GCM Calculator</h3>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter numbers separated by commas"
            />
            <input ref={fileInputRef} type="file" accept=".png,.jpeg,.jpg" onChange={handleFileUpload} />
            <div>
                <button onClick={calculate} disabled={!isValidInput}>Calculate</button>
                <button onClick={reset}>Reset</button>
            </div>
            <div>
                <textarea
                    value={outputValue}
                    rows="10"
                    readOnly
                />
            </div>
        </div>
    );
}

export default GLCCalculator;
