import React, {useState, useEffect  } from 'react';
import { useTable } from 'react-table';
import '../Table.css'
import Axios from 'axios';
import { render } from 'react-dom';
import AppNavbarAdmin from '../common/navbar-admin';


export const ReportsTable = () => {

  const [data1, setData1] = useState(0);
  const [data2, setData2] = useState(0);
  const [data3, setData3] = useState(0);
  const [data4, setData4] = useState(0);

  useEffect(() => {
    Axios
      .get("http://localhost:3003/reports1")
      .then(result => setData1(result.data));
  });

  useEffect(() => {
    Axios
      .get("http://localhost:3003/reports2")
      .then(result => setData2(result.data));
  });

  useEffect(() => {
    Axios
      .get("http://localhost:3003/reports3")
      .then(result => setData3(result.data));
  });

  useEffect(() => {
    Axios
      .get("http://localhost:3003/reports4")
      .then(result => setData4(result.data));
  });
{/*
  return (
    <div>
      <h1>{JSON.stringify(data1)}</h1>
      <h1>{JSON.stringify(data2)}</h1>
      <h1>{JSON.stringify(data3)}</h1>
      <h1>{JSON.stringify(data4)}</h1>
    </div>
 ) 
  */}
{
  return (
    <div>
			<AppNavbarAdmin />

      <h1>
        <div  className='report'>
      <table className="table" >
        <thead className='tableHead'>
          <tr>
            <th scope="col">الاسم</th>
            <th scope="col">العدد</th>
          </tr>
        </thead>
        <tbody>
             <tr>عدد المعلمين
             <td>{JSON.stringify(data1)}</td>
            </tr>
            <tr> عدد المدرّبين
              <td>4</td>
            </tr>
             <tr> عدد الطلاب
              <td>7</td>
            </tr>
             <tr> عدد المتدرّبين
              <td>{JSON.stringify(data3)}</td>
            </tr>
            <tr> عدد الفعاليات المنجزة
              <td>{JSON.stringify(data4)}</td>
            </tr> 
            <tr> عدد الدورات 
              <td>4</td>
            </tr>
             {/**/}
        </tbody>
      </table>
      </div>
    </h1>
    
    </div>
  )
            
}}


  {/*
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
          <h1>التقارير</h1>
          <br/>
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
    </div>
  );
}
*/}

export default ReportsTable;

/*
يوزر... جاهز
معلم ... صفحة لشعبه وطلابه وهاي القصص وعرض الكاميرا لأنها مش معمولة
والطالب.. صفحة للشعبة يلي هو فيها
المتدرب.. الدورات يلي مسجل فيها 
الأب .. شعبة ابنه 
...

بجدول السكشن بالداتا بيس، الاسم هو تمهيدي أو بستان
ال type هو أي شعبة

كمان عند عرض الشعب، رح نحط إنه المعلم ممكن يضيف زي بوست أو إعلان وبظهر لأولياء الأمور والطلاب
*/