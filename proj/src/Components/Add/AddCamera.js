import React from "react";

function AddCamera (){
    return(
        <div>
            <h2>
        الموقع :
            </h2>
            <br />
            <input type="text" placeholder="الموقع" />
            <br />
            <p> عنوان الكاميرا :</p>
            <br />
            <input type="text" placeholder=" عنوان الكاميرا" />
            
            <br /> <br />
            <button className="btn btn-primary">  حفظ</button>

            
        </div>
    );
}
export default AddCamera;