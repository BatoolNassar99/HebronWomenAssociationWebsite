import React from "react";
import VisitorEvent from "../Components/Show/VisitorEvent";
import Axios from "axios";
import { useState } from "react";
import Navbar from "../Components/common/navbar";


function ShowVisitorEvent() {

    const [EventsList, setEventsList] = useState([]);

    Axios.get('http://localhost:3003/showe').then((respons) => {
        setEventsList(respons.data)
    })

    return (
            <div>
    <Navbar />
                <h1 className=" navbar" >
                    عرض الفعاليّات :
                </h1>
    
                <br />
                <div className="row">
                {EventsList.map((val) => {
            return ( 
                <VisitorEvent key={val.ActivityID}
                info={
                    {
                        ActivityID: val.ActivityID,
                        img: val.ActivityImage,
                        ActivityName: val.ActivityName,
                        Description: val.Description,
                        ActivityTime: val.ActivityTime,
                        ActivityDate: val.ActivityDate,
                        Status: val.Status,
                    }
                }
            />
            )
        })}
                </div>
            </div>
        );
}

export default ShowVisitorEvent;