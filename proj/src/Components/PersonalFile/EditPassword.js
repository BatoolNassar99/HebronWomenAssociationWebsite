import React, { useState, useEffect } from 'react';
import '../home/Form.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import AppNavbarVisitor from '../common/navbar-visitor';

function EditPassword() {
	const [ Password, setPassword ] = useState('');
	const [ NewPassword, setNewPassword ] = useState('');
	const [ ConfirmPassword, setConfirmPassword ] = useState('');
	const ChangePassword = (e) => {
		e.preventDefault();
        
		Axios.post('http://localhost:3003/CheckPassword', {
			SSN: localStorage.getItem('SSN'),
			Password: Password,
		}).then((response) => {
            console.log(response.data)
			if (response.data) {
				if (NewPassword === ConfirmPassword) {
					Axios.put('http://localhost:3003/EditPassword', {
						SSN: localStorage.getItem('SSN'),
						Password: NewPassword,
					}).then((response) => {
                        console.log(response)
						swal({
							title: 'تم!',
							text: 'تمت العملية بنجاح',
							icon: 'success',
							button: 'إغلاق'
						});
					});
				} else {
					swal({
						title: 'خطأ!',
						text: 'كلمتا المرور غير متطابقتان',
						icon: 'error',
						button: 'إغلاق'
					});
				}
			}
            swal({
                title: 'خطأ!',
                text: 'كلمة المرور خاطئة',
                icon: 'error',
                button: 'إغلاق'
            });
           
		}); 
	};
	return (
		<div className="form-content-right">
			<AppNavbarVisitor />
			<hr />
			<form className="form"onSubmit={(e) => ChangePassword(e)} >
				<h1> تغيير كلمة المرور</h1>

				<div className="form-inputs">
					<input
						className="form-input"
						type="password"
						name="Password"
						placeholder="كلمة المرور الحالية"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<input
						className="form-input"
						type="password"
						name="NewPassword"
						placeholder="كلمة المرور الجديدة"
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<br />

					<input
						className="form-input"
						type="password"
						name="ConfirmPassword"
						placeholder="نأكيد كلمة المرور"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<button className="form-input-btn" type="submit">
					تغيير{' '}
				</button>
				<br />
			</form>
		</div>
	);
}
export default EditPassword;
