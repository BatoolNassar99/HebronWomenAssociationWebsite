import React, { useEffect, useState } from "react";
import { TextField } from '@mui/material';
import swal from 'sweetalert';
import Axios from "axios";
import AppNavbarAdmin from "../common/navbar-admin";
import './AddCourse.css'
function AddCourse() {

    const [text, setText] = useState('');
    const [TeacherSSN, setTeacherSSN] = useState("");
    const [Description, setDescription] = useState("");
    const [CourseTime, setCourseTime] = useState("");
    const [CourseDate, setCourseDate] = useState(null);
    const [image, setimage] = useState("");
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [textResponse, setTextResponse] = useState("")
    const [teacherSSNResponse, setTeacherSSNResponse] = useState("")
    const [descriptionResponse, setDescriptionResponse] = useState("")
    const [courseTimeResponse, setCourseTimeResponse] = useState("")
    const [courseDateResponse, setCourseDateResponse] = useState("")
    const [imageResponse, setImageResponse] = useState("")
    const [coaches, setCoaches] = useState([]);


    useEffect(() => {
        Axios
            .get("http://localhost:3003/getCoachesNames")
            .then(result => setCoaches(result.data));
      }, []);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await Axios.get('http://localhost:3003/showc');
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
                return user.Name.match(regex)
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

    const AddNewCourse = () => {
        
        if(text ===""){
            setTextResponse('يُرجى إدخال اسم الدورة');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if(TeacherSSN === ""){
            setTeacherSSNResponse('يُرجى إدخال رقم هوية المدرِّب');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if(Description === ""){
            setDescriptionResponse('يُرجى إدخال وصف للدورة');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if(CourseTime === ""){
            setCourseTimeResponse('يُرجى إدخال وقت الدورة');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if(CourseDate === null){
            setCourseDateResponse('يُرجى إدخال تاريخ بدء الدورة');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
        } else if(image === "") {
            setImageResponse('يُرجى اختيار صورة مناسبة للتعبير عن الدورة');
            swal({
                text: "يُرجى تعبئة الحقول الفارغة",
                icon: "info"
            })
            }
        else {
            const formData = new FormData()
            formData.append("TeacherSSN", TeacherSSN)
            formData.append("Name", text)
            formData.append("Description", Description)
            formData.append("CourseTime", CourseTime)
            formData.append("CourseDate", CourseDate)
            formData.append("CourseImage", image)
        Axios.post('http://localhost:3003/addcourse', formData
        ).then((res) => {
            if(res){
                swal({
                text: "تمت الإضافة بنجاح",
                icon: "success"
            }).then(function() {
                window.location = "addcourse";
            });
        } else {
            swal({
                text: "حدث خطأ! لم تتم عملية الإضافة",
                icon: "error"
            }).then(function() {
                window.location = "addcourse";
            });
        }   
        })
    }
    }

    function CoachSelector({ coaches }) {
  
        var y=' ' ;
        if (1)
         {y= <option className="fontgray" value="" disabled> اختر اسم المدرّب</option> }
         
        return (
            <select
                className="inputt"
                onChange={(e) => {setTeacherSSN(e.target.value)
                    setTeacherSSNResponse("")}
                }
                value={TeacherSSN}
            >
              {y}
                {coaches.map((item, id) => (
                    <option key={id} value={(item.SSN)}>
                        {(item.FullName)}
                    </option>
                ))}
            </select>
        );
      }

    return (
<div>          
      <AppNavbarAdmin />

        <div className="row1">
<div className="column1">
            <h4 className="h4"><b>اسم الدورة</b>
                <p className="fontgray">
                    يُرجى عدم تكرار اسم الدورة
                </p>
            </h4>
            <input
                type="text"
                className="inputt"
                placeholder="اسم الدورة"
                onChange={e => {onChangeHandler(e.target.value)
                        setTextResponse("")}}
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
                    onClick={() => onSuggestHandler(suggestion.Name)}>
                    {suggestion.Name}</div>
            )}

            <h4 className="h4"><b>اسم المدرب</b></h4>
            <CoachSelector coaches={coaches} />
                <p>{teacherSSNResponse}</p>

            
                <label className="h4"><b>تفاصيل الدورة</b></label>
            <input
                className="inputt"
                placeholder="أدخِل تفاصيل الدورة"
                color="secondary"
                variant="outlined"
                value={Description}
                multiline
                onChange={(event) => {
                    setDescription(event.target.value)
                    setDescriptionResponse("")
                }}
            />
            <p>{descriptionResponse}</p>
            </div>
            <div className="column2">

            <h4 className="h4"><b>موعد الدورة(ساعة البدء ويوم/أيام الدوام)</b></h4>
            <input
                type="text"
                className="inputt"
                placeholder="1:00 ظهرًا (أحد-ثلاثاء-خميس)"
                onChange={(event) => {
                    setCourseTime(event.target.value)
                    setCourseTimeResponse("")
                }}
                value={CourseTime}
            />
            <p>{courseTimeResponse}</p>

            <h4 className="h4"><b>تاريخ البدء بالدورة</b></h4>
            <input className='inputt'
                type='date'
                name='EventDate'
                placeholder={'DD/MM/YYYY'}
                onChange={(date) => {
                    setCourseDate(date.target.value)
                    setCourseDateResponse(null)
                }}
                value={CourseDate}
                required />
                <p>{courseDateResponse}</p>

            <form>
                <div>
                    <h4 className="h4"><b>
                        اختر صورة للتعبير عن الدورة
                    </b></h4>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        multiple={false}
                        className="inputt"
                        id="customFile"
                        onChange={setdatavalues} />
                </div>
            </form>
            <p>{imageResponse}</p>
            </div>
            
            <button className="addbtn3" type="submit"
                onClick={AddNewCourse}>
                حفظ</button>
        
        </div>
        </div>
    );
}
export default AddCourse;
{/** Axios.post('http://localhost:3003/addcourse', {
            TeacherSSN: TeacherSSN,
            Name: text,
            Description: Description,
            CourseTime: CourseTime,
            CourseDate: CourseDate,
        }).then(() => {
            Axios.get('http://localhost:3003/addnewcourse')
                .then((respons) => {
                    console.log(respons.data)
                    const formData = new FormData()
                    formData.append("CourseName", text)
                    formData.append("image", image)
                    Axios.post('http://localhost:3003/addcourseimage', formData)
                        .then(res => {
                            console.log(res.data.msg);
                        })
                }) */}