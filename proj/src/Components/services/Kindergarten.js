import React from 'react';
import SliderKindergarten from './SliderKindergarten';
import SliderK from './SliderK';

const Kindergarten = ({ slides }) => {

    return (
    <div>
        <h5> روضة أطفال:</h5>
        <SliderK slides={SliderKindergarten} />
        </div>

    );
};

export default Kindergarten;