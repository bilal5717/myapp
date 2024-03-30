import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

// Import individual icons
import calculatorIcon from '../Icons/calculator.png';
import recycleIcon from '../Icons/recycle.png';
import balanceIcon from '../Icons/balance.png';
import documentsIcon from '../Icons/documents.png';

const Home = () => {
  // Define an array of box items
  const boxItems = [
    { path: '/calculators', title: 'Calculators', icon: calculatorIcon },
    { path: '/converters', title: 'Converters', icon: recycleIcon },
    { path: '/estimators', title: 'Estimators', icon: balanceIcon },
    { path: '/cheatSheat', title: 'Cheat Sheet', icon: documentsIcon },
  ];

  return (
    <>
   
    
    <div className="main_container">
      {/* Map over the boxItems array to generate JSX for each box */}
      {boxItems.map((item, index) => (
        <div className='box' key={index}>
          <Link to={item.path} className="tools">
            <div className="image">
              <img src={item.icon} alt={item.title} />
            </div>
            <div className="title">{item.title}</div>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};

export default Home;
