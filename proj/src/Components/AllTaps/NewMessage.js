import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import RecieverSelector from "./RecieverSelector";
import Select from 'react-select'

const NewMessage = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    <div className="NewMessage">

      <Select options={options} />
      
      <br /><br />
      <input type="text" name="messageAddress" placeholder="عنوان الرسالة" />
      <br /><br />
      <textarea name="message" placeholder={"نص الرسالة.."} />
      <br /><br />
      <input type="submit" value="إرسال" />
    </div>
  );
};

export default NewMessage;