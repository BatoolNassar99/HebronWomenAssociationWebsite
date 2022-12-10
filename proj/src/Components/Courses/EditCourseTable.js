import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import '../Table.css'
import Axios from 'axios';
import EditCourse from './EditCourse';
import { Link } from 'react-router-dom';
import AppNavbarAdmin from '../common/navbar-admin';
import swal from 'sweetalert';


function EditCourseTable() {

  const [data, setData] = useState([]);
  const [CourseID, setCourseID] = useState(0);

  useEffect(() => {
    Axios
      .get("http://localhost:3003/coursestable")
      .then(result => setData(result.data));
  }, []);

  function storeCourse(id) {
    localStorage.setItem('CourseID', id)
  }

  function DeleteCourse(id){
    localStorage.setItem('CourseID', id)
    console.log(CourseID)
    Axios.post('http://localhost:3003/deletecourse', {
      CourseID: localStorage.getItem('CourseID'),
  }).then(() => {
      console.log("success")
      swal({
        text: "تمّ حذف الدورة",
    })
  })
  }


  return (
    <div className="main">
     <AppNavbarAdmin />
      <h2>
      <div  className='report'>
        <table className="table" >
          <thead className="thead-dark">
            <tr>
              <th scope="col">اسم الدورة</th>
              <th scope="col">تعديل الدورة</th>
              <th scope="col">حذف الدورة</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => {

              return <tr key={id}>
                <td>{item.Name}</td>

                <td>
                  <a
                    href={`/editcourse2`}
                    className="btn btn-primary"
                    onClick={() => storeCourse(item.CourseID)}>
                    تعديل
                  </a>
                </td>
                <td><button className="btn btn-primary" onClick={() => DeleteCourse(item.CourseID)}>حذف</button></td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </h2>

    </div>
  )
}

export default EditCourseTable;


//DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
