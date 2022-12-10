import React from 'react';
import {TextField} from '@mui/material';


function CourseNotifications() {
    return (
        <div>

            <label><b>
                اسم المرسِل :
            </b>
            </label>
            <input
                type="text"
                className="input"
                placeholder="اسم المرسِل"
            />

        <br />

            <TextField
                className="input"
                label="أدخِل نَصّ الرسالة"
                color="secondary"
                variant="outlined"
                multiline />

        <br />

            <button className="addbtn" type="submit"
                >
                إرسال</button>
                </div>
    );
}

export default CourseNotifications;