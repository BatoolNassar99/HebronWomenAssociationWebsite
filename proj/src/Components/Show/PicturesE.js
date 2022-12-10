import React, {useEffect, Component }  from "react";
import { Link, useParams } from 'react-router-dom';
import Axios from "axios";
import { useState } from "react";
import PicturesEContent from "./PicturesEContent";

function PicturesE() {

    const [ActivityImages, setActivityImages] = useState([]);
    const [ActivityID, setActivityID] = useState(0);
    const [ActivityImage, setActivityImage] = useState('');
    const [ActivityName, setActivityName] = useState('');

    


    const fetchData = () => {
        setActivityID(localStorage.getItem('ActivityIDImages'));

        console.log(ActivityID)
         Axios.put(`http://localhost:3003/fetchdataActivityImages`, {
			AcytivityID:localStorage.getItem('ActivityIDImages'),
    }).then((result) => {
        console.log(result)
        const x = result.data[0];
            setActivityName(x.ActivityName);
        });
    };

    useEffect(
        () => {
    fetchData();
},
[ActivityID]
);
    
    Axios.put(`http://localhost:3003/showActivityImages`,  {
        ActivityName: ActivityName,
})
    .then((respons) => {
        setActivityImages(respons.data)
        const x = respons.data[0];
            setActivityName(x.ActivityName);
            setActivityImage(x.ActivityImage);
    })


    
    return (
        <div className="row">
            <br />
           
            <br />
            <br />
            {ActivityImages.map((val) => {
        return ( 
            <PicturesEContent key={val.ID}
            info={
                {
                    ID: val.ID,
                    ActivityName: val.ActivityName,
                    img: val.ActivityImage,
                }
            }/>            
        )
    })}
        </div>

    );
    }

export default PicturesE;

