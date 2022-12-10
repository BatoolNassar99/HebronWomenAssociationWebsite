import React, { useState }  from "react";
import AddProducts from "../ProductsTaps/AddProducts";
import EditProducts from "../ProductsTaps/EditProduct";



const ProductsTaps = () => {

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
إضافة منتج جديد
  </li>
  <li
    className={activeTab === "tab2" ? "active" : ""}
    onClick={handleTab2}
  >
      تعديل المنتج
  </li>
  
</ul>

  
      <div className="outlet">
      {activeTab === "tab1" ? <AddProducts/> : <EditProducts />}
</div>
      </div>    
  );
};


export default ProductsTaps;