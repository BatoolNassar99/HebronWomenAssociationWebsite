import React, {useState} from "react";

function StoreVisitor(props) {

    const [userQuantity, setUserQuantity] = useState(0);
    const [name, setName] = useState("");
    const [phone, setPhone]= useState("");
    const [show, setShow] = useState(true);
    const [nameResponse, setNameResponse] = useState("")
    const [phoneResponse, setPhoneResponse] = useState("")

    const payRequest = () => {
        
        if(name === ""){
            setNameResponse("يُرجى إدخال اسمك")

        } else if(phone === ""){
            setPhoneResponse("يُرجى إدخال رقم هاتفك")
        } else {
    alert("تم تقديم طلبك")
    setUserQuantity(0)
    setName("")
    setPhone("")
    setNameResponse("")
    setPhoneResponse("")
    setShow(true)
        }
    }
    
    const PhoneAndNameRequest = ()  => {
        if(userQuantity <= 0){
            alert("يُرجى إدخال قيمة موجبة");
        } else if(props.info.Quantity >= userQuantity){
            alert("يُرجى إدخال اسمك ورقم هاتفك أسفل الصفحة")
            setShow(false)
        } else {
            alert("نأسف لرفض طلبك ولكن الكمية المطلوبة غير متوفرة");
        }
    }
    return (
        <div className="col-4" key={props.info.ItemID}>
            <div className="card">
                <div className="card-header">
                    <img style={{ maxWidth: '100%' }} src={`/images/${props.info.img}`} alt={`صورة ل ${props.info.Name}`} />
                </div>
                <div className="card-body" >
                    <h2>{props.info.Name}</h2>
                    <h6>{props.info.Description}</h6>
                    <h6>{"السّعر: "+ props.info.Price}</h6>
                    <h6>{"الكميّة المتوفّرة: "+ props.info.Quantity}</h6>

                    <div className="container"> 
                    <div className="row">
                        <div className="col-md-6">
                        يُرجى تحديد الكمية التي تريد شراءها :
                    <input type="number"
                            onChange = {(event) =>
                            {setUserQuantity(event.target.value)}}
                            value={userQuantity}
                            />
                            </div>
                    <div className="col-md-6"
                    style={{padding: 10,
                        textAlign: "center"}}>       
                    { show === true ? <button 
                    className="btn btn-secondary" 
                    style={{textAlign: "center"}}
                    type="submit" 
                    onClick={PhoneAndNameRequest}>
                        طلب شراء</button> : null }
                        </div>
                        </div>
                        </div>

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
                onClick={payRequest}>ارسل طلبك</button>
        </div> : null }
            </div>
    );
}

export default StoreVisitor;