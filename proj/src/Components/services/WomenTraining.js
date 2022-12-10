import React from "react";
import SliderWomenTraining from './SliderWomenTraining';
import SliderW from './SliderW';


function WomenTraining(){

    return(
    <div> 
        <h5>قاعة رياضية خاصة للنساء:  </ h5>
        <SliderW slides={SliderWomenTraining} />
        </div>
        )
}

export default WomenTraining;