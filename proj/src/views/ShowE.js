import React, {useState} from "react";
import Events from "../Components/Show/Events";
import Axios from "axios";
import Navbar from "../Components/common/navbar";

function ShowE() {

    const [ActivityList, setActivityList] = useState([]);
    
    Axios.get('http://localhost:3003/showe')
    .then((respons) => {
        setActivityList(respons.data)
    })

    return (
        <div>
<Navbar />
            <h1 className=" navbar" >
                عرض الفعاليّات :
            </h1>

            <br />
            <div className="row">
            {ActivityList.map((val) => {
        return ( 
            <Events key={val.ActivityID}
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

export default ShowE;