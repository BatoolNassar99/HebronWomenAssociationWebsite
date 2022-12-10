import React, { Component } from "react";
import { Link } from 'react-router-dom';


class PicturesC extends Component {

    render() {

        return (
            <div>
                <br />
                <div >
                    <Link to="/showc"> <img src="./img/goback.png" width="75px" height="40px" alt="goback" />
                    </Link>
                </ div>

                <br />
                <br />

                <div>
                    <h5 className=" navbar" >
                        المزيد من صور الدورة
                    </h5>
                </div>
            </div>
        );
    }
}

export default PicturesC;