import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AppNavbarChild from '../common/navbar-child';
import swal from 'sweetalert';
import './Child.css';
const ChildPersonalFile = () => {
	const [ SSN, setSSN ] = useState('');
	const [ UserName, setUserName ] = useState('');
	const [ FullName, setFullName ] = useState('');
	const [ Email, setEmail ] = useState('');
	const [ Address, setAddress ] = useState('');
	const [ PlaceBirdth, setPlaceBirdth ] = useState('');
	const [ Phone, setPhone ] = useState('');
	const [ DateOfBirdth, setDateOfBirdth ] = useState('');
	const [ ParentSSN, setParentSSN ] = useState('');
	const [ Diseases, setDiseases ] = useState('-');
	const [ Medication, setMedication ] = useState('-');
	const [ SectionName, setSectionName ] = useState('لم تحدد بعد');
	const [ Type, setType ] = useState('لم تحدد بعد');
	const [ Access, setAccess ] = useState('');
	const [ Password, setPassword ] = useState('');
	const [ NewPassword, setNewPassword ] = useState('');
	const [ ConfirmPassword, setConfirmPassword ] = useState('');
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
	const getData = async (e) => {
		setSSN(localStorage.getItem('SSN'));
		await Axios.put(`http://localhost:3003/ChildPersonalFile1`, {
			SSN: localStorage.getItem('SSN')
		}).then((result) => {
			console.log('result', result);
			const profile = result.data[0];
			setUserName(profile.UserName);
			setFullName(profile.FullName);
			setEmail(profile.Email);
			setAddress(profile.Address);
			setPlaceBirdth(profile.PlaceBirdth);
			setPhone(profile.Phone);
			setDateOfBirdth(profile.DateOfBirdth);
			// setParentSSN(profile.ParentSSN);
			setDiseases(profile.Diseases);
			setMedication(profile.Medication);
			setSectionName(profile.SectionName);
			setType(profile.SectionType);
			setAccess(profile.Access);
		});
	};
	useEffect(
		() => {
			//	console.log(SSN);
			getData();
		},
		[ SSN ]
	);

	const onSubmit = async (e) => {
		e.preventDefault();
		await Axios.put(`http://localhost:3003/ChildPersonalFile`, {
			SSN: localStorage.getItem('SSN'),
			UserName: UserName,
			FullName: FullName,
			Email: Email,
			Address: Address,
			PlaceBirdth: PlaceBirdth,
			Phone: Phone,
			DateOfBirdth: DateOfBirdth,
			ParentSSN: ParentSSN,
			Diseases: Diseases,
			Medication: Medication,
			SectionName: SectionName,
			Type: Type,
			Access: Access
		}).then((response) => {
			//	console.log(response);

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
			<AppNavbarChild/>
			{' '}
			<div className="PersonalInfoForm3">
				<br />
				<form onSubmit={(e) => onSubmit(e)}>
					<h1>الملف الشخصي </h1>
					<div className="right3">
						<h3>معلومات الحساب</h3>
						<div className="PersonalForm-inputs3">
							<label>اسم المستخدم </label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="UserName"
								value={UserName}
								onChange={(event) => {
									setUserName(event.target.value);
								}}
								required
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>الاسم الكامل </label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="FullName"
								value={FullName}
								onChange={(event) => {
									setFullName(event.target.value);
								}}
								required
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>رقم الهوية</label>
							<input className="PersonalForm-input3" type="text" name="SSN" defaultValue={SSN} required />
						</div>
						
						<div className="PersonalForm-inputs3">
							<label>العنوان </label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="Address"
								value={Address}
								onChange={(event) => {
									setAddress(event.target.value);
								}}
								required
							/>
						</div>
						
						<div className="PersonalForm-inputs3">
							<label>مكان الولادة </label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="PlaceBirdth"
								value={PlaceBirdth}
								onChange={(event) => {
									setPlaceBirdth(event.target.value);
								}}
								required
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>تاريخ الميلاد </label>
							<input
								className="PersonalForm-input3"
								type="date"
								name="DateOfBirdth"
								value={DateOfBirdth}
								onChange={(event) => {
									setDateOfBirdth(event.target.value);
								}}
								required
							/>
						</div>
						
					</div>
				
					<div className="left3">
						<h3>معلومات الطفل</h3>
						
						
						<div className="PersonalForm-inputs3">
							<label>أمراض يعانيها الطفل</label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="Diseases"
								value={Diseases}
								onChange={(event) => {
									setDiseases(event.target.value);
								}}
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>أدوية يتناولها الطفل</label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="Medication"
								value={Medication}
								onChange={(event) => {
									setMedication(event.target.value);
								}}
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>الوصول إلى الروضة </label>
							<select
								className="PersonalForm-input3"
								value={Access}
								onChange={(e) => setAccess(e.target.value)}
							>
								<option>الباص ذهاباً وإياباً</option>
								<option>الباص ذهاباً فقط</option>
								<option>الباص إياباً فقط</option>
								<option>بدون الباص </option>
							</select>
						</div>
						<div className="PersonalForm-inputs3">
							<label>الصف </label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="Name"
								value={SectionName}
								onChange={(event) => {
									setSectionName(event.target.value);
								}}
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>الشعبة </label>
							<input
								className="PersonalForm-input3"
								type="text"
								name="Type"
								value={Type}
								onChange={(event) => {
									setType(event.target.value);
								}}
							/>
						</div>

						
					</div>
					
						
					<div className="center3">
								<h3>تعديل كلمة المرور </h3>
								
								<div className="PersonalForm-inputs3">
									<label>كلمة المرور الحالية</label>
									<input
										className="PersonalForm-input3"
										type="password"
										name="Password"
										placeholder="*********"
										onChange={(e) => setPassword(e.target.value)}
									/>
									</div>
								
									<div className="PersonalForm-inputs3">
									<label>كلمة المرور الجديدة</label>
									<input
										className="PersonalForm-input3"
										type="password"
										name="NewPassword"
										placeholder="*********"
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									</div>
									
									<div className="PersonalForm-inputs3">
									<label>تأكيد كلمة المرور</label>
									<input
										className="PersonalForm-input3"
										type="password"
										name="ConfirmPassword"
										placeholder="*********"
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									</div>
								<button className="Change-Password-btn3" type="submit" onClick={ChangePassword}>
									تغيير{' '}
								</button>
							</div>
							<div className='contactInfo3'>
					<h3>التواصل</h3>
					
						<div className="PersonalForm-inputs3">
							<label>البريدالالكتروني </label>
							<input
								className="PersonalForm-input3"
								type="email"
								name="Email"
								value={Email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								required
							/>
						</div>
						<div className="PersonalForm-inputs3">
							<label>رقم الهاتف </label>
							<input
								className="PersonalForm-input3"
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
						<button type="submit" className="form-input-btn3">
							حفظ التعديل
						</button>
					
				</form>
				</div>
				</div>
	);
};

export default ChildPersonalFile;
