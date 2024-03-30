import React from "react";
import { Link } from "react-router-dom";
import linearIcon from '../../InnerIcons/linear.png';
import quardraticIcon from '../../InnerIcons/quardratic.png';
import LcmIcon  from '../../InnerIcons/circle.png';
import factorIcon from '../../InnerIcons/factors.png';
import SolveIcon from '../../InnerIcons/solve.png';
import SystemIcon from '../../InnerIcons/system.png'; 

const Algebra = () => {

  const tools = [
    { path: '/linear', title: 'Basic (Linear)', icon: linearIcon },
    { path: '/quadraticequation', title: 'Quadratic Equations', icon: quardraticIcon },
    { path: '/Lcm', title: 'LCM & GCF', icon: LcmIcon },
    { path: '/primeFactor', title: 'Prime Factorization', icon: factorIcon },
    { path: '/SolveFor', title: 'Solve for', icon: SolveIcon },
    { path: '/simplify', title: 'System of Equations', icon: SystemIcon },
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

export default Algebra;
