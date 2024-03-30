import React from "react";
import { Link } from "react-router-dom";
const Converters =()=>{

    return(
<>
       
<div className="main_container">

              <div className='box'>
                       <Link to={'/area'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/area.png")} alt="html" />
                       </div>                       
                       <div class="title">Area</div>
                        </Link>
                </div>

                <div className='box'>
                       <Link to={'/length'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/length.png")} alt="html" />
                       </div>                       
                       <div class="title">Length</div>
                        </Link>
                </div>
                <div className='box'>
                       <Link to={'/temperature'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/temperature.png")} alt="html" />
                       </div>                       
                       <div class="title">Temperature</div>
                        </Link>
                </div>
                <div className='box'>
                       <Link to={'/volume'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/cylinder.png")} alt="html" />
                       </div>                       
                       <div class="title">Volume</div>
                        </Link>
                </div>
                <div className='box'>
                       <Link to={'/weight'} className="tools">
                       <div class="image">
          <img src={require("../InnerIcons/weight.png")} alt="html" />
                       </div>                       
                       <div class="title">Weight</div>
                        </Link>
                </div>
              
          </div>
</>
    )
}
export default Converters