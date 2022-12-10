import React, { useState, useEffect } from 'react';
import './Form.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import AppNavbarVisitor from '../common/navbar-visitor';

function ResetPassword() {
	const [ Email, setEmail ] = useState('');

	return (
		<div className="form-content-right">
			<AppNavbarVisitor />
			<hr />
			<form className="form" >
				<h1> </h1>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="SSN"
						placeholder="البريد الإلكتروني"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
				</div>

				<button className="form-input-btn" type="submit">
					إرسال{' '}
				</button>
				<br />
				
			</form>
		</div>
	);
}
export default ResetPassword;
