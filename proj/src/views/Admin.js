import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Axios from 'axios';
import AppAbout2 from '../Components/home/about2';
import AppFaq from '../Components/home/faq';
import AppContact2 from '../Components/home/contact2';
import ImageSlider from '../Components/home/ImageSlider';
import SliderData from '../Components/home/SliderData';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppNavbarAdmin from '../Components/common/navbar-admin';
import { Layout } from 'antd';
import ShowC from './ShowC';
import PersonalFile from '../Components/PersonalFile/PersonalFile';

function Admin() {
	return (
		<div className="main">
			<AppNavbarAdmin />

			<Router>
				<div className="Container">
					<Layout className="mainLayout">
						<Route>
							<ImageSlider slides={SliderData} />
						</Route>
						<Route path="/PersonalFile">
							{' '}
							<PersonalFile />
						</Route>
						<Route path="/about">
							<AppAbout2/>
						</Route>
						<Route path="/contact">
							<AppContact2/>
						</Route>
						<Route path="/showc">
							<ShowC />
						</Route>
						<Route exact>
							<AppFaq />
						</Route>
					</Layout>
				</div>
			</Router>
		</div>
	);
}
export default Admin;
