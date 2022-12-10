import React from "react";
import swal from 'sweetalert';


function Courses(props) {

    return (
        <div className="col-4" key={props.info.CourseID}>
        <div className="card" style={{ maxWidth: '70%', maxHeight: '100%', width: '100%', height: '30vw'}}>
            <div className="card-header">
                <img style={{ maxWidth: '100px', maxHeight: '200px', marginRight: '25%' }} 
                src={`/images/${props.info.img}`} 
                    alt={`صورة ل ${props.info.Name}`} />
                </div>
                <div className="card-body" >
                    <h2>{props.info.Name}</h2>
                    <h6>{props.info.Description}</ h6>
                    <p> {props.info.CourseTime}</p>
                    <p> {props.info.CourseDate}</p>
                    <a href={"/showc/" + props.info.Name} className="btn btn-secondary" >للمزيد من الصور</a>
                    <span> </span>
                    {props.info.Status === 1 ?
                    <button className="btn btn-secondary" type="submit" onClick={() => swal({
                        text: 'تمّ تقديم طلبك للانتساب',
						icon: 'success',

}) }>
                        طلب انتساب</button> : "" }
                </div>
            </div>
        </div>
    );
}

export default Courses;
