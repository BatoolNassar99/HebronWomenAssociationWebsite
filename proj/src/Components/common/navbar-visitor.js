import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

function AppNavbarVisitor() {
	const [time, setTime] = useState(Date.now());
	var date = new Date().toLocaleString('fr-CH').split(',');
	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	const reset = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('SSN');
		localStorage.setItem('Role', 0);

	}
	return (
		<div>
			<div>
				<Navbar className="nav" bg="light" variant="primary" expand="sm" sticky="top">
					<a href="/">
						<img src="./img/home.png" width="75px" height="40px" alt="home" />{' '}
					</a>
					<Navbar.Collapse>
						<Nav.Link href="/about">عن الجمعية </Nav.Link>

						<Nav.Link href="/showc">الدورات </Nav.Link>

						<Nav.Link href="/store"> المنتجات </Nav.Link>

						<Nav.Link href="/showe"> الفعاليات </Nav.Link>

						<Nav.Link href="/contact">التواصل </Nav.Link>
					</Navbar.Collapse>
					<label className="labelForDate"> الوقت : {date[1]}</label>
					<label className="labelForDate">التاريخ: {date[0]} </label>
					<a className="btn-sign-in-up" href="/signup" onClick={reset}>
						التسجيل{' '}
					</a>
					<a className="btn-sign-in-up" href="/login" onClick={reset}>
						تسجيل الدخول{' '}
					</a>
				</Navbar>
			</div>

			<div className="logo-div">
				{' '}
				<img src="./img/logo1.png" alt="logo" className="logo1" />{' '}
				<img src="./img/logo2.png" alt="logo" className="logo2" />{' '}
			</div>
		</div>
	);
}
export default AppNavbarVisitor;
