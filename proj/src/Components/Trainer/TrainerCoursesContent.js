import React from "react";
import {Link} from 'react-router-dom';

function TrainerCoursesContent(props) {

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 " key={props.info.CourseID}>
            <div className="card">
                <div className="card-header">
                    <img style={{maxWidth: '100%'}} src={props.info.img} alt={`صورة ل ${props.info.Name}`} />
                </div>
                <div className="card-body" >
                    <h2>{props.info.Name}</h2>
                    <h6>{props.info.TrainerName}</h6>
                    <h6>{props.info.Description}</h6>
                    <select className="custom-select">
                        <option>اختر أحد الإجراءات</option> 
                        <option> عرض وتعديل الدورة وإضافة صور</option>
                        <option>عرض المنتسبين وتسجيل الحضور</option> 
                       <option>إرسال إشعارات للمنتسبين</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default TrainerCoursesContent;