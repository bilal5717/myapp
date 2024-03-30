import React from "react";
import { Link } from "react-router-dom";
const Calculator =()=>{
    const goBack = () => {
        window.history.back();
      };
    return(
<>
<button onClick={goBack}>Back</button><br></br>
<div className="main_container">

<div className='box'>
                       <Link to={'/statistics'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/analytics.png")} alt="html" />
                       </div>                       
                       <div class="title">Statistics</div>
                        </Link>
                </div>

                <div className='box'>
                       <Link to={'/calculus'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/calculus.png")} alt="html" />
                       </div>                       
                       <div class="title">Calculus</div>
                        </Link>
                </div>

                <div className='box'>
                       <Link to={'/algebra'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/math.png")} alt="html" />
                       </div>                       
                       <div class="title">Algebra</div>
                        </Link>
                </div>

                <div className='box'>
                       <Link to={'/others'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/menu.png")} alt="html" />
                       </div>                       
                       <div class="title">Others</div>
                        </Link>
                </div>
              
          </div>
</>
    )
}
export default Calculator