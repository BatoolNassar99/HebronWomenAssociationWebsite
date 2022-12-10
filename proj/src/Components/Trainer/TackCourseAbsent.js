import React, {useState} from 'react';
import Axios from "axios";


function TackCourseAbsent() {

    const [takeAbsentList, setTakeAbsentList] = useState([]);
    var showDate= new Date()
    var dateOfDay= showDate.getDate() + '/'+showDate.getMonth() + '/' + showDate.getFullYear()
    
    Axios.get('http://localhost:3003/takecourseabsent/:courseID').then((respons) => {
        setTakeAbsentList(respons.data)
    })

    return (
        <div className="main">
            <h2>
                <table className="table" >
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">أسماء المنتسبين للدورة</th>
                            <th scope="col">التاريخ</th>
                            <th scope="col">الحضور</th>
                        </tr>
                    </thead>
                    <tbody>
                        {takeAbsentList.map(data => {
                            return <tr key={data.SSN}>
                                <td>{data.FullName}</td>
                                <td>{dateOfDay}</td>
                                <td>
                                    <input type="radio" className='absent' value="yes">حَضَر</input>
                                    <br />
                                    <input type="radio" className='absent' value="no">لم يحضر</input></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </h2>
        </div>
    );
}

export default TackCourseAbsent;