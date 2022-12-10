import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import '../Table.css'
import Axios from 'axios';
import EditEvent from './EditEvent';
import { Link } from 'react-router-dom';
import AppNavbarAdmin from '../common/navbar-admin';
import swal from 'sweetalert';


function EditEventTable() {

  const [data, setData] = useState([]);
  const [ActivityID, setActivityID] = useState(0);

  useEffect(() => {
    Axios
      .get("http://localhost:3003/activitytable")
      .then(result => setData(result.data));
  }, []);

  function storeActivity(id) {
    localStorage.setItem('ActivityID', id)
  }

  function DeleteActivity(id){
    localStorage.setItem('ActivityID', id)
    console.log(ActivityID)
    Axios.post('http://localhost:3003/deleteevent', {
      ActvityID: localStorage.getItem('ActivityID'),
  }).then(() => {
      console.log("success")
      swal({
        text: "تمّ حذف الفعاليّة",
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
              <th scope="col">اسم الفعالية</th>
              <th scope="col">تعديل الفعالية</th>
              <th scope="col">حذف الفعالية</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => {

              return <tr key={id}>
                <td>{item.ActivityName}</td>

                <td>
                  <a
                    href={`/editevent2`}
                    className="btn btn-primary"
                    onClick={() => storeActivity(item.ActivityID)}>
                    تعديل
                  </a>
                </td>
                <td><button className="btn btn-primary" onClick={() => DeleteActivity(item.ActivityID)}>حذف</button></td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </h2>

    </div>
  )
}

export default EditEventTable;


//DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
