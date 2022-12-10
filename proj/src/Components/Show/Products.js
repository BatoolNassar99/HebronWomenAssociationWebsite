import React, {useState} from "react";

function Products(props) {

    const [userQuantity, setUserQuantity] = useState(0);

    const payRequest = () => {
        if(userQuantity <= 0){
            alert("يُرجى إدخال قيمة موجبة");
        } else{
    props.info.Quantity >= userQuantity ? alert("تم تقديم طلبك") : 
    alert("نأسف لرفض طلبك ولكن الكمية المطلوبة غير متوفرة");

    setUserQuantity(0)
        }
    }

    return (
        <div className="store">
        <div className="col-4" key={props.info.ItemID}>
        <div className="card" style={{ maxWidth: '70%', maxHeight: '100%', width: '100%', height: '30vw'}}>
                <div className="card-header">
                    <img style={{ maxWidth: '100px', maxHeight: '200px', marginRight: '25%' }} 
                    src={`/images/${props.info.img}`} 
                    alt={`صورة ل ${props.info.Name}`} />
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
                    <input type="text"
                            onChange = {(event) =>
                            {setUserQuantity(event.target.value)}}
                            value={userQuantity}
                            />
                            </div>
                    <div className="col-md-6"
                    style={{padding: 10,
                        textAlign: "center"}}>       
                    <button 
                    className="btn btn-secondary" 
                    style={{textAlign: "center"}}
                    type="submit" 
                    onClick={payRequest}>
                        طلب شراء</button>
                        </div>
                        </div>
                        </div>

                        </div>
                </div>
            </div>
            </div>
    );
}

export default Products;