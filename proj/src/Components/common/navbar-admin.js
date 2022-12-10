import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavDropdown = ReactBootstrap.NavDropdown;

function AppNavbarAdmin() {
	const [ data1, setData1 ] = useState([]);
	const [ Type, setType ] = useState('');
	const [ SSN, setSSN ] = useState(0);
	const [ time, setTime ] = useState(Date.now());
	var date = new Date().toLocaleString('fr-CH').split(',');
	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	useEffect(
		() => {
			setSSN(localStorage.getItem('SSN'));
			Axios.post(`http://localhost:3003/getType`, {
				SSN: localStorage.getItem('SSN')
			}).then((result) => {
				setData1(result.data);
			});
		},
		[ SSN ]
	);
    const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('SSN');
		localStorage.setItem('Role',0);

	};
	return (
        <div>
		<Navbar className="nav" bg="light" variant="primary" expand="sm" sticky="top">
					<a href="/">
						<img src="./img/home.png" width="75px" height="40px" alt="home" />{' '}
					</a>
					<Navbar.Collapse>
					<NavDropdown title="">
						{data1.map((item) => (
							<NavDropdown.Item key={Math.random()} value={item.Description}>
								{' '}
								{item.Description}
							</NavDropdown.Item>
						))}
					</NavDropdown>
						<Nav.Link href="/PersonalFile">الملف الشخصي</Nav.Link>

						<Nav.Link path="/about">عن الجمعية </Nav.Link>

						<NavDropdown title="إدارة العمليات ">
							<NavDropdown.Item href="/reportstable"> التقارير </NavDropdown.Item>
							<NavDropdown.Item href="/accountstabs">الحسابات </NavDropdown.Item>
						</NavDropdown>

						<NavDropdown title="الروضة">
							<NavDropdown.Item href="/viewStudents"> عرض الطلاب </NavDropdown.Item>
							<NavDropdown.Item href="/addSections"> إضافة شعبة </NavDropdown.Item>
							<NavDropdown.Item href="/addStudents"> إضافة طلاب إلى شعبة </NavDropdown.Item>
						</NavDropdown>

						<NavDropdown title="الدورات">
							<NavDropdown.Item href="/showc"> عرض الدورات </NavDropdown.Item>
							<NavDropdown.Item href="/editcourse"> تعديل الدورات</NavDropdown.Item>
							<NavDropdown.Item href="/addcourse"> إضافة دورة جديدة </NavDropdown.Item>
						</NavDropdown>

						<NavDropdown title="المنتجات">
							<NavDropdown.Item href="/store"> عرض المنتجات </NavDropdown.Item>
							<NavDropdown.Item href="/editproduct"> تعديل المنتجات </NavDropdown.Item>
							<NavDropdown.Item href="/addproducts"> إضافة منتج جديد </NavDropdown.Item>
						</NavDropdown>

						<NavDropdown title="الفعاليات">
							<NavDropdown.Item href="/showe"> عرض الفعاليات </NavDropdown.Item>
							<NavDropdown.Item href="/editevent"> تعديل الفعاليات </NavDropdown.Item>
							<NavDropdown.Item href="/addevent"> إضافة فعالية جديدة </NavDropdown.Item>
						</NavDropdown>

						<Nav.Link href="/contact">التواصل </Nav.Link>
					</Navbar.Collapse>
					<label className="labelForDate"> الوقت : {date[1]}</label>
					<label className="labelForDate">التاريخ: {date[0]} </label>
					<a className="btn-sign-in-up" href="/login" onClick={logout}>
						تسجيل الخروج{' '}
					</a>
				</Navbar>
				<div className="logo-div">
					{' '}
					<img src="./img/logo1.png" alt="logo" className="logo1" />{' '}
					<img src="./img/logo2.png" alt="logo" className="logo2" />{' '}
				</div>
                </div>
	);
}
export default AppNavbarAdmin;
