import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Axios from 'axios';
import AddSection from './AddSection';
import AppNavbarAdmin from '../common/navbar-admin';
import swal from 'sweetalert';

const AddStudents = () => {

    const [data, setData] = useState([]);
    //الطلاب اللي مش مسجلين ب ولا شعبة حتى الآن
    const [students, setStudents] = useState([]);
    //الطلاب اللي بحددهم من الجدول إنه بدي أضيفهم على شعبة 
    const [semesters, setSemesters] = useState([]);
    //كلشي بجدول السكشنز 
    const [SemesterSelected, setSemesterSelected] = useState('');
    //اسم الشعبة اللي راح اختارها من السلكتر وأضيف عليها الطلاب
    const [sections, setSections] = useState([]);
    //الشعب بتحتوي على كلشي بجدول السكشنز بس بدل اي دي اسم الشعبة حطيت اسم الشعبة نفسها، يظهروا بناءً على السمستر اللي اختاره اليوزر بالسلكتر الاول
    const [SectionSelected, setSectionSelected] = useState('');
    //اسم الصف ورمز الشعبة  اللي رح اخترها من السلكتر الثاني 



    useEffect(() => {
        Axios
            .get("http://localhost:3003/studentsnotinsections")
            .then(result => setData(result.data));
    }, []);


    useEffect(() => {
        Axios
            .get("http://localhost:3003/getSemesters")
            .then(result => setSemesters(result.data));
    }, []);


    useEffect(() => {
      if(SemesterSelected != ''){
      Axios
          .put("http://localhost:3003/getSections",  {
            SemesterSelected: SemesterSelected
          })
          .then(result => setSections(result.data));
  }}, [SemesterSelected]);

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

    {/*
    function refreshPage() {
        window. location. reload(false); 
        } 
    */}

    function SemestersSelector({ semesters }) {

      var x=' ' ;
      if (!SemesterSelected)
       {x= <option value="" disabled> اختر الفصل الدراسي</option> }

        return (
            <div>
            <h4 className='secT'> اختر الفصل الدراسي </h4>
            <select
                className="secT"
                onChange={(e) => setSemesterSelected(e.target.value)}
                value={SemesterSelected}
            >
              {x}
                {semesters.map((item, id) => (
                    <option key={id} value={(item.Semester)}>
                        {(item.Semester)}
                    </option>
                ))}
            </select>
            </div>
        );
    }
    console.log(SemesterSelected)

    function SectionsSelector({ sections }) {

      var y=' ' ;
      if (!SectionSelected)
       {y= <option value="" disabled> اختر الصف</option> }
       
      return (
          <div>
          <h4 className='secT'> اختر الصف </h4>
          <select
              className="secT"
              onChange={(e) => setSectionSelected(e.target.value)}
              value={SectionSelected}
          >
            {y}
              {sections.map((item, id) => (
                  <option key={id} value={(item.ID)}>
                      {(item.SectionName + ' ' + item.SectionType)}
                  </option>
              ))}
          </select>
          </div>
      );
  }

    function AddStudents() {  
        if(SemesterSelected != "" && semesters != [] && SectionSelected != "" && sections != []){

        Axios.post(`http://localhost:3003/addStudentToSection`, {
          SemesterSelected: SemesterSelected,
          SectionSelected: SectionSelected,
          students: students,
        }).then((result) =>{
             console.log("success")
             swal({
                text: "تمّ إضافة الطالب/الطلاب إلى الشعبة",
                icon:"success",
            })            })
    }
    window. location. reload(false); //لتحديث الصفحة تلقائياً
    setSemesterSelected('')
    setSectionSelected('')
    }

    return (
        <div className='row'>
         <AppNavbarAdmin />
         <h2 className="head2">إضافة طلاب إلى شعبة</h2>
         <div className='column'>
            <table className="report" >
                <thead>
                    <tr>
                    <th scope="col">الاسم</th>
                    <th scope="col">تحديد</th>
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
            </div>
            <br />
            <div className='column'>
            <SemestersSelector semesters={semesters} />
            <br />
            <SectionsSelector sections={sections} />
            <br />
            <br />
            <button className="addbtn2" onClick={AddStudents}>إضافة</button>
            </div>
            </div>
    )
}


export default AddStudents;
