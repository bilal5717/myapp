import React from "react";
import calculusImage from '../InnerIcons/calculus.jpg';
import gebracheat from '../InnerIcons/algebracheat.jpg';
import slope from '../InnerIcons/slopecheat.jpg';
const CheatSheat =()=>{

    return(
<>
        <div className="calculator">
                <img src={calculusImage} alt="calculus"/>
        </div>
        <div className="calculator">
                <img src={gebracheat} alt="calculus"/>
        </div>
        <div className="calculator">
                <img src={slope} alt="calculus"/>
        </div>
</>
    )
}
export default CheatSheat