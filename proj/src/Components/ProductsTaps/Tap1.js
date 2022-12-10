import React from "react";
import {TextField} from '@mui/material';


function Tap1 (){
    return(
        <div>
            <h2>
            اسم المنتج :
            </h2>
            <br />
            <input type="text" placeholder=" اسم المنتج" />
            <br />
            <p>تفاصيل المنتج:</p>
            <br />

            <TextField 
            label="أدخِل تفاصيل المنتج"
            color="secondary"
            variant="outlined"
            multiline/>
            
            <br />
            <select className="custom-select">
            <option value=".."> 
                  ..
                    </option>
                  <option value="تطريز"> 
                  تطريز
                    </option>

                  <option value="منتج 1">
                      منتج1
                      </option>
                   
                  <option value="منتج 2">
                      منتج 2
                      </option>

                </ select>
                <br />
                <form>
  <div class="form-group">
  <br />
<input type="file" class="form-control" id="customFile" />
  
  </div>
</form> 
            <br /> <br />
            <button className="btn btn-primary">  حفظ</button>

            
        </div>
    );
}
export default Tap1;
