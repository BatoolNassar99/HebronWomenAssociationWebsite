import React, { useState, useEffect } from 'react';
import './Form.css';
import Axios from 'axios';
import swal from 'sweetalert';
import AppNavbarParent from '../common/navbar-parent';

const ParentPersonalFile = () => {
	const [ SSN, setSSN ] = useState('');
	const [ UserName, setUserName ] = useState('');
	const [ FullName, setFullName ] = useState('');
	const [ Email, setEmail ] = useState('');
	const [ Address, setAddress ] = useState('');
	const [ PlaceBirdth, setPlaceBirdth ] = useState('');
	const [ Phone, setPhone ] = useState('');
	const [ DateOfBirdth, setDateOfBirdth ] = useState('');
	const [ ChildSSN, setChildSSN ] = useState('');
	const [ Password, setPassword ] = useState('');
	const [ NewPassword, setNewPassword ] = useState('');
	const [ ConfirmPassword, setConfirmPassword ] = useState('');
	useEffect(
		() => {
			const getData = (e) => {
				setSSN(localStorage.getItem('SSN'));
				console.log('SSN', SSN);
				Axios.put(`http://localhost:3003/ParentPersonalFile1`, {
					SSN: localStorage.getItem('SSN')
				}).then((result) => {
					//  if(result.length>0){
					console.log('result', result.data[0]);
					const profile = result.data[0];
					setUserName(profile.UserName);
					setFullName(profile.FullName);
					setEmail(profile.Email);
					setAddress(profile.Address);
					setPlaceBirdth(profile.PlaceBirdth);
					setPhone(profile.Phone);
					setDateOfBirdth(profile.DateOfBirdth);
					setChildSSN(profile.ChildSSN);
					//     }
				});
			};
			getData();
		},
		[ SSN ]
	);

	const ChangePassword = (e) => {
		e.preventDefault();

		Axios.post('http://localhost:3003/CheckPassword', {
			SSN: localStorage.getItem('SSN'),
			Password: Password
		}).then((response) => {
			console.log(response.data);
			if (response.data) {
				if (NewPassword === ConfirmPassword) {
					Axios.put('http://localhost:3003/EditPassword', {
						SSN: localStorage.getItem('SSN'),
						Password: NewPassword
					}).then((response) => {
						console.log(response);
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
	const onSubmit = async (e) => {
		e.preventDefault();
		await Axios.put(`http://localhost:3003/ParentPersonalFile`, {
			SSN: SSN,
			UserName: UserName,
			FullName: FullName,
			Email: Email,
			Address: Address,
			PlaceBirdth: PlaceBirdth,
			Phone: Phone,
			DateOfBirdth: DateOfBirdth,
			ChildSSN: ChildSSN
		}).then((response) => {
			console.log(response);
			swal({
				title: 'تم التعديل',
				text: '',
				icon: 'success',
				button: 'إغلاق'
			});
		});
	};

	return (
		<div>
			{' '}
			<AppNavbarParent />
			<div className="PersonalInfoForm1">
				<br></br>
				<form onSubmit={(e) => onSubmit(e)}>
					<h1>الملف الشخصي </h1>
					<div className="rightt">
						<h3>المعلومات الشخصية</h3>
						<div className="PersonalForm-inputs1">
							<label>اسم المستخدم </label>
							<input
								className="PersonalForm-input1"
								type="text"
								name="UserName"
								value={UserName}
								onChange={(event) => {
									setUserName(event.target.value);
								}}
								required
							/>
						</div>

						<div className="PersonalForm-inputs1">
							<label>الاسم الكامل </label>
							<input
								className="PersonalForm-input1"
								type="text"
								name="FullName"
								value={FullName}
								onChange={(event) => {
									setFullName(event.target.value);
								}}
								required
							/>
						</div>

						<div className="PersonalForm-inputs1">
							<label>رقم الهوية</label>
							<input className="PersonalForm-input1" type="text" name="SSN" defaultValue={SSN} required />
						</div>

						
						<div className="PersonalForm-inputs1">
							<label>العنوان </label>
							<input
								className="PersonalForm-input1"
								type="text"
								name="Address"
								value={Address}
								onChange={(event) => {
									setAddress(event.target.value);
								}}
								required
							/>
							</div>
						
						<div className="PersonalForm-inputs1">
							<label>مكان الولادة </label>
							<input
								className="PersonalForm-input1"
								type="text"
								name="PlaceBirdth"
								value={PlaceBirdth}
								onChange={(event) => {
									setPlaceBirdth(event.target.value);
								}}
								required
							/>
						</div>

						<div className="PersonalForm-inputs1">
							<label>تاريخ الميلاد </label>
							<input
								className="PersonalForm-input1"
								type="date"
								name="DateOfBirdth"
								value={DateOfBirdth}
								onChange={(event) => {
									setDateOfBirdth(event.target.value);
								}}
								required
							/>
						</div>

						<div className="PersonalForm-inputs1">
							<label>رقم هوية الابن </label>
							<input
								className="PersonalForm-input1"
								type="text"
								name="ChildSSN"
								value={ChildSSN}
								onChange={(event) => {
									setChildSSN(event.target.value);
								}}
								required
							/>
						</div>
					</div>
					
						<div className="leftt">
							<h3>تعديل كلمة المرور </h3>

							<div className="PersonalForm-inputs1">
								<label>كلمة المرور الحالية</label>
								<input
									className="PersonalForm-input1"
									type="password"
									name="Password"
									placeholder="*********"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className="PersonalForm-inputs1">
								<label>كلمة المرور الجديدة</label>
								<input
									className="PersonalForm-input1"
									type="password"
									name="NewPassword"
									placeholder="*********"
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>

							<div className="PersonalForm-inputs1">
								<label>تأكيد كلمة المرور</label>
								<input
									className="PersonalForm-input1"
									type="password"
									name="ConfirmPassword"
									placeholder="*********"
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
							<button className="Change-Password-btn" type="submit" onClick={ChangePassword}>
								تغيير{' '}
							</button>
						</div>
						<div className="contactInfoo">
							<h3>التواصل</h3>
							<div className="PersonalForm-inputs1">
							<label>البريدالالكتروني </label>
							<input
								className="PersonalForm-input1"
								type="email"
								name="Email"
								value={Email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								required
							/>
						</div>

							<div className="PersonalForm-inputs1">
							<label>رقم الهاتف </label>
							<input
								className="PersonalForm-input1"
								type="tel"
								name="Phone"
								value={Phone}
								onChange={(event) => {
									setPhone(event.target.value);
								}}
								required
							/>
							</div>
						</div>
						
						<button type="submit" className="form-input-btn1">
							حفظ التعديل
						</button>
					
					
				</form>
			</div>
		</div>
	);
};

export default ParentPersonalFile;
