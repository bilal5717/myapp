import React from "react";
import { Link } from "react-router-dom";
import winterIcon from "../../InnerIcons/winter.png";
import lineChartIcon from "../../InnerIcons/line-chart.png";
import logarithmIcon from "../../InnerIcons/logarithm.png";
import integralIcon from "../../InnerIcons/integral.png";

const Calculus = () => {
  const tools = [
    { path: '/pointSlope', title: 'Slope', icon: winterIcon },
    { path: '/graphs', title: 'Graph Plotting', icon: lineChartIcon },
    { path: '/derivative', title: 'Differentiate', icon: logarithmIcon },
    { path: '/integral', title: 'Integration', icon: integralIcon },
  ];
  const goBack = () => {
    window.history.back();
  };
  return (
    <>
    <button onClick={goBack} className="backBtn">Back</button><br></br>
    
    <div className="main_container">
      
      {tools.map((tool, index) => (
        <div className='box' key={index}>
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

export default Calculus;
