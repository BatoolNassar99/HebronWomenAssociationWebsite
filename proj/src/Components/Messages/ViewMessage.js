import React from 'react';

export const ViewMessage = () => {
  return(
    <div>
      <h1> تفاصيل الرسالة </h1>
  <br/><br/><br/><br/>
      <label>
  اسم المرسل: 
    <input type="text" name="name" />
  </label>
  <br/><br/><br/><br/>
  <label>
  تاريخ الرسالة:  
    <input type="text" name="dateOfMessage" />
  </label>
  <br/><br/><br/><br/>
  <label>
  نص الرسالة:
    <input type="textfeild" name="name" />
  </label>
    </div>
  )
}
export default ViewMessage;