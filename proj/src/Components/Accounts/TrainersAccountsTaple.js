import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import '../Table.css'
import Axios from 'axios';

export const TrainersAccountsTable = () => {

  const [data, setData] = useState([]);  



function UserStatus(SSN){
  Axios.post('http://localhost:3003/unActiveAccount', {
    UserSSN: SSN
}).then(() => {
    console.log("success")
    setData([])
    window. location. reload(false); //لتحديث الصفحة تلقائياً

})
}

  useEffect(() => {  
    Axios  
        .get("http://localhost:3003/trainers")  
        .then(result => setData(result.data));  
    console.log(data);  
}, []);  

function storeAccountSSN(id) {
    localStorage.setItem('AccountSSN', id)
  }

return (  
    <div>  
               <div  className='report'>
        <table className="table" >  
                <thead className="thead-dark">  
                    <tr>  
                        <th scope="col">الاسم</th>  
                        <th scope="col">الملف الشخصي</th> 
                        <th scope="col">إلغاء التفعيل</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {data.map((item, id) => {  
                        return <tr key={id}>  
                            <td>{item.FullName}</td>  
                            <td><a
                    href={`/PersonalFile`}
                    className="btn btn-primary"
                    onClick={() => storeAccountSSN(item.SSN)}>
                    عرض 
                  </a></td>  
                            <td><button className="btn btn-primary" onClick={() => UserStatus(item.SSN)}>إلغاء التفعيل</button></td> 
                        </tr>  
                    })}  
                </tbody>  
            </table>  
</div>  
        </div>  
    )  
}  
    export default TrainersAccountsTable;
