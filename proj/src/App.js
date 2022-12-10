import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import AppFooter from './Components/common/footer';
import Home from './views/home';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppAbout from './Components/home/about';
import FormSignup from './Components/home/FormSignup';
import FormLogin from './Components/home/FormLogin';
import AppContact from './Components/home/contact';
import ShowC from './views/ShowC';
import ShowP from './views/ShowP';
import ShowE from './views/ShowE';
import './Components/Edit/Table.css';
import AddEvent from './Components/Add/AddEvent';
import AddCourse from './Components/Add/AddCourse';
import EditCourse from './Components/Courses/EditCourse';
import EditEventTable from './Components/Edit/EditEventTable';
import EditEvent from './Components/Edit/EditEvent';
import EditProductsTable from './Components/Edit/EditProductsTable';
import EditProduct from './Components/Edit/EditProduct'
import AddProducts from './Components/ProductsTaps/AddProducts';
import Nursery from './Components/services/Nursery';
import Kindergarten from './Components/services/Kindergarten';
import PalestinianTradition from './Components/services/PalestinianTradition';
import Restorent from './Components/services/Restorent';
import Garden from './Components/services/Garden';
import WomenTraining from './Components/services/WomenTraining';
import PicturesP from './Components/Show/PicturesP';
import PicturesC from './Components/Show/PicturesC';
import PicturesE from './Components/Show/PicturesE';
import Teacher from './views/Teacher';
import Child from './views/Child';
import Admin from './views/Admin';
import Parent from './views/Parent';
import Trainer from './views/Trainer';
import Trainee from './views/Trainee';
import AddAdmin from './Components/Add/AddAdmin';
import PersonalFile from './Components/PersonalFile/PersonalFile';
import ParentPersonalFile from './Components/PersonalFile/ParentPersonalFile';
import ChildPersonalFile from './Components/PersonalFile/ChildPersonalFile';
import ImageSlider from './Components/home/ImageSlider';
import AppFaq from './Components/home/faq';
import EditCourseTable from './Components/Courses/EditCourseTable';
import ReportsTable from './Components/Reports/ReportsTable';
import AccountsTaps from './Components/TapsComponent/AccountsTaps';
import SliderData from './Components/home/SliderData';
import AppNavbarVisitor from './Components/common/navbar-visitor';
import AppNavbarAdmin from './Components/common/navbar-admin';
import AppNavbarParent from './Components/common/navbar-parent';
import AppNavbarChild from './Components/common/navbar-child';
import AppNavbarTeacher from './Components/common/navbar-teacher';
import AppNavbarTrainer from './Components/common/navbar-trainer';
import AppNavbarTrainee from './Components/common/navbar-trainee';
import ResetPassword from './Components/home/resetPassword';
import ViewStudents from './Components/Teacher/ViewStudents';
import AddSection from './Components/Teacher/AddSection';
import AddStudents from './Components/Teacher/AddStudents';
import EditStudentSec from './Components/Teacher/EditStudentSec';
//import CourseRequests from './Components/Requests/CourseRequests';
//import EventsRequests from './Components/Requests/EventsRequests';
//import NewAccountRequests from './Components/Requests/NewAccountRequests';
import TrainerCourses from './Components/Trainer/TrainerCourses';
import CourseAbsent from './Components/Trainer/CourseAbsent';
import CourseNotifications from './Components/Trainer/CourseNotifications';
import TraineeCourse from './Components/Trainee/TraineeCourse';
import ShowStoreVisitor from "./views/ShowStoreVisitor";
import ShowVisitorEvent from './views/ShowVisitorEvent';
import TeacherF from './Components/Teacher/TeacherF';


function App() {
  return (
    <Router>
      <div className="Container">
        <Layout className="mainLayout">
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/Teacher">
            <Teacher />
          </Route>
          <Route exact path="/Admin">
            <Admin />
          </Route>
          <Route exact path="/Parent">
            <Parent />
          </Route>
          <Route exact path="/Child">
            <Child />
          </Route>
          <Route exact path="/Trainee">
            <Trainee />
          </Route>
          <Route exact path="/Trainer">
            <Trainer />
          </Route>
          <Route path="/myStudent">
            <Teacher />
          </Route>
          <Route path="/about">
            <AppAbout />
          </Route>
          <Route path="/contact">
            <AppContact />
          </Route>
          <Route path="/ResetPassword">
            <ResetPassword />
          </Route>
          <Route path="/slider">
            <ImageSlider slides={SliderData} />
          </Route>
          <Route path="/questions">
            <AppFaq />
          </Route>
          <Route path="/PersonalFile">
            <PersonalFile />
          </Route>
          <Route path="/ParentPersonalFile">
            <ParentPersonalFile />
          </Route>
          <Route path="/ChildPersonalFile">
            <ChildPersonalFile />
          </Route>

          <Route path="/reportstable">
            <ReportsTable />
          </Route>
          <Route path="/accountstabs">
            <AccountsTaps />
          </Route>
          <Route path="/AddAdmin">
            <AddAdmin />
          </Route>
          <Route path="/signup">
            <FormSignup />
          </Route>
          <Route path="/login">
            <FormLogin />
          </Route>

          <Route path="/showc">
            <ShowC />
          </Route>

					
          <Route path="/addcourse">
            <AddCourse />
          </Route>
          <Route path="/store">
            <ShowP />
          </Route>
          <Route path="/store/:id">
            <PicturesP />
          </Route>
          <Route path="/editproduct">
            <EditProductsTable />
          </Route>
          <Route path="/editproduct2">
            <EditProduct />
          </Route>
          <Route path="/addproducts">
            <AddProducts />
          </Route>
          <Route path="/showe">
            <ShowE />
          </Route>
          <Route path="/showeActivityImg">
            <PicturesE />
          </Route>
          <Route path="/editevent">
            <EditEventTable />
          </Route>
          <Route path="/editevent2">
            <EditEvent />
          </Route>
          <Route path="/addevent">
            <AddEvent />
          </Route>
          <Route path="/nurser">
            <Nursery />
          </Route>
          <Route path="/kindergarten">
            <Kindergarten />
          </Route>
          <Route path="/palestiniantradition">
            <PalestinianTradition />
          </Route>
          <Route path="/restorent">
            <Restorent />
          </Route>
          <Route path="/garden">
            <Garden />
          </Route>
          <Route path="/womentraining">
            <WomenTraining />
          </Route>

          <Route path="/editcourse">
            <EditCourseTable/>
          </Route>

          <Route path="/editcourse2">
            <EditCourse />
          </Route>

          <Route path="/showc/coursename" ><PicturesC /></Route>

          <Route path="/store/productname" ><PicturesP /></Route>


          <Route path="/showe/activityname" ><PicturesE /></Route>

          <Route path="/viewStudents"><ViewStudents /></Route>

          <Route path="/addSections"><AddSection /></Route>

          <Route path="/addStudents"><AddStudents /></Route>

          <Route path="/editStudentSec"><EditStudentSec /></Route>

        {/*
      <Route path="/coursereq" ><CourseRequests /></Route>
      <Route path="/eventreq" ><EventsRequests /></Route>
        */}
        
      <Route path="/trainercourses" ><TrainerCourses /></Route>
      <Route path="/courseabsent/:courseID" ><CourseAbsent /></Route>
      <Route path="/coursenotifications" ><CourseNotifications /></Route>
      <Route path="/traineecourse" ><TraineeCourse /></Route>

      <Route path="/storevisitor" ><ShowStoreVisitor /></Route>
      <Route path="/showvisitorevent" ><ShowVisitorEvent /></Route>

      <Route exact path="/TeacherStudent">
            <TeacherF />
          </Route>






          <AppFooter />
        </Layout>
      </div>
    </Router>
  );
}

export default App;


/*
          <Route path="/editcourse">
            <EditCourseTable />
          </Route>
          <Route path="/editcourse2/:id">
            <EditCourse />
          </Route>
<Route path="/editcourse">
            <EditCourse />
          </Route
          */