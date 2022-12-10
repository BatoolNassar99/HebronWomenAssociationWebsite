import React from "react";

function Events(props) {

            return (
        <div className="col-4" key={props.info.ActivityID}>
            <div className="card" style={{ maxWidth: '70%', maxHeight: '100%', width: '100%', height: '30vw'}}>
                <div className="card-header">
                    <img style={{ maxWidth: '100px', maxHeight: '200px', marginRight: '25%' }} 
                    src={`/images/${props.info.img}`} 
                    alt={`صورة لفعالية ${props.info.ActivityName}`} />
                </div>
                <div className="card-body" >
                    <h3>{props.info.ActivityName}</h3>
                    <p> {props.info.Description}</p>
                    <p> {props.info.ActivityTime}</p>
                    <p> {props.info.ActivityDate}</p>
                    <a href={`/showeventimages`} className="btn btn-secondary" >للمزيد من الصور</a>
                    <span> </span>
                    {props.info.Status === 1 ?
                    <button className="btn btn-secondary" type="submit" onClick={() => alert("تم تقديم طلبك للانتساب ") }>
                        طلب انتساب</button> : "" }
                </div>
            </div>
        </div>
        );
}

export default Events;