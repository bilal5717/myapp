
import React from "react";
import { Link } from "react-router-dom";
const Estimators =()=>{
    const goBack = () => {
        window.history.back();
      };
    return(
<>
<button onClick={goBack}>Back</button><br></br>
<div className="main_container">

                <div className='box'>
                       <Link to={'/steelWeight'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/steel.png")} alt="html" />
                       </div>                       
                       <div class="title">Steel Weight</div>
                        </Link>
                </div>

                <div className='box'>
                       <Link to={'/tileCalculator'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/tiles.png")} alt="html" />
                       </div>                       
                       <div class="title">Tile Quantity</div>
                        </Link>
                </div>
                <div className='box'>
                       <Link to={'/paintQuantity'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/paint.png")} alt="html" />
                       </div>                       
                       <div class="title">Paint Quantity</div>
                        </Link>
                </div>

                

               
              
          </div>
</>
    )
}
export default Estimators