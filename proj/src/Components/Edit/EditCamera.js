///هاد بس حفظته عندي هون مش لهاي الصفحة
import React, { useState, useEffect, Component } from "react";
import EditCourseTable from "./EditCourseTable";
import { TextField } from '@mui/material';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import AppNavbarAdmin from "../common/navbar-admin";

function EditCourse() {

   // var   {id} = useParams();

    const [CourseID, setCourseID] = useState('');
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [TeacherSSN, setTeacherSSN] = useState('');
    const [coaches, setCoaches] = useState([]);
    const [images, setimages] = useState([]);
    const [response, setresponse]= useState("")

    const [data, setData] = useState([]);
    //const { id } = useParams(id);


	const Edit = async (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:3003/editcourse`, {
            CourseID: CourseID,
            Name: Name,
            Description: Description,
            TeacherSSN: TeacherSSN,
        }).then(() => {
            alert("success")
        })
    }

    useEffect(() => {
        Axios
            .get("http://localhost:3003/getCoachesNames")
            .then(result => setCoaches(result.data));
      }, []);

     
 
    const fetchData = () => {
        setCourseID(localStorage.getItem('CourseID'));
        console.log(CourseID)
         Axios.put(`http://localhost:3003/fetchdata`, {
			CourseID:localStorage.getItem('CourseID'),
    }).then((result) => {
        console.log(result)
        const x = result.data[0];
            setName(x.Name);
            setDescription(x.Description);
            setTeacherSSN(x.TeacherSSN);
        });
    };
    useEffect(
        () => {
    fetchData();
},
[CourseID]
);
    
function CoachSelector({ coaches }) {
     
    return (
        <select
            className="custom-select"
            onChange={(e) => setTeacherSSN(e.target.value)}
            value={TeacherSSN}
        >
            {coaches.map((item, id) => (
                <option key={id} value={(item.SSN)}>
                    {(item.FullName)}
                </option>
            ))}
        </select>
    );
  }
    
    return (
        <div>
         <AppNavbarAdmin />
                    <div className="add">

                        <label><b>اسم الدورة:</b></label>

                        <br />
                        <input type="text" className="input" value={Name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }} />
                        <br />

                        <label><b>اسم المدرب</b></label>
            <CoachSelector coaches={coaches} />


                    
                        <br />
                        <label><b>تفاصيل الدورة :</b></label>
                        <br />
                        <TextField
                            className="input"
                            value={Description}
                            color="secondary"
                            variant="outlined"
                            multiline
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }} />
                        <br /> <br />

                        <h4>{response}</h4>
            <br />
            
           
            <br />

                        <button className="addbtn" onClick={Edit}
                        >  تعديل</button>
                    </div>
                
        </div>
    );
}

export default EditCourse;