import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppAbout2 from '../Components/home/about2';
import AppContact2 from '../Components/home/contact2';
import * as ReactBootstrap from 'react-bootstrap';
import Axios from 'axios';
import AppFaq from '../Components/home/faq';
import ImageSlider from '../Components/home/ImageSlider';
import SliderData from '../Components/home/SliderData';
import AppNavbarChild from '../Components/common/navbar-child';
function Child() {
	const logout = () => {
		localStorage.removeItem('token');
	};
	return (
		<div>
			
				<AppNavbarChild />
		
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
export default Child;
