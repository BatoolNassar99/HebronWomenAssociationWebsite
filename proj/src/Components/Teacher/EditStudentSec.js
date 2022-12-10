import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Axios from 'axios';
import AppNavbarAdmin from '../common/navbar-admin';
import EditCourse from '../Courses/EditCourse';
import '../Add/AddCourse'
import './teacher.css'
import swal from 'sweetalert';


const EditStudentSec  = () => {

  const [Semester, setSemester] = useState('');
  const [Section, setSection] = useState('');
  const [ChildSSN, setChildSSN] = useState('');
  const [SectionID, setSectionID] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [StudentName, setStudentName] = useState('');

  //كلشي بجدول السكشنز 
  const [SemesterSelected, setSemesterSelected] = useState('');
  //اسم الشعبة اللي راح اختارها من السلكتر وأضيف عليها الطلاب
  const [sections, setSections] = useState([]);
  //الشعب بتحتوي على كلشي بجدول السكشنز بس بدل اي دي اسم الشعبة حطيت اسم الشعبة نفسها، يظهروا بناءً على السمستر اللي اختاره اليوزر بالسلكتر الاول
  const [SectionSelected, setSectionSelected] = useState('');
  //اسم الصف ورمز الشعبة  اللي رح اخترها من السلكتر الثاني 


  const Edit = async (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:3003/editStudentSection`, {
        ChildSSN: ChildSSN,
        SectionSelected: SectionSelected,
    }).then(() => {
      swal({
        text: "تمّ تعديل شعبة الطالب",
        icon:"success",
    })
    })
}

console.log(ChildSSN)

const fetchData = () => {
  setChildSSN(localStorage.getItem('ChildSSN'));
  setSectionID(localStorage.getItem('SectionID'));
  console.log(ChildSSN)
     Axios.put(`http://localhost:3003/fetchStudentData`, {
      ChildSSN:localStorage.getItem('ChildSSN'),
      SectionID:localStorage.getItem('SectionID'),
}).then((result) => {
    console.log(result)
    const x = result.data[0];
    console.log(x)
    setSemesterSelected(x.Semester)
    setSectionSelected(x.ID)
    setStudentName(x.FullName)
      console.log('Semester = ' + Semester)
      console.log('Section = ' + Section)  
    });
};

useEffect(
    () => {
fetchData();
},
[ChildSSN]
);


useEffect(() => {
  Axios
      .get("http://localhost:3003/getSemesters")
      .then(result => setSemesters(result.data));
}, []);


useEffect(() => {
if(SemesterSelected != ''){
  setSectionSelected('')
Axios
    .put("http://localhost:3003/getSections",  {
      SemesterSelected: SemesterSelected
    })
    .then(result => {setSections(result.data)
  });
}}, [SemesterSelected]);


function SemestersSelector({ semesters }) {
  var x=' ' ;
  if (!SemesterSelected)
   {x= <option value="" disabled> اختر الفصل الدراسي</option> }

    return (
        <select
            className="custom-select"
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
    );
}
console.log(SemesterSelected)

function SectionsSelector({ sections }) {
  console.log('SectionSelected = ' + SectionSelected)

  var y=' ' ;
  if (!SectionSelected)
   {y= <option value="" disabled> اختر الصف</option> }
   
  return (
      <select
          className="custom-select"
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
  );
}


  return(
    <div>
     <AppNavbarAdmin />
      <label> </label>
      <h5 className='h2'>تعديل شعبة الطالب/ة: {StudentName}</h5>
      <br/>
            <h4 className="h4"> اختر الفصل الدراسي </h4>
            <SemestersSelector semesters={semesters} />
            <h4 className="h4"> اختر الصف </h4>
            <SectionsSelector sections={sections} />
            <br/>
            <button className="addbtn" type="submit" onClick={Edit}>تعديل</button>
    </div>

  )

}
export default EditStudentSec;