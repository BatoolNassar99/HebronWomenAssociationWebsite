
import React from "react";

function PicturesEContent(props) {


    return (
        <div key={props.info.ID}>
                <img src={`/images/${props.info.img}`}
                    alt={props.info.ActivityName}
                    style={{ maxWidth: '100%' }} /> 
                </div>
    );
    }

export default PicturesEContent;

