import React from "react";
import { Link } from 'react-router-dom';

function PicturesP() {

    return (
        <div>
            <br />
            <div >
                <Link to="/store">
                    <img src="./img/goback.png" width="75px" height="40px" alt="goback" />
                </Link>
            </ div>

            <br />
            <br />

            <div>
                <h5 className=" navbar" >
                    المزيد من صور المنتج
                </h5>
            </div>
        </div>
    );
}

export default PicturesP;