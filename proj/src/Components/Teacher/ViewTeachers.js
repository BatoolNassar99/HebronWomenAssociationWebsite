import React, { useState, useEffect } from "react";
import { TextField } from '@mui/material';
import Axios from 'axios';
import AppNavbarAdmin from "../common/navbar-admin";


function ViewTeachers() {
  const [teachrs, setTeachers] = useState([]);



  useEffect(() => {
    Axios.get(
      `http://localhost:3003/getTeachersNames`,
    ).then((result) => {
      setTeachers(result.data)
    });
  }, []);

  return (
    <div className="container p-2">
      <AppNavbarAdmin />


    </div>

  )
}
export default ViewTeachers;