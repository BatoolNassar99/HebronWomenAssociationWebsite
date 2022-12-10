import React, {useState} from "react";


function VisitorEvent(props) {

    const [name, setName] = useState("");
    const [phone, setPhone]= useState("");
    const [show, setShow] = useState(true);
    const [nameResponse, setNameResponse] = useState("")
    const [phoneResponse, setPhoneResponse] = useState("")

    const joinRequest = () => {
    
        if(name === ""){
            setNameResponse("يُرجى إدخال اسمك")

        } else if(phone === ""){
            setPhoneResponse("يُرجى إدخال رقم هاتفك")
        } else {
    alert("تم تقديم طلبك")
    setName("")
    setPhone("")
    setNameResponse("")
    setPhoneResponse("")
    setShow(true)
        }
    }

            return (
        <div className="col-4" key={props.info.ActivityID}>
            <div className="card">
                <div className="card-header">
                    <img style={{ maxWidth: '100%' }} 
                    src={props.info.img} 
                    alt={`صورة لفعالية ${props.info.ActivityName}`} />
                </div>
                <div className="card-body" >
                    <h3>{props.info.ActivityName}</h3>
                    <p> {props.info.Description}</p>
                    <p> {props.info.ActivityTime}</p>
                    <p> {props.info.ActivityDate}</p>
                    <a href={`/showeventimages`} className="btn btn-secondary" >للمزيد من الصور</a>
                    <span> </span>
                    {props.info.Status === 1 ?
                    <button 
                    className="btn btn-secondary" 
                    type="submit" 
                    onClick={ () => {alert("يُرجى إدخال اسمك ورقم هاتفك أسفل الصفحة")
                                setShow(false)}}>
                        طلب انتساب</button> : "" }
                </div>
            </div>

            { show === false ? <div className="add">
        <label><b>الاسم</b></label>
        <input 
                className="input"
                type="text"
                onChange={(e) => {setName(e.target.value)
                                setNameResponse("")}}
                value={name}
        />
        <p>{nameResponse}</p>
        <br />
        <label><b>رقم الهاتف</b></label>
        <input 
                className="input"
                type="text"
                onChange={(e) => {setPhone(e.target.value)
                                setPhoneResponse("")}}
                value={phone}
        />
        <p>{phoneResponse}</p>
        <br />
        <button 
                className="addbtn"
                type="submit"
                onClick={joinRequest}>ارسل طلبك</button>
        </div> : null }
        </div>
        );
}

export default VisitorEvent;