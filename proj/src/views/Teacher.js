import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppAbout2 from '../Components/home/about2';
import AppContact2 from '../Components/home/contact2';
import * as ReactBootstrap from 'react-bootstrap';
import AppFaq from '../Components/home/faq';
import ImageSlider from '../Components/home/ImageSlider';
import SliderData from '../Components/home/SliderData';
import AppNavbarTeacher from '../Components/common/navbar-teacher';
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

function Teacher() {
	
	return (
		<div>
			<Route exact>
				<AppNavbarTeacher />
			</Route>
			<Route exact>
				<ImageSlider slides={SliderData} />
			</Route>
			<Route exact>
				<AppAbout2 />
			</Route>
			<Route exact>
				<AppContact2 />
			</Route>
			<Route exact>
				<AppFaq />
			</Route>
		</div>
	);
}
export default Teacher;
