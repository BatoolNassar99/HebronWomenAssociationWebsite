import React, {useState} from 'react';
import Axios from "axios";


function ViewCourseAbsent() {

    const [tackAbsentList, setTackAbsentList] = useState([]);
    
    Axios.get('http://localhost:3003/tackcourseabsent/:courseID').then((respons) => {
        setTackAbsentList(respons.data)
    })

    return (
        <div className="main">
            <h2>
                <table className="table" >
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">أسماء المنتسبين للدورة</th>
                            <th scope="col">عدد مرات الغياب</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tackAbsentList.map(data => {
                            return <tr key={data.SSN}>
                                <td>{data.FullName}</td>
                                <td>{0}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </h2>
        </div>
    );
}

export default ViewCourseAbsent;