import React, { useState }  from "react";
import TeachersAccounts from "../AllTaps/TeachersAccounts";
import TraineeAccounts from "../AllTaps/TraineeAccounts";
import ParentsAccounts from "../AllTaps/ParentsAccounts";
import StudentsAccounts from "../AllTaps/StudentsAccounts";
import TrainersAccountsTable from "../Accounts/TrainersAccountsTaple";
import NotActiveAccounts from "../Accounts/NotActiveAccounts";
import AppNavbarAdmin from "../common/navbar-admin";

const AccountsTaps = () => {
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
    const handleTab3 = () => {
      // update the state to tab3
      setActiveTab("tab3");
    };
    const handleTab4 = () => {
      // update the state to tab4
      setActiveTab("tab4");
    };
    const handleTab5 = () => {
      // update the state to tab5
      setActiveTab("tab5");
    };
    const handleTab6 = () => {
      // update the state to tab6
      setActiveTab("tab6");
    };
  return (
    <div>
     {/* Tab nav */}
     <AppNavbarAdmin />
<div className="accounts">
     <ul className="nav">
  <li
    className={activeTab === "tab1" ? "active" : ""}
    onClick={handleTab1}
  >
حسابات المدرسين
  </li>
  <li
    className={activeTab === "tab5" ? "active" : ""}
    onClick={handleTab5}
  >
حسابات المدرّبين
  </li>
  <li
    className={activeTab === "tab4" ? "active" : ""}
    onClick={handleTab4}
  >
حسابات الطلاب
  </li>
  <li
    className={activeTab === "tab2" ? "active" : ""}
    onClick={handleTab2}
  >
حسابات المتدرّبين
  </li>
  <li
    className={activeTab === "tab3" ? "active" : ""}
    onClick={handleTab3}
  >
حسابات أولياء الأمور
  </li>
  <li
    className={activeTab === "tab6" ? "active" : ""}
    onClick={handleTab6}
  >
حسابات غير مفعلة
  </li>
</ul>
</div>
  
    <div className="outlet">
      <div style={{ display: (activeTab==="tab1" ? 'block' : 'none') }}><TeachersAccounts /></div>
     <div style={{ display: (activeTab==="tab2" ? 'block' : 'none') }}><TraineeAccounts /></div>
     <div style={{ display: (activeTab==="tab3" ? 'block' : 'none') }}><ParentsAccounts /></div>
     <div style={{ display: (activeTab==="tab4" ? 'block' : 'none') }}><StudentsAccounts /></div>
     <div style={{ display: (activeTab==="tab5" ? 'block' : 'none') }}><TrainersAccountsTable/></div>
     <div style={{ display: (activeTab==="tab6" ? 'block' : 'none') }}><NotActiveAccounts /></div>

    </div>
      </div>    
  );
};


export default AccountsTaps;