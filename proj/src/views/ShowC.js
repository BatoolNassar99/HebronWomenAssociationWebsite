import React from "react";
import Courses from "../Components/Show/Courses";
import Axios from "axios";
import { useState } from "react";
import { Navbar } from "react-bootstrap";
import Navbar2 from "../Components/common/navbar2.js";
function ShowC() {

    const [CourseList, setCourseList] = useState([]);

    Axios.get('http://localhost:3003/showc').then((respons) => {
        setCourseList(respons.data)
    })

    return (
<div>     
            <Navbar2 />
            <h1 className=" navbar" >
عرض الدورات:            </h1>
            <br />
            <div className="row">
            {CourseList.map((val) => {
        return (
            <Courses key={val.CourseID}
            info={
                {
                    CourseID: val.CourseID,
                    img: val.CourseImage,
                    TeacherSSN: val.TeacherSSN,
                    Name: val.Name,
                    Description: val.Description,
                    CourseTime: val.CourseTime,
                    CourseDate: val.CourseDate,
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

export default ShowC;