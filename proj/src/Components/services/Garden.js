import React from 'react';
import SliderG from './SliderG';
import SliderGarden from './SliderGarden';

const Garden = ({ slides }) => {
    
    return (<div>
        <h5> منتزه وحديقة:</h5>
        <SliderG slides={SliderGarden} />
        </div>

    );
};

export default Garden;