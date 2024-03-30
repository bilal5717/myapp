import React, { useState } from 'react';

const TileQuantityCalculator = () => {
  const [areaLength, setAreaLength] = useState('');
  const [areaWidth, setAreaWidth] = useState('');
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [quantity, setQuantity] = useState(null);

  const calculateQuantity = () => {
    const area = parseFloat(areaLength) * parseFloat(areaWidth);
    const tileArea = parseFloat(tileLength) * parseFloat(tileWidth);
    const tilesNeeded = Math.ceil(area / tileArea);
    setQuantity(tilesNeeded);
  };

  const resetFields = () => {
    setAreaLength('');
    setAreaWidth('');
    setTileLength('');
    setTileWidth('');
    setQuantity(null);
  };
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h2>Tile Quantity Calculator</h2>
      
      <button onClick={goBack}>Back</button>
      <div>
        <label htmlFor="areaLength">Area Length (in meters): </label>
        <input
          type="number"
          id="areaLength"
          value={areaLength}
          onChange={(e) => setAreaLength(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="areaWidth">Area Width (in meters): </label>
        <input
          type="number"
          id="areaWidth"
          value={areaWidth}
          onChange={(e) => setAreaWidth(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tileLength">Tile Length (in meters): </label>
        <input
          type="number"
          id="tileLength"
          value={tileLength}
          onChange={(e) => setTileLength(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tileWidth">Tile Width (in meters): </label>
        <input
          type="number"
          id="tileWidth"
          value={tileWidth}
          onChange={(e) => setTileWidth(e.target.value)}
        />
      </div>
      <button onClick={calculateQuantity}>Calculate Quantity</button>
      <button onClick={resetFields}>Reset</button>
      {quantity !== null && (
        <div>
          <h3>Tiles Needed:</h3>
          <p>{quantity} tiles</p>
        </div>
      )}
    </div>
  );
};

export default TileQuantityCalculator;
