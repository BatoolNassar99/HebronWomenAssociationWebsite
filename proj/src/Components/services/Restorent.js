import React from "react";
import SliderRestorent from './SliderRestorent';
import SliderR from './SliderR';

function Restorent(){

    return(
    <div> 
    <h5> مطعم: </h5>   
    <SliderR slides={SliderRestorent} />
        </div>
            )
}

export default Restorent;