import React from "react";
import { Link } from "react-router-dom";
import meanIcon from '../../InnerIcons/mean.png';
import geometricIcon from '../../InnerIcons/geometry.png';
import quardraIcon from '../../InnerIcons/quardratmean.png';
import averageIcon from '../../InnerIcons/average.png';
import medianIcon from '../../InnerIcons/median.png';
import modeIcon from '../../InnerIcons/mode.png';
import deviationIcon from '../../InnerIcons/flexibility.png';
import varienceIcon from '../../InnerIcons/varience.png';

const Statistics = () => {
  const tools = [
    { path: '/mean', title: 'Mean', icon: meanIcon },
    { path: '/geometricMean', title: 'Geometric Mean', icon: geometricIcon },
    { path: '/quadraticmean', title: 'Quadratic Mean' , icon: quardraIcon},
    { path: '/average', title: 'Average' , icon: averageIcon},
    { path: '/median', title: 'Median' , icon: medianIcon},
    { path: '/mode', title: 'Mode' , icon: modeIcon},
    { path: '/deviation', title: 'Standard Deviation' , icon: deviationIcon},
    { path: '/variance', title: 'Variance' , icon: varienceIcon},
  ];
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
    <button onClick={goBack} className="backBtn">Back</button><br></br>
   
    <div className="main_container">
      {tools.map((tool, index) => (
        <div className="box" key={index}>
          <Link to={tool.path} className="tools">
            <div className="image">
              <img src={tool.icon} alt={tool.title} />
            </div>
            <div className="title">{tool.title}</div>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};

export default Statistics;
