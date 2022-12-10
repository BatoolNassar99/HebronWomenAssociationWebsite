import React from 'react';
import SliderPalestinianTradition from './SliderPalestinianTradition';
import SliderP from './SliderP';


function PalestinianTradition(){

    return(
    <div>
        <h5>  قسم التراث الفلسطيني:  </ h5>
        <SliderP slides={SliderPalestinianTradition} />
        </div>
        )
}

export default PalestinianTradition;