import React, { useState } from 'react';

const PaintQuantityCalculator = () => {
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [paintQuantity, setPaintQuantity] = useState('');
  const [paintPrice, setPaintPrice] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculateTotalCost = () => {
    const area = parseFloat(wallLength) * parseFloat(wallHeight);
    const totalPaintCost = parseFloat(paintQuantity) * parseFloat(paintPrice);
    setTotalCost((totalPaintCost / 1) * (area / 350)); // Assuming 1 gallon of paint covers 350 square feet
  };

  const resetFields = () => {
    setWallLength('');
    setWallHeight('');
    setPaintQuantity('');
    setPaintPrice('');
    setTotalCost('');
  };
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h2>Paint Quantity Calculator</h2>
      <button onClick={goBack}>Back</button>
      <div>
        <label htmlFor="wallLength">Wall Length (in feet): </label>
        <input
          type="number"
          id="wallLength"
          value={wallLength}
          onChange={(e) => setWallLength(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="wallHeight">Wall Height (in feet): </label>
        <input
          type="number"
          id="wallHeight"
          value={wallHeight}
          onChange={(e) => setWallHeight(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="paintQuantity">Paint Quantity (in gallons): </label>
        <input
          type="number"
          id="paintQuantity"
          value={paintQuantity}
          onChange={(e) => setPaintQuantity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="paintPrice">Paint Price per Gallon: </label>
        <input
          type="number"
          id="paintPrice"
          value={paintPrice}
          onChange={(e) => setPaintPrice(e.target.value)}
        />
      </div>
      <button onClick={calculateTotalCost}>Calculate Total Cost</button>
      <button onClick={resetFields}>Reset</button>
      {totalCost && (
        <div>
          <h3>Total Cost:</h3>
          <p>${totalCost}</p>
        </div>
      )}
    </div>
  );
};

export default PaintQuantityCalculator;
