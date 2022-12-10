import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import '../Table.css'
import Axios from 'axios';

export const ParentsAccountsTable = () => {

  const [data, setData] = useState([]);  



function UserStatus(SSN){
  Axios.post('http://localhost:3003/unActiveAccount', {
    UserSSN: SSN
}).then(() => {
    console.log("success")
    window. location. reload(false); //لتحديث الصفحة تلقائياً

})
}

  useEffect(() => {  
    Axios  
        .get("http://localhost:3003/parents")  
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



{/*}
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState(0);
  const [Address, setAddress] = useState("");

  const [userList, setUserList] = useState([]);

  const getUser = () => {
    Axios.get("http://localhost:3003/teacher").then((response) => {
      setUserList(response.data)
    });
  }

  const columns = useMemo(() => AccountsColumns, [])
  const data = useMemo(() => ParentsAccountsData, [])
  //getUser();

  const tableInstance = useTable({
    columns,
    data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
     <div>
          
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
         </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {

prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
        <button onClick={getUser}>Show Users</button>
        {userList.map((val, key) => {
          return <div>{val.UserName}</div>
        })}
    </div>
    </div>

  )}

      */}
      
    export default ParentsAccountsTable;
