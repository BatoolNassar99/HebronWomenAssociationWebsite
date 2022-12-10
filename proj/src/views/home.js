import React, { useState, useEffect } from 'react';
import AppAbout2 from '../Components/home/about2';
import AppFaq from '../Components/home/faq';
import AppContact2 from '../Components/home/contact2';
import ImageSlider from '../Components/home/ImageSlider';
import SliderData from '../Components/home/SliderData';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import AppNavbarVisitor from '../Components/common/navbar-visitor';

function Home() {
	return (
		<div>
			<AppNavbarVisitor />
			<Router>
				<Route>
					<ImageSlider slides={SliderData} />
				</Route>
				<Route>
					<AppAbout2 />
				</Route>
				<Route>
					<AppFaq />
				</Route>
			</Router>
		</div>
	);
}

export default Home;
