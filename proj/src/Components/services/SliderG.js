import React, { useState } from 'react';
import SliderGarden from './SliderGarden';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const SliderG = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (<div>
        
        <section className='block slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {SliderGarden.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index} >
                        {index === current && (<img src={slide.image} alt='activites' style={{ maxWidth: '100%' }} className='image' />
                        )}
                    </div>
                );
            })}
        </section>
        </div>

    );
};

export default SliderG;