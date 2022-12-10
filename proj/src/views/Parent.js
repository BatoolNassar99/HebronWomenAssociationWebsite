import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppAbout2 from '../Components/home/about2';
import AppContact2 from '../Components/home/contact2';
import * as ReactBootstrap from 'react-bootstrap';
import AppFaq from '../Components/home/faq';
import ImageSlider from '../Components/home/ImageSlider';
import SliderData from '../Components/home/SliderData';
import AppNavbarParent from '../Components/common/navbar-parent';
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavDropdown = ReactBootstrap.NavDropdown;

function Parent() {
	
	return (
		<div>
			<AppNavbarParent />

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
export default Parent;
