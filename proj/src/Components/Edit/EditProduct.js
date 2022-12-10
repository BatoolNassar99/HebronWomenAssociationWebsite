
import React, { useEffect, useState } from "react";
import { TextField } from '@mui/material';
import Datepicker from 'react-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import Axios from "axios";
//import './Add.css';
import swal from 'sweetalert';

import AppNavbarAdmin from "../common/navbar-admin";

function EditProduct() {

    const [ItemID, setItemID] = useState(0);
    const [Data, setData] = useState([]);

    const [text, setText] = useState('');
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [ProducerName, setProducerName] = useState("");
    const [ProducerPhone, setProducerPhone] = useState("");
    const [image, setimage] = useState('');
    const [response, setresponse] = useState("")
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const Edit = async (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:3003/editproduct`, {
            ItemID: ItemID,
            text: text,
            Description: Description,
            Price: Price,
            Quantity: Quantity,
            ProducerName: ProducerName,
            ProducerPhone: ProducerPhone,
        }).then(() => {
            swal({
                title: 'تم!',
                text: 'تمّ تعديل المنتج بنجاج',
                icon: 'success',
                button: 'إغلاق'
            })
        })
    }

    const fetchData = () => {
        setItemID(localStorage.getItem('ProductID'));
        console.log(ItemID)
        Axios.put(`http://localhost:3003/fetchproductdata`, {
            ItemID: localStorage.getItem('ProductID'),
        }).then((result) => {
            console.log(result)
            setData(result.data[0])
            const x = result.data[0];
            setText(x.Name);
            setDescription(x.Description);
            setPrice(x.Price);
            setQuantity(x.Quantity);
            setProducerName(x.ProducerName);
            setProducerPhone(x.ProducerPhone);

            //setActivityDate(x.ActivityDate);
            //setCourseDate(Data.CourseDate);
            //setimage(Data.CourseImage);
        });
    };
    useEffect(
        () => {
            fetchData();
        },
        [ItemID]
    );


    useEffect(() => {
        const loadUsers = async () => {
            const response = await Axios.get('http://localhost:3003/store');
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
        console.log('لقد قمت باختيار صورة/مجموعة صور')
        setimage(event.target.files[0])
    }

    const AddNewProducts = () => {
        if (text === "" || Description === "" ||
            Price == 0 || Quantity == 0 || ProducerName === ""
            || ProducerPhone === "" || image === '') {
            setresponse('يرجى تعبئة الحقول الفارغة');
        } else {
            const formData = new FormData()
            formData.append("Name", text)
            formData.append("Description", Description)
            formData.append("Price", Price)
            formData.append("Quantity", Quantity)
            formData.append("ProducerName", ProducerName)
            formData.append("ProducerPhone", ProducerPhone)
            formData.append("ItemImage", image)
            Axios.post('http://localhost:3003/addnewitem', formData
            ).then(() => {
                alert("تمت الإضافة بنجاح")
            }).then(() => {
                setText("")
                setDescription("")
                setPrice(0)
                setQuantity(0)
                setProducerName("")
                setProducerPhone("")
                setimage('')
            })
        }
    }

    return (
        <div>
            <AppNavbarAdmin />
            <div className="row1">
                <div className="column1">
                    <label className="h4"><b>اسم المنتج:</b>
                        
                    </label>
                    <input
                        className="inputt"
                        type="text"
                        placeholder=" اسم المنتج"
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
                            onClick={() => onSuggestHandler(suggestion.Name)}>
                            {suggestion.Name}</div>
                    )}

                    <label className="h4"><b>تفاصيل المنتج:</b></label>
                    <input
                        className="inputt"
                        label="أدخِل تفاصيل المنتج"
                        color="secondary"
                        variant="outlined"
                        value={Description}
                        multiline
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }} />

                    <label className="h4"><b>الكمية:</b></label>
                    <input
                        className="inputt"
                        type="number"
                        placeholder=" الكمية"
                        value={Quantity}
                        onChange={(event) => {
                            setQuantity(event.target.value);
                        }} />

                    <label className="h4"> <b>السعر:</b>
                        <p className="fontgray">
                            سعر القطعة الواحدة (بالشيقل)</p>
                    </label>
                <input
                    className="inputt"
                    type="number"
                    placeholder=" السعر"
                    value={Price}
                    onChange={(event) => {
                        setPrice(event.target.value);
                    }} />
                                    </div>


                <div className="column2">
                <label className="h4"><b>
                    اسم صانع المنتج :
                </b></label>
                <input
                    className="inputt"
                    type="text"
                    placeholder=" اسم صانع المنتج"
                    value={ProducerName}
                    onChange={(event) => {
                        setProducerName(event.target.value);
                    }} />

                <label className="h4"><b>
                    رقم هاتف المنتِج :
                </b></label>
                <input
                    className="inputt"
                    type="text"
                    placeholder=" رقم هاتف المنتِج"
                    value={ProducerPhone}
                    onChange={(event) => {
                        setProducerPhone(event.target.value);
                    }} />

                <form>
                    <div className="form-group">
                        <label className="h4"><b>
                             أضف صورة أو مجموعة صور لهذا المنتَج: 
                        </b></label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple={true}
                            className="inputt"
                            id="customFile"
                            onChange={setdatavalues} />
                    </div>
                </form>
                <h4>{response}</h4>
                <br />

                <button
                    className="addbtn2"
                    type="submit"
                    onClick={Edit}>
                    تعديل</button>
</div>
            </div>
        </div>
    );
}
export default EditProduct;

