import React, { useState } from 'react';
import './Form.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import AppNavbarVisitor from '../common/navbar-visitor';
function FormLogin() {
	const [ SSN, setSSN ] = useState(0);
	const [ TypeID, setTypeID ] = useState(0);
	const [ Password, setPassword ] = useState('');
	const [ loginStatus, setLoginStatus ] = useState(false);

	const history = useHistory();
	Axios.defaults.withCredentials = true;

	const Status = async (SSN) => {
		await Axios.put('http://localhost:3003/getStatus', {
			SSN: SSN
		}).then((response) => {
			if (response.data == 0) {
				swal({
					title: '',
					text: 'الرجاء الانتظار ريثما يقوم المسؤول بتفعيل حسابك',
					icon: 'info',
					button: 'إغلاق'
				});
			} else {
				RoleID(SSN);
			}
		});
	};

	const RoleID = async (SSN) => {
		await Axios.put('http://localhost:3003/getRole', {
			SSN: SSN
		}).then((response) => {
			setTypeID(response.data);
			if (response.data == 1) {
				history.push('/Admin');
			} else if (response.data == 2) {
				history.push('/Parent');
			} else if (response.data == 3) {
				history.push('/Teacher');
			} else if (response.data == 4) {
				history.push('/Trainee');
			} else if (response.data == 5) {
				history.push('/Child');
			} else if (response.data == 6) {
				history.push('/Trainer');
			}
		});
	};

	const login = (e) => {
		e.preventDefault();
		Axios.post('http://localhost:3003/login', {
			SSN: SSN,
			Password: Password
		}).then((response) => {
			if (!response.data.auth) {
				setLoginStatus(false);
				console.log(response.data);
				swal({
					title: 'خطأ!',
					text: response.data.message,
					icon: 'error',
					button: 'إغلاق'
				});
			} else {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('SSN', response.data.result[0].SSN);
				setLoginStatus(true);
				Status(SSN);
				Axios.post('http://localhost:3003/getRole', {
					SSN: localStorage.getItem('SSN')
				}).then((result) => {
					console.log(result.data);

					localStorage.setItem('Role', result.data);
				});
			}
		});
	};

	const userAuthenticeted = () => {
		Axios.get('http://localhost:3003/isUserAuth', {
			headers: {
				'x-access-token': localStorage.getItem('token')
			}
		}).then((response) => {
			console.log(response);
		});
	};

	return (
		<div className="form-content-right">
			<AppNavbarVisitor/>
			<br />
			<form className="form1" onSubmit={login}>
				<h1>تسجيل الدخول </h1>

				<div className="form-inputs1">
					<input
						className="form-input1"
						type="text"
						name="SSN"
						placeholder="رقم الهوية"
						onChange={(e) => setSSN(e.target.value)}
					/>
					<br />
					</div>
					<div className="form-inputs1">

					<input
						className="form-input1"
						type="password"
						name="Password"
						placeholder="كلمة المرور"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button className="form-login-btn1" type="submit">
					تسجيل الدخول
				</button>
				<br />
				<span className="form-input-login1">
					{' '}
					<a href="/ResetPassword"> نسيت كلمة المرور ؟</a>
				</span>
				<hr />
				<span className="form-input-login1">
					{' '}
					<h6>
						{' '}
						ليس لديك حساب ؟ <a href="/signup">إنشاء حساب جديد </a>
					</h6>
				</span>
			</form>
		</div>
	);
}
export default FormLogin;

//				{loginStatus && <button onClick={userAuthenticeted}>Check if authenticated</button>}