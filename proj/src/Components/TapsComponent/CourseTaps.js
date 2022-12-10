import React, { useState }  from "react";
import AddCourse from "../Add/AddCourse";
import EditCourse from "../Edit/EditCourse";


const CourseTaps = () => {

  const [activeTab, setActiveTab] = useState("tab1");
    //  Functions to handle Tab Switching
    const handleTab1 = () => {
      // update the state to tab1
      setActiveTab("tab1");
    };
    const handleTab2 = () => {
      // update the state to tab2
      setActiveTab("tab2");
    };
    
  return (
    <div className="Taps">
     {/* Tab nav */}
     <ul className="nav">
  <li
    className={activeTab === "tab1" ? "active" : ""}
    onClick={handleTab1}
  >
إضافة دورة جديدة
  </li>
  <li
    className={activeTab === "tab2" ? "active" : ""}
    onClick={handleTab2}
  >
      تعديل الدورة
  </li>
  
</ul>

  
      <div className="outlet">
      {activeTab === "tab1" ? <AddCourse/> : <EditCourse />}
</div>
      </div>    
  );
};


export default CourseTaps;