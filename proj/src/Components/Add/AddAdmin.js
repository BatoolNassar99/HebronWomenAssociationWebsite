import React from 'react';
import '../home/Form.css';
import Axios from 'axios';
import { useState } from 'react';
import AppNavbarAdmin from '../common/navbar-admin';
import swal from 'sweetalert';

function AddAdmin() {
	const [ SSN, setSSN ] = useState('');
	const [ UserName, setUserName ] = useState('');
	const [ FullName, setFullName ] = useState('');
	const [ Email, setEmail ] = useState('');
	const [ Password, setPassword ] = useState('');
	const [ ConfirmPassword, setConfirmPassword ] = useState('');
	const [ Address, setAddress ] = useState('');
	const [ PlaceBirdth, setPlaceBirdth ] = useState('');
	const [ Phone, setPhone ] = useState('');
	const [ DateOfBirdth, setDateOfBirdth ] = useState('');
  
	const AddNewAdmin = () => {
		if (Password === ConfirmPassword) {
			Axios.post('http://localhost:3003/AddAdmin', {
				SSN: SSN,
				UserName: UserName,
				FullName: FullName,
				Email: Email,
				Password: Password,
				Address: Address,
				PlaceBirdth: PlaceBirdth,
				Phone: Phone,
				DateOfBirdth: DateOfBirdth,
				TypeID: 1
			}).then(() => {
				console.log('Finalllly success');
			});
			swal({
				title: "تم",
				text: "تمت إضافة مسؤول جديد بنجاح",
				icon: "success",
				button: "إغلاق",
			  });
			
		} else {
			swal({
				title: "خطأ",
				text: "الرجاء التأكد من كلمة المرور",
				icon: "error",
				button: "إغلاق",
			  });
			
		}
	};
	return (
		<div className="form-content-right">
			<AppNavbarAdmin />
			<hr />
			<form className="form" onSubmit={AddNewAdmin}>
				<h1>إضافة مسؤول جديد </h1>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="UserName"
						placeholder="اسم المستخدم "
						onChange={(event) => {
							setUserName(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="FullName"
						placeholder="الاسم الكامل"
						onChange={(event) => {
							setFullName(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="SSN"
						placeholder="رقم الهوية"
						onChange={(event) => {
							setSSN(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="email"
						name="Email"
						placeholder="البريد الالكتروني"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="password"
						name="Password"
						placeholder="كلمة المرور"
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="password"
						name="ConfirmPassword"
						placeholder="تأكيد كلمة المرور"
						onChange={(event) => {
							setConfirmPassword(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="tel"
						name="Phone"
						placeholder="رقم الهاتف"
						onChange={(event) => {
							setPhone(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="Address"
						placeholder="العنوان "
						onChange={(event) => {
							setAddress(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="PlaceBirdth"
						placeholder="مكان الولادة "
						onChange={(event) => {
							setPlaceBirdth(event.target.value);
						}}
						required
					/>
				</div>

				<div className="form-inputs">
					<input
						className="form-input"
						type="date"
						name="DateOfBirdth"
						placeholder={'DD/MM/YYYY'}
						onChange={(event) => {
							setDateOfBirdth(event.target.value);
						}}
						required
					/>
				</div>

				<button type="submit" className="form-input-btn">
					إضافة{' '}
				</button>
				<br />
			</form>
		</div>
	);
}

export default AddAdmin;