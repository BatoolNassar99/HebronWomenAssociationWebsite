import React, {useState} from 'react';
import Axios from "axios";
import TrainerCoursesContent from './TrainerCoursesContent';


function TrainerCourses() {

    const [CourseList, setCourseList] = useState([]);

    Axios.get('http://localhost:3003/showc').then((respons) => {
        setCourseList(respons.data)
    })

    return (
        <div className="container row">
            {CourseList.map((val) => {
        return (
            <TrainerCoursesContent key={val.CourseID}
            info={
                {
                    CourseID: val.CourseID,
                    img: '/images/02.jpg',
                    TrainerName: val.FullName,
                    Name: val.Name,
                    Description: val.Description,
                }
            }
        />
        )
    })}
        </div>
    );
}

export default TrainerCourses;

