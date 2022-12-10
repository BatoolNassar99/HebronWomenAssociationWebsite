import React from 'react';
import { Link } from 'react-router-dom';
import { IconName } from "react-icons/bs";
import './service.css';

function AppAbout() {
	return (
		<section className="page-section" id="services">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 text-center">
						<h2 className="section-heading text-uppercase">عن الجمعية </h2>
						<h3>
							هي جمعية غير ربحية ، تعتني بشؤون المرأة من حيث رفع مستواها ثقافياً واجتماعياً ومهنياً وصحياً فهي تحتوي على العديد من الأقسام وهي : {' '}
						</h3>
					</div>
				</div>
				<br />
				<div className="row text-center">
				<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-group fa-stack-1x fa-inverse"/>
						</span>
						<h4 className="service-heading">
							{' '}
							<Link className="navDropdown-item" to="/nurser">
								حضانة نموذجية{' '}
							</Link>{' '}
						</h4>
					</div>

					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-child fa-stack-1x fa-inverse" />
						</span>
						<h4 className="service-heading">
							{' '}
							<Link className="navDropdown-item" to="/kindergarten">
							روضة أطفال{' '}
							</Link>{' '}
						</h4>
					</div>
				
					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-laptop fa-stack-1x fa-inverse" />
						</span>

						<h4 className="service-heading">
							<Link className="navDropdown-item" to="/showc">
								دورات{' '}
							</Link>
						</h4>
					</div>

					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-soccer-ball-o fa-stack-1x fa-inverse" />
						</span>
						<h4 className="service-heading">
							<Link className="navDropdown-item" to="/womentraining">
								قاعة تدريب للنساء{' '}
							</Link>
						</h4>
					</div>
					<div>
						<br />
					</div>
					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary"> </i>
							<i className="fa fa-pagelines fa-stack-1x fa-inverse" />
						</span>
						<h4 className="service-heading">
							<Link className="navDropdown-item" to="/garden">
								منتزه وحديقة{' '}
							</Link>{' '}
						</h4>
					</div>

					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-cutlery fa-stack-1x fa-inverse" />
						</span>
						<h4 className="service-heading">
							<Link className="navDropdown-item" to="/restorent">
								مطعم{' '}
							</Link>{' '}
						</h4>
					</div>

					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-female fa-stack-1x fa-inverse" />
						</span>
						<h4 className="service-heading">
							<Link className="navDropdown-item" to="/palestiniantradition">
								قسم التراث الفلسطيني{' '}
							</Link>{' '}
						</h4>
					</div>

					<div className="col-md-3">
						<span className="fa-stack fa-4x">
							<i className="fa fa-circle fa-stack-2x text-primary" />
							<i className="fa fa-gift fa-stack-1x fa-inverse" />
						</span>
						<h4 className="service-heading">
							<Link className="navDropdown-item" to="/store">
								متجر{' '}
							</Link>{' '}
						</h4>
					</div>
				</div>
			</div>
            <br/>

		</section>
	);
}
export default AppAbout;