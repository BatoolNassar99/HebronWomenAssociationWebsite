import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';
import Axios from 'axios';
import Select from 'react-select'
import Item from "antd/lib/list/Item";
import Empty from "antd/lib/empty";
import AppNavbarAdmin from "../common/navbar-admin";
import './teacher.css'
import './Tablee.css'
function ViewStudents() {
  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [SectionName, setSectionName] = useState('');
  const [Type, setType] = useState('');
  const [Semester, setSemester] = useState('');
  const [TeacherName, setTeacherName] = useState('');
  const [students, setStudents] = useState([]);


  /*eslint eqeqeq: "off"*/

  // Load semesters 
  useEffect(() => {
    //setStudents([])

    Axios.get(
      `http://localhost:3003/getSemesters`,
    ).then((result) => {
      setSemesters(result.data)
      setSemester('')
      setSectionName('')
      //setTeacherName('')
      setType('')
      setSections([])
      //setTeachers([])
      setTypes([])
    });
  }, []);

  // Load sections based on selected semester 
  useEffect(() => {
    setStudents([])

    if (Semester != '') {
      Axios.put(
        `http://localhost:3003/getSectionsNames`, {
        Semester: Semester
      }).then((result) => {
        setSections(result.data)
        setSectionName('')

        //setTeacherName('')
        setType('')
        //setTeachers([])
        setTypes([])
      });
    }
  }, [Semester]);

  {/*
  // Load teachers based on selected semester and section name 
  useEffect(() => {
    //setStudents([])

    if (!!SectionName && !!Semester) {
      Axios.put(
        `http://localhost:3003/getTeachers`, {
        Semester: Semester,
        SectionName: SectionName,
      }).then((result) => {
        setTeachers(result.data)
        setTeacherName('')
        setType('')
        setTypes([])
      });
    }
  }, [Semester, SectionName]);
*/}

  // Load types based on selected semester, section name and teacher
  useEffect(() => {
    //setStudents([])

    if (![Semester, SectionName].includes('')) {
      Axios.put(`http://localhost:3003/getSectionTypes`, {
        Semester: Semester,
        SectionName: SectionName,
        //TeacherName: TeacherName,
      }).then((result) => setTypes(result.data));
    }
  }, [Semester, SectionName]);

  {/*
  ///أجيب اسم المعلم تاع هاي الشعبة اللي ختارها وأعرضه فوق جدول الطلاب جوا ليبل
  useEffect(() => {
    if (![Semester, SectionName, Type].includes('')) {
      Axios.put(`http://localhost:3003/teacherName`, {
        Semester: Semester,
        SectionName: SectionName,
        //TeacherName: TeacherName,
        Type: Type,
      }).then((result) => {
        console.log(result.data)
        setTeacherName(result.data)
        //setTeacherName('')
       // setType('')
        //setTypes([])
      });
    }
  }, [Semester, SectionName, Type]);
*/}

  // Load students based on all
  useEffect(() => {
    if (![Semester, SectionName, Type].includes('')) {
      Axios.put(`http://localhost:3003/getStudentss`, {
        Semester: Semester,
        SectionName: SectionName,
        //TeacherName: TeacherName,
        Type: Type,
      }).then((result) => {
        console.log(result.data)
        setStudents(result.data)
        //setTeacherName('')
        // setType('')
        //setTypes([])
      });
    }
  }, [Semester, SectionName, Type]);

  console.log(students)

  function storeChild(id1, id2) {
    localStorage.setItem('ChildSSN', id1)
    localStorage.setItem('SectionID', id2)
  }

  function DeleteStudent(ChildSSN) {
    Axios.put(`http://localhost:3003/deleteStudentFromSection`, {
      ChildSSN: ChildSSN,
    }).then(() => {
      alert("success")
    })

  }

  function StudentTable({ students }) {
    return (
      <div>
        <br />
        <div className="reports">
          <table className="table1">
            <thead className="thead-dark">
              <tr>
                <th scope="col">اسم الطالب</th>
                <th scope="col">تعديل شعبة الطالب</th>
                <th scope="col">حذف الطالب من الشعبة</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, ind) => {
                return (
                  <tr key={`student-${ind}`}>
                    <td>{item.FullName}</td>

                    <td>
                      <a
                        href={`/editStudentSec`}
                        className="btn btn-primary"
                        onClick={() => storeChild(item.ChildSSN, item.ID)}>
                        تعديل
                      </a>
                    </td>

                    <td><button className="btn btn-primary" onClick={() => DeleteStudent(item.ChildSSN)}>حذف</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function SemesterSelector({ semesters }) {

    var x = ' ';
    if (!Semester) { x = <option value="" disabled> اختر الفصل الدراسي</option> }
    return (
      <div>
        <h4 className="h4"> اختر الفصل الدراسي </h4>
        <select
          value={Semester}
          className="custom-select"
          onChange={(e) => {
            const selectedSem = e.target.value;
            setSemester(selectedSem)
          }}
        >
          {x}
          {semesters.map((item, id) => (
            <option key={`semester-${id}`} value={item.Semester}>
              {item.Semester}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function NameSelector({ sections }) {
    //console.log(TeacherName)
    //setSectionName('batool' + SectionName)


    console.log(SectionName)

    var x = ' ';
    if (!SectionName) { x = <option value="" disabled > اختر الصف</option> }
    return (
      <div>
        <h4 className="h4"> اختر الصف </h4>
        <select
          value={SectionName}
          className="custom-select"
          onChange={((e) => {
            setSectionName(e.target.value)
            setType('')
          })}
        >
          {x}

          {sections.map((item, id) => (
            <option key={id} value={item.SectionName}>
              {item.SectionName}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function TypeSelect({ types }) {

    var x = ' ';

    if (!Type) { x = <option value="" disabled> اختر الشعبة</option> }
    return (
      <div >
        <h4 className="h4"> اختر الشعبة </h4>

        <select
          value={Type}
          className="custom-select"
          onChange={(e) => setType(e.target.value)}
        >
          {x}
          {types.map((item, id) => (
            <option key={id} value={item.SectionType}>
              {item.SectionType}
            </option>
          ))}
        </select>
      </div>
    );
  }


  return (
    <div className="row">
      <AppNavbarAdmin />
      <h2 className="head2">عرض الطلاب</h2>

      <div className="column">
        <SemesterSelector semesters={semesters} />

        <NameSelector sections={sections} />

        <TypeSelect types={types} />

      </div>
      <div className="column">
      <StudentTable students={students} />
      </div>
    </div>
  );
}

export default ViewStudents;