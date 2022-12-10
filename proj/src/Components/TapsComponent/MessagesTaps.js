import React, { useState }  from "react";
import IncomingMessages from "../AllTaps/IncomingMessages";
import OutgoingMessages from "../AllTaps/OutgoingMessages";
import NewMessage from "../AllTaps/NewMessage";

const MessagesTaps = () => {
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
  return (
    <div className="MessagesTaps">
     {/* Tab nav */}
     <ul className="nav">
  <li
    className={activeTab === "tab1" ? "active" : ""}
    onClick={handleTab1}
  >
    الرسائل الواردة
  </li>
  <li
    className={activeTab === "tab2" ? "active" : ""}
    onClick={handleTab2}
  >
    الرسائل الصادرة
  </li>
  <li
    className={activeTab === "tab3" ? "active" : ""}
    onClick={handleTab3}
  >
    كتابة رسالة جديدة
  </li>
</ul>

  
      <div className="outlet">
      <div style={{ display: (activeTab==="tab1" ? 'block' : 'none') }}><IncomingMessages /></div>
     <div style={{ display: (activeTab==="tab2" ? 'block' : 'none') }}><OutgoingMessages /></div>
     <div style={{ display: (activeTab==="tab3" ? 'block' : 'none') }}><NewMessage /></div>
</div>
      </div>    
  );
};


export default MessagesTaps;