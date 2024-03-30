import React from "react";
import { Link } from "react-router-dom";
import linearIcon from '../../InnerIcons/linear.png';

const Others = () => {
  const tools = [
    { path: '/age', title: 'Age Calculator', icon: linearIcon },
    { path: '/percentage', title: 'Percentage Calculator', icon: linearIcon },
    { path: '/bmi', title: 'BMI Calculator', icon: linearIcon },

  ];

  return (
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
  );
};

export default Others;
