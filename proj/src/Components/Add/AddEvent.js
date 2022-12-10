import React, { useEffect, useState } from "react";
import { TextField } from '@mui/material';
import Axios from "axios";
import swal from 'sweetalert';
import './Add.css';
import AppNavbarAdmin from "../common/navbar-admin";
import './AddEvent.css';

function AddEvent() {


    const [text, setText] = useState('');
    const [Description, setDescription] = useState("");
    const [ActivityTime, setActivityTime] = useState("");
    const [ActivityDate, setActivityDate] = useState(null);
    const [image, setimage] = useState('');
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [textResponse, setTextResponse] = useState("")
    const [descriptionResponse, setDescriptionResponse] = useState("")
    const [activityTimeResponse, setActivityTimeResponse] = useState("")
    const [activityDateResponse, setActivityDateResponse] = useState("")
    const [imageResponse, setImageResponse] = useState("")

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
        setImageResponse("")
    }

    const AddNewEvent = () => {

        if (text === "") {
            setTextResponse('يُرجى إدخال اسم الفعالية');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if (Description === "") {
            setDescriptionResponse('يُرجى إدخال وصف للفعالية');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if (ActivityTime === "") {
            setActivityTimeResponse('يُرجى إدخال وقت الفعالية');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if (ActivityDate === null) {
            setActivityDateResponse('يُرجى إدخال تاريخ بدء الفعالية');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if (image === "") {
            setImageResponse('يُرجى اختيار صورة مناسبة للتعبير عن الفعالية');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else {
            const formData = new FormData()
            formData.append("ActivityName", text)
            formData.append("Description", Description)
            formData.append("ActivityTime", ActivityTime)
            formData.append("ActivityDate", ActivityDate)
            formData.append("ActivityImage", image)
            Axios.post('http://localhost:3003/addactivity', formData
            )
                .then((res) => {
                    if (res) {
                        swal({
                            text: "تمت الإضافة بنجاح",
                            icon: "success"
                        }).then(function () {
                            window.location = "addevent";
                        });
                    } else {
                        swal({
                            text: "حدث خطأ! لم تتم عملية الإضافة",
                            icon: "error"
                        }).then(function () {
                            window.location = "addevent";
                        });
                    }
                })
        }
    }

    return (
        <div>
            <AppNavbarAdmin />
            <div className="row1">
                <div className="column1">
            <label className="h4"><b>
                اسم الفعالية :
            </b>
                <p className="fontgray">
                    يُرجى عدم تكرار اسم الفعاليّة
                </p>
            </label>
            <input
                type="text"
                className="inputt"
                placeholder=" اسم الفعالية"
                onChange={e => {
                    onChangeHandler(e.target.value)
                    setTextResponse("")
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestions([])
                    }, 100)
                }}
                value={text}
            />
            <p>{textResponse}</p>
            {suggestions && suggestions.map((suggestion, i) =>
                <div
                    key={i}
                    className="justify-content-md-center suggestion"
                    onClick={() => onSuggestHandler(suggestion.ActivityName)}>
                    {suggestion.ActivityName}</div>
            )}

            <label className="h4"><b>تفاصيل الفعالية :</b></label>
            <input
                className="inputt"
                placeholder="أدخِل تفاصيل الفعالية"
                color="secondary"
                variant="outlined"
                value={Description}
                multiline
                onChange={(event) => {
                    setDescription(event.target.value);
                    setDescriptionResponse("")
                }} />
            <p>{descriptionResponse}</p>

            <label className="h4"><b>موعد الفعالية(ساعة البدء)</b></label>
            <input
                type="text"
                className="inputt"
                placeholder="1:00 ظهرًا"
                onChange={(event) => {
                    setActivityTime(event.target.value);
                    setActivityTimeResponse("")
                }}
                value={ActivityTime}
            />
            <p>{activityTimeResponse}</p>
            </div>

            <div className="column2">
            <label className="h4"><b>تاريخ الفعالية</b></label>
            <input className='inputt'
                type='date'
                name='EventDate'
                placeholder={'DD/MM/YYYY'}
                onChange={(date) => {
                    setActivityDate(date.target.value)
                    setActivityDateResponse(null)
                }}
                value={ActivityDate}
                required />

            <p>{activityDateResponse}</p>

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
            <p>{imageResponse}</p>
            <br />

            <button className="addbtn2" type="submit"
                onClick={AddNewEvent}>
                حفظ</button>
                </div>
            </div>
        </div>
    );
}
export default AddEvent;
{/**  Axios.post('http://localhost:3003/addevent', {
            ActivityName: text,
            Description: Description,
            ActivityTime: ActivityTime,
            ActivityDate: ActivityDate,
        }).then(() => {
            Axios.get('http://localhost:3003/addnewevent')
                .then((response) => {
                    console.log(response.data)
                    const formData = new FormData()
                    formData.append('ActivityName', text)
                    formData.append("image", image)
                    Axios.post('http://localhost:3003/addeventimage', formData)
                        .then(res => {
                            console.log(res.data.msg);
                        })
                })
        }) */}