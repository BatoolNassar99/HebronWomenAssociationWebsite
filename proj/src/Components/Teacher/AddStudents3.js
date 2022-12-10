import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Axios from 'axios';
import AppNavbarAdmin from '../common/navbar-admin';
import swal from 'sweetalert';


const AddStudents3  = () => {

    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [sections, setSections] = useState([]);
    const [SectionSelected, setSectionSelected] = useState('');
    const [SemesterSelected, setSemesterSelected] = useState('');



    useEffect(() => {
        if(students){
        Axios
            .get("http://localhost:3003/studentsnotinsections")
            .then(result => setData(result.data));
     }}, []);


    useEffect(() => {
        Axios
            .get("http://localhost:3003/getsections")
            .then(result => setSections(result.data));
    }, []);


    console.log(students)

    const addOrRemove = (name) => {
        const newStudents = [...students];
        const index = newStudents.indexOf(name);
        if (index === -1) {
            newStudents.push(name);
        } else {
            newStudents.splice(index, 1);
        }
        setStudents(newStudents);
    }
    console.log(students)

    function refreshPage() {
        window. location. reload(false); 
        } 


        
    function SectionsSelector({ sections }) {
        var x=' ' ;
        var y=' ' ;

    if (students)
      {x= <option value="" disabled> اختر الفصل الدراسي</option> }
    if (students)
      {y= <option value="" disabled>اختر الصف والشعبة </option> }

        return (
            <div>
                <select
                className="custom-select"
                placeholder="الفصل الدراسي"
                onChange={(e) => setSemesterSelected(e.target.value)}
                value={SemesterSelected}
            >
                {x}
                {sections.map((item, id) => (
                    <option key={id} value={(item.Semester)}>
                        {(item.Semester)}
                    </option>
                ))}
            </select>

            <br /> <br />

            <select
                className="custom-select"
                placeholder="الصف"
                onChange={(e) => setSemesterSelected(e.target.value)}
                value={SemesterSelected}
            >
                {x}
                {sections.map((item, id) => (
                    <option key={id} value={(item.SectionName + ' ' + item.SectionType)}>
                        {(item.SectionName + ' ' + item.SectionType)}
                    </option>
                ))}
            </select>

            </div>
        );
    }


           
    

    console.log(SectionSelected)


    function AddStudents() {  
        if(SectionSelected != "" && students != []){
        Axios.post(`http://localhost:3003/addStudentToSection`, {
          SectionSelected: SectionSelected,
          students: students,
        }).then((result) =>{
             console.log("success")
             swal({
                text: "تمّ إضافة الطالب/الطلاب إلى الشعبة",
                icon:"success",
            })
            setStudents([])
            })
    }

    }

    return (
        <div>
          <AppNavbarAdmin />
            <table className="table" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">الاسم</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, id) => {
                        return <tr key={id}>
                            <td>{item.FullName}</td>
                            <td><input type="checkbox" onClick={() => addOrRemove(item.SSN)} /></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <br />
            <h4> اختر الصف </h4>
            <SectionsSelector sections={sections} />
            <br />
            <br />
            <button onClick={AddStudents}>إضافة</button>
            <br />
            <br />
            <button onClick={refreshPage}>Click to reload!</button>

        </div>
    )
}


export default AddStudents3;