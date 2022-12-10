import React, { useEffect } from "react";
import { TextField } from '@mui/material';
import Axios from "axios";
import { useState } from "react"
import DatePicker from "react-datepicker";
import { DatePickerComponent, datepickercomponent } from '@syncfusion/ej2-react-calendars';
import AppNavbarAdmin from "../common/navbar-admin";
import './teacher.css'

import swal from 'sweetalert';


function AddSection() {

  const [sections, setSections] = useState([]); 
  const [teachers, setTeachers] = useState([]); 
  const [SectionName, setSectionName] = useState("تمهيدي");
  const [TeacherName, setTeacherName] = useState("آثار عرباس");
  const [Type, setType]= useState("");
  const [Semester, setSemester] = useState("");
  const [Year, setYear]= useState("");
 // const [Sem, setSem]= useState("");


  var yearArray = [];
for (var i = 2015; i < 2030; i++) {
    yearArray.push(i);
}

var semArray = [];
    semArray.push("الفصل الأول");
    semArray.push("الفصل الثاني");


    // Load sections on mount
  useEffect(() => {
    Axios.get(`http://localhost:3003/getSectionsName`,).then((result) => setSections(result.data));
    console.log(sections);
  }, []);
  // Load teachers 
  useEffect(() => {
    Axios.get(`http://localhost:3003/getTeachersNames`,).then((result) => setTeachers(result.data));
    console.log(teachers);
  }, []);
  // add section type based on section and teacher
 {/*
  useEffect(() => {
    if(Type != ""){
    Axios.post(`http://localhost:3003/addSectionType`, {
      Type: Type,
    }).then((result) => console.log("Section Type Added"))
  }}, [Type]);
*/}

  function NameSelector({ sections }) {
    return (
      <div>
      <h4> اختر الصف </h4>
      <select
        className="custom-select"
        onChange={(e) => setSectionName(e.target.value)}
      >
        {sections.map((item, id) => (
          <option key={id} value={item.SectionName}>
            {item.SectionName}
          </option>
        ))}
      </select>
      </div>
    );
  }
  
  function TeacherSelector({ teachers }) {
    return (
      <div>
      <select
        className="custom-select"
        placeholder="اسم المعلم"
        onChange={(e) => setTeacherName(e.target.value)}
      >
        {teachers.map((item, id) => (
          <option key={id} value={item.FullName}>
            {item.FullName}
          </option>
        ))}

      </select>
      </div>
    );
  }


  function AddSections() { 
    swal({
      text: "تمّ إضافة الشعبة بنجاح",
      icon:"success",
  }) 
      if(Type != "" && Semester != ""){
      Axios.post(`http://localhost:3003/addSection`, {
        Semester: Semester,
        TeacherName: TeacherName,
        SectionName: SectionName,
        Type: Type,
      }).then((result) => swal({
        text: "تمّ إضافة الشعبة بنجاح",
        icpn:"success",
    }))
  }
  }

  var x = '';
  {x= <option value="" disabled> اختر العام الدراسي</option> }

  return (
      <div className="row">
       <AppNavbarAdmin />
       <h2 className="head2">إضافة شعبة جديدة</h2>
       <div className="sections">
         <h4> اختر العام الدراسي </h4>
         <select
        className="custom-select"
        placeholder= "العام الدراسي"
        onChange={(e) => setYear(e.target.value)}
      >
        {x}
        {yearArray.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </select>
        
        <h4> اختر الفصل الدراسي </h4>
         <select
        className="custom-select"
        onChange={(e) => setSemester(Year.concat(e.target.value))} 
      >
        {semArray.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </select>
        
        <NameSelector sections={sections} />
        
        <h4> اختر اسم المعلم </h4>
        <TeacherSelector teachers={teachers} />
        </div>
        <div className="sections2">
        <br/>
        <br/>
        <br/>
          
        <h4 className="secT">
              أكتب رمز الشعبة
            </h4>
            <br/>
            <input className="input" type="text" placeholder=" أكتب رمز الشعبة" 
            onChange={(event) => {
              var x = event.target.value
              console.log(x)
              if(x == 'ا'){
                x = 'أ'
              setType(x)
            }else{
                setType(event.target.value);
            }
            }}/>
        <br/>
            <button className="addbtn2"
            onClick= {AddSections}>إضافة</button>
            </div>
      </div>
    );


}
export default AddSection;