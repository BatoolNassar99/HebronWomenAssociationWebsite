import React from 'react';
import AppNavbarAdmin from './navbar-admin';
import AppNavbarChild from './navbar-child';
import AppNavbarParent from './navbar-parent';
import AppNavbarTeacher from './navbar-teacher';
import AppNavbarTrainee from './navbar-trainee';
import AppNavbarTrainer from './navbar-trainer';
import AppNavbarVisitor from './navbar-visitor';

function Navbar() {

    return (
        <div>
            {localStorage.getItem('Role') == 0 && (
                <div>
                    <AppNavbarVisitor />
                </div>
            )}
            {localStorage.getItem('Role') == 1 && (
                <div>
                    <AppNavbarAdmin />
                </div>
            )}
            {localStorage.getItem('Role')== 2 && (
                <div>
                    <AppNavbarParent />
                </div>

)}
{localStorage.getItem('Role') == 3 && (
    <div>
        <AppNavbarTeacher />
    </div>
)}
{localStorage.getItem('Role') == 4 && (
    <div>
        <AppNavbarTrainee />
    </div>
)}
{localStorage.getItem('Role')== 5 && (
    <div>
        <AppNavbarChild />
    </div>
)}
{localStorage.getItem('Role') == 6 && (
    <div>
        <AppNavbarTrainer />
    </div>
)}
</div>
);
}
export default Navbar;
