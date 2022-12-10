import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import '../Table.css'
import Axios from 'axios';
import EditProduct from './EditProduct';
import { Link } from 'react-router-dom';
import AppNavbarAdmin from '../common/navbar-admin';
import swal from 'sweetalert';


function EditProductsTable() {

  const [data, setData] = useState([]);
  const [ItemID, setItemID] = useState(0);

  useEffect(() => {
    Axios
      .get("http://localhost:3003/producttable")
      .then(result => setData(result.data));
  }, []);

  function storeProduct(id) {
    localStorage.setItem('ProductID', id)
  }

  function DeleteProduct(id){
    localStorage.setItem('ProductID', id)
    console.log(ItemID)
    Axios.post('http://localhost:3003/deleteproduct', {
      ItemID: localStorage.getItem('ProductID'),
  }).then(() => {
      console.log("success")
      swal({
        text: "تمّ حذف المنتج",
        icon: "success",
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
              <th scope="col">اسم المنتج</th>
              <th scope="col">تعديل المنتج</th>
              <th scope="col">حذف المنتج</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => {

              return <tr key={id}>
                <td>{item.Name}</td>

                <td>
                  <a
                    href={`/editproduct2`}
                    className="btn btn-primary"
                    onClick={() => storeProduct(item.ItemID)}>
                    تعديل
                  </a>
                </td>
                <td><button className="btn btn-primary" onClick={() => DeleteProduct(item.ItemID)}>حذف</button></td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </h2>

    </div>
  )
}

export default EditProductsTable;


//DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
