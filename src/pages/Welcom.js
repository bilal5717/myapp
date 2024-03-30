import React from "react";
import logo from "./letsStart.gif";
import { Link} from "react-router-dom";
function Welcom(){

    return(
<>

<div className="wrapper" id="mainApp">
                <div className="LogoText">
                    <img alt="Logo" src={logo} />
                    <h1> Welcom To!</h1>
                    <p>EASY CALCULATION TOOL</p>
                </div>
                <button className="linkWrap style-4">
             <Link to={'/home'} className="letsStart"> letsStart</Link>
             <svg viewBox="0 0 13 20"><polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" /></svg>
                </button>
               
            </div> 
            
      
</>
    )
}
export default Welcom