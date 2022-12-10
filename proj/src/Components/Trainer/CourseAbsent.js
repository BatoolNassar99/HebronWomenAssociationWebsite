import React, {useState} from "react";
import TackCourseAbsent from "./TackCourseAbsent";
import ViewCourseAbsent from "./ViewCourseAbsent";

const CourseAbsent = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    return (
        <div className="AccountsTaps">
            <ul className="nav">
                <li
                    className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}
                >
                عرض المنتسبين للدورة  
                </li>

                <li
                    className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}
                >
                    تسجيل الحضور والغياب
                </li>
            </ul>


            <div className="outlet">
                <div style={{ display: (activeTab === "tab1" ? 'block' : 'none') }}><TackCourseAbsent /></div>
                <div style={{ display: (activeTab === "tab2" ? 'block' : 'none') }}><ViewCourseAbsent /></div>
            </div>
        </div>
    );
};


export default CourseAbsent;