import React, { useState, useEffect, Component } from "react";
import EditCourseTable from "./EditCourseTable";
import { TextField } from '@mui/material';
import Axios from 'axios';
import Datepicker from 'react-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import AppNavbarAdmin from "../common/navbar-admin";
import '../Table.css';

function EditCourse() {
    const [CourseID, setCourseID] = useState(0);
    const [text, setText] = useState('');
    const [TeacherSSN, setTeacherSSN] = useState("");
    const [Description, setDescription] = useState("");
    const [CourseTime, setCourseTime] = useState("");
    const [CourseDate, setCourseDate] = useState(new Date());
    const [image, setimage] = useState("");
    const [images, setimages] = useState([]);
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [response, setResponse] = useState("")
    const [textResponse, setTextResponse] = useState("")
    const [teacherSSNResponse, setTeacherSSNResponse] = useState("")
    const [descriptionResponse, setDescriptionResponse] = useState("")
    const [courseTimeResponse, setCourseTimeResponse] = useState("")
    const [courseDateResponse, setCourseDateResponse] = useState("")
    const [imageResponse, setImageResponse] = useState("")
    const [coaches, setCoaches] = useState([]);
    const [Data, setData] = useState([]);
  

    const Edit = async (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:3003/editcourse`, {
            CourseID: CourseID,
            text: text,
            Description: Description,
            TeacherSSN: TeacherSSN,
            CourseDate: CourseDate,
            CourseTime: CourseTime,
        }).then(()=>{
            Axios.get('http://localhost:3003/addnewcourse')
            .then((respons) => {
                console.log(respons.data)
                const formData= new FormData()
                formData.append("CourseName", text)
                for(let i = 0; i < images.length; i++){
                    formData.append("images", images[i])}
                    console.log(text)
                        Axios.post('http://localhost:3003/addcourseimage', formData)
                        .then(res => {               
                        console.log(res.data.msg);         
                    })
            })   
        }).then(() => {
            alert("تم التعديل بنجاح")
        }).then(() => {
            setTeacherSSN("")
            setText("")
            setDescription("")
            setimages([])
        })  
    }

    const fetchData = () => {
        setCourseID(localStorage.getItem('CourseID'));
        console.log(CourseID)
         Axios.put(`http://localhost:3003/fetchcoursedata`, {
			CourseID:localStorage.getItem('CourseID'),
    }).then((result) => {
        console.log(result)
        setData(result.data[0])
        const x = result.data[0];
            setText(x.Name);
            setDescription(x.Description);
            setTeacherSSN(x.TeacherSSN);
            setCourseTime(x.CourseTime);
            //setCourseDate(Data.CourseDate);
            //setimage(Data.CourseImage);
            
        
        });
    };
    useEffect(
        () => {
    fetchData();
},
[CourseID]
);
   
console.log(CourseDate)
console.log(Description)
console.log(Data.CourseImage)
//setCourseDate(Data.CourseDate);
//setimage(Data.CourseImage);

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
        setimages(event.target.files[0])
    }

    const AddNewCourse = () => {
        if (text === "") {
            setTextResponse('يُرجى إدخال اسم الدورة');
        } else if(Description === ""){
            setDescriptionResponse('يُرجى إدخال وصف للدورة');
        } else if(TeacherSSN === ""){
            setTeacherSSNResponse('يُرجى إدخال رقم هوية المدرِّب');
        } else if(CourseTime === ""){
            setCourseTimeResponse('يُرجى إدخال وقت الدورة');
        } else if(CourseDate === null){
            setCourseDateResponse('يُرجى إدخال تاريخ بدء الدورة');
        } else if(image === ""){
            setImageResponse('يُرجى اختيار صورة مناسبة للتعبير عن الدورة');
        } else if(text ==="" || Description === "" || TeacherSSN === ""
            || CourseTime === "" || CourseDate === null || image === "") {
                setResponse('يُرجى تعبئة الحقول الفارغة')
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
        ).then(() => {
            alert("تمت الإضافة بنجاح")
        }).then(() => {
            setTeacherSSN("")
            setText("")
            setDescription("")
            setCourseTime("")
            setCourseDate(null)
            setimage("")
        })
    }
    }


    function CoachSelector({ coaches }) {
  
        var y=' ' ;
        if (1)
         {y= <option value="" disabled> اختر اسم المدرّب</option> }
         
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
            <label className="h4"><b>اسم الدورة</b>
                <p className="fontgray">
                    يُرجى عدم تكرار اسم الدورة
                </p>
            </label>
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

            <label className="h4"><b>اسم المدرب</b></label>
            <CoachSelector coaches={coaches} />
                <p>{teacherSSNResponse}</p>

            <label className="h4"><b>تفاصيل الدورة</b></label>
            <input
                className="inputt"
                label="أدخِل تفاصيل الدورة"
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
            <label className="h4"><b>موعد الدورة(ساعة البدء ويوم/أيام الدوام)</b></label>
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

            <label className="h4"><b>تاريخ البدء بالدورة</b></label>
            <input className='inputt'
                type='date'
                name='EventDate'
                placeholder={'03/21/2022'}
                onChange={(date) => {
                    setCourseDate(date.target.value)
                    setCourseDateResponse(null)
                }}
                value={Data.CourseDate}
                required />
                <p>{courseDateResponse}</p>

            <form>
                <div className="form-group">
                    <label className="h4"><b>
                    أضف صوراً للدورة:
                    </b></label>
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
            <p>{response}</p>
        {image}
            
        </div>
        <button className="addbtn3" type="submit"
                onClick={Edit}>
             حفظ التعديل</button>
             </div>
             </div>
    );
}

export default EditCourse;