import React, { useMemo } from 'react';
import {useTable} from 'react-table';
import { EditCameraColumns } from './EditCameraColumns';
import EditCameraData from './EditCameraData.json';
import './Table.css';

export const EditCameraTable = () => {

  const columns = useMemo(() => EditCameraColumns, [])
  const data = useMemo(() => EditCameraData, [])

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
    <td><button type="submit">عرض</button>
    <button type="submit">تعديل</button>
    <button type="button" onClick={EditCameraTable}>
      <button type="submit">حذف</button>
      </button>
      </td>

    </div>
  );
}

export default EditCameraTable;

