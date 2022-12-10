import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';
import Axios from 'axios';
import Select from 'react-select'
import Item from "antd/lib/list/Item";
import AppNavbarTeacher from "../common/navbar-teacher";

function TeacherF() {

  const [TeacherSSN, setTeacherSSN] = useState(localStorage.getItem('SSN'))
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [SectionName, setSectionName] = useState('');
  const [Type, setType] = useState('');
  //setTeacherSSN(localStorage.getItem('SSN'));

console.log(TeacherSSN)

  useEffect(() => {
    
    Axios
      .put(`http://localhost:3003/getTeacherSections`, {
        TeacherSSN: TeacherSSN,
      })
      .then(result => setData1(result.data));
    console.log(data1);
  }, []);

  useEffect(() => {
    if(SectionName !=''){
    Axios
      .put(`http://localhost:3003/getTeacherTypes`, {
        TeacherSSN: localStorage.getItem('SSN'),
        SectionName: SectionName,
      })
      .then(result => setData2(result.data));
    console.log(data2);
  }}, [SectionName]);

  function NameSelector({ data1 }) {
    var x=' ' ;
    if (!SectionName)
    {x= <option value="" disabled> اختر الصف</option> }
    return (
      <div>
    <select className="custom-select" value={SectionName} onChange={(e) => {
      const selectedSectionName = e.target.value;
      setSectionName(selectedSectionName);
    }}>
      {x}
      {data1.map((item, id) =>
        <option key={id} value={item.SectionName}>
          {item.SectionName}
        </option>
      )}
    </select>
    </div>
      );
    }

    function TypeSelector({ data2 }) {
      var x=' ' ;
      if (!Type)
      {x= <option value="" disabled> اختر الشعبة</option> }
      return (
        <div>
    <select className="custom-select" value={Type} onChange={(e) => {
      const selectedSectionType = e.target.value;
      setType(selectedSectionType);
    }}>
      {x}
      {data2.map((item, id) =>
        <option key={id} value={item.SectionType}>
          {item.SectionType}
        </option>
      )}
    </select>
    </div>
  );
      }

  
  useEffect(() => {
    if(SectionName != '' && Type != ''){
    Axios
      .put(`http://localhost:3003/getTeacherStudents`, {
        TeacherSSN: TeacherSSN,
        SectionName,
        Type: Type,
    }).then(result => setData3(result.data));
    console.log(data3);
  }}, [SectionName, Type])

  return (
    <div className="row">
      <AppNavbarTeacher />
      <h4> اختر الصف </h4>
      <NameSelector data1={data1} />
      <br/>

      <h4> اختر الشعبة </h4>
      <TypeSelector data2={data2} />

    
      <br/><br/>

      <h4>
        <div className="sections">
        <table className="table1" >
          <thead className="thead-dark">
            <tr>
              <th scope="col">الطلاب</th>
            </tr>
          </thead>
          <tbody>
            {data3.map((item,id) => {
              return <tr key={id}>
                <td>{(item.FullName)}</td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </h4>
    </div>
  )
}

export default TeacherF;