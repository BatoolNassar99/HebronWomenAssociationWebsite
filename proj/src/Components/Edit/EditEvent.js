
import React, { useEffect, useState } from "react";
import { TextField } from '@mui/material';
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Axios from "axios";
//import './Add.css';
import AppNavbarAdmin from "../common/navbar-admin";
import '../Add/AddCourse';

function EditEvent() {

    const [ActivityID, setActivityID] = useState('');
    const [text, setText] = useState('');
    const [Description, setDescription] = useState("");
    const [ActivityTime, setActivityTime] = useState("");
    const [ActivityDate, setActivityDate] = useState(new Date());
    const [response, setresponse] = useState("")
    const [image, setimage] = useState('');
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [Data, setData] = useState([]);

    const Edit = async (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:3003/editevent`, {
            ActivityID: ActivityID,
            text: text,
            Description: Description,
            ActivityDate: ActivityDate,
            ActivityTime: ActivityTime,
        }).then(() => {
            alert("تم التعديل بنجاح")
        })
    }

    const fetchData = () => {
        setActivityID(localStorage.getItem('ActivityID'));
        console.log(ActivityID)
        Axios.put(`http://localhost:3003/fetchactivitydata`, {
            ActivityID: localStorage.getItem('ActivityID'),
        }).then((result) => {
            console.log(result)
            setData(result.data[0])
            const x = result.data[0];
            setText(x.ActivityName);
            setDescription(x.Description);
            setActivityTime(x.ActivityTime);
            //setActivityDate(x.ActivityDate);
            //setCourseDate(Data.CourseDate);
            //setimage(Data.CourseImage);
        });
    };
    useEffect(
        () => {
            fetchData();
        },
        [ActivityID]
    );


    useEffect(() => {
        const loadUsers = async () => {
            const response = await Axios.get('http://localhost:3003/showe');
            console.log(response.data)
            setUsers(response.data)
        }
        loadUsers()
    }, [])

    const onSuggestHandler = (text) => {
        setText(text)
        setSuggestions([])
    }

    const onChangeHandler = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = users.filter(user => {
                const regex = new RegExp(`${text}`, "gi");
                return user.ActivityName.match(regex)
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setText(text)
    }

    const setdatavalues = (event) => {
        console.log('لقد قمت باختيار صورة')
        setimage(event.target.files[0])
    }

    const AddNewEvent = () => {
        if (text === "" || Description === "" ||
            ActivityTime === "" || ActivityDate === null || image === "") {
            setresponse('يرجى تعبئة الحقول الفارغة');
        } else {
            const formData = new FormData()
            formData.append("ActivityName", text)
            formData.append("Description", Description)
            formData.append("ActivityTime", ActivityTime)
            formData.append("ActivityDate", ActivityDate)
            formData.append("ActivityImage", image)
            Axios.post('http://localhost:3003/addactivity', formData
            )
                .then(() => {
                    alert("تمت الإضافة بنجاح")
                }).then(() => {
                    setText("")
                    setDescription("")
                    setActivityTime("")
                    setActivityDate(null)
                    setimage([])
                })
        }
    }

    return (
        <div>
            <AppNavbarAdmin />
         <div className="row1">
             <div className="column1">
                <label className="h4"><b>
                    اسم الفعالية
                </b>
                    <p className="fontgray">
                        يُرجى عدم تكرار اسم الفعاليّة
                        </p>
                </label>
                <input
                    type="text"
                    className="inputt"
                    placeholder=" اسم الفعالية"
                    onChange={e => onChangeHandler(e.target.value)}
                    onBlur={() => {
                        setTimeout(() => {
                            setSuggestions([])
                        }, 100)
                    }}
                    value={text}
                />
                {suggestions && suggestions.map((suggestion, i) =>
                    <div
                        key={i}
                        className="justify-content-md-center suggestion"
                        onClick={() => onSuggestHandler(suggestion.ActivityName)}>
                        {suggestion.ActivityName}</div>
                )}

                <label className="h4"><b>تفاصيل الفعالية</b></label>
                <input
                    className="inputt"
                    label="أدخِل تفاصيل الفعالية"
                    color="secondary"
                    variant="outlined"
                    value={Description}
                    multiline
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }} />

                <label className="h4"><b>موعد الفعالية(ساعة البدء)</b></label>
                <input
                    type="text"
                    className="inputt"
                    placeholder="1:00 ظهرًا"
                    onChange={(event) => {
                        setActivityTime(event.target.value);
                    }}
                    value={ActivityTime}
                />
            </div>
            <div className="column2">
                <label className="h4"><b>تاريخ الفعالية</b></label>

                <input className='inputt'
                    type='date'
                    name='EventDate'
                    placeholder={'DD/MM/YYYY'}
                    onChange={(date) => {
                        setActivityDate(date.target.value)
                    }}
                    value={Data.ActivityDate}
                    required />

            

                <form>
                    <div className="form-group">
                        <label className="h4"><b>
                            اختر صورة للتعبير عن الفعالية:
                        </b></label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple={false}
                            className="inputt"
                            id="customFile"
                            onChange={setdatavalues}
                        />
                    </div>
                </form>
                <br />

                <h4>{response}</h4>

                <button className="addbtn2" type="submit"
                    onClick={Edit}>
                    حفظ</button>

            </div>
        </div>
    </div>
    );
}
export default EditEvent;

