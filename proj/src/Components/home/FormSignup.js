import React from 'react';
import './Form.css';
import Axios from 'axios';
import { useState } from 'react';
import AppNavbarVisitor from '../common/navbar-visitor';
import swal from 'sweetalert';

function FormSignup() {
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
	const [ TypeID, setTypeID ] = useState({
		isTeacher: 0,
		isChild: 0,
		isTrainer: 0,
		isTrainee: 0,
		isParent: 0,
		isAdmin: 0
	});
	const [ ChildSSN, setChildSSN ] = useState('');
	const [ Diseases, setDiseases ] = useState('');
	const [ Medication, setMedication ] = useState('');
	const [ Access, setAccess ] = useState('');
	const [ type, setType ] = useState({
		isTeacher: false,
		isChild: false,
		isTrainer: false,
		isTrainee: false,
		isParent: false,
		isAdmin: false
	});
	const [ ch, setch ] = useState(false);
	const [ Pa, setPa ] = useState(false);

	const handleCheckBox = (event) => {
		type[event.target.value] = event.target.checked;
		TypeID[event.target.value] = 0;

		setType(type);
		setTypeID(TypeID);

		if (type.isChild === true) {
			TypeID.isChild = 5;
			setch(true);
		} else {
			TypeID.isChild = 0;
			setch(false);
		}
		if (type.isParent === true) {
			TypeID.isParent = 2;
			setPa(true);
		} else {
			TypeID.isParent = 0;
			setPa(false);
		}
		if (type.isTrainee === true) {
			TypeID.isTrainee = 6;
		} else {
			TypeID.isTrainee = 0;
		}
		if (type.isTrainer === true) {
			TypeID.isTrainer = 4;
		} else {
			TypeID.isTrainer = 0;
		}
		if (type.isTeacher === true) {
			TypeID.isTeacher = 3;
		} else {
			TypeID.isTeacher = 0;
		}
		if (type.isAdmin === true) {
			TypeID.isAdmin = 1;
		} else {
			TypeID.isAdmin = 0;
		}
	};

	// Submit
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			SSN == '' ||
			UserName == '' ||
			FullName == '' ||
			Email == '' ||
			Password == '' ||
			ConfirmPassword == '' ||
			Phone == '' ||
			PlaceBirdth == '' ||
			DateOfBirdth == '' ||
			Address == ''
		) {
			swal({
				title: 'خطأ',
				text: 'الرجاء تعبئة جميع الحقول',
				icon: 'info',
				button: 'إغلاق'
			});
		} else if (Pa == true && ChildSSN == '') {
			swal({
				title: 'خطأ',
				text: 'الرجاء كتابة رقم هوية طفلك',
				icon: 'info',
				button: 'إغلاق'
			});
		} else if (Pa == true && ChildSSN == '') {
			swal({
				title: 'خطأ',
				text: 'الرجاء كتابة رقم هوية طفلك',
				icon: 'info',
				button: 'إغلاق'
			});
		} else if (ch == true && (Diseases == '' || Access == '' || Medication == '')) {
			swal({
				title: 'خطأ',
				text: 'الرجاء تعبئة الحقول الخاصة بالطفل',
				icon: 'info',
				button: 'إغلاق'
			});
		} else if (Password !== ConfirmPassword) {
			swal({
				title: 'خطأ',
				text: 'الرجاء التأكد من كلمة المرور',
				icon: 'info',
				button: 'إغلاق'
			});
		} else if (SSN.length !== 9) {
			swal({
				title: 'خطأ',
				text: 'الرجاء التأكد من رقم الهوية',
				icon: 'error',
				button: 'إغلاق'
			});
		} else if (Password.length < 6) {
			swal({
				title: 'خطأ',
				text: 'يجب أن تكون كلمة المرور على الأقل من 6 خانات ',
				icon: 'error',
				button: 'إغلاق'
			});
		} else if (
			type.isChild === false &&
			type.isParent === false &&
			type.isTeacher === false &&
			type.isTrainee === false &&
			type.isTrainer === false &&
			type.isAdmin === false
		) {
			swal({
				title: 'خطأ',
				text: 'الرجاء اختيار نوع الحساب ',
				icon: 'error',
				button: 'إغلاق'
			});
		} else {
			Axios.post('http://localhost:3003/signup', {
				SSN: SSN,
				UserName: UserName,
				FullName: FullName,
				Email: Email,
				Password: Password,
				Address: Address,
				PlaceBirdth: PlaceBirdth,
				Phone: Phone,
				DateOfBirdth: DateOfBirdth,
				TypeID: TypeID,
				ChildSSN: ChildSSN,
				Diseases: Diseases,
				Medication: Medication,
				Access: Access
			}).then((response) => {
				console.log(response.data.message);
				if (response.data.message == 'رقم الهوية مسجل من قبل') {
					swal({
						title: 'خطأ!',
						text: 'رقم الهوية مسجل من قبل',
						icon: 'error',
						button: 'إغلاق'
					});
				} else {
					swal({
						title: 'تم!',
						text: 'تمت العملية بنجاح',
						icon: 'success',
						button: 'إغلاق'
					}).then(function() {
						window.location = "/login";
					});
				}
			});
		}
	};

	return (
		<div className="form-content-right">
			<AppNavbarVisitor />
			<hr />
			<form className="form">
				<h1>إنشاء حساب جديد </h1>

				<div className="form-inputs">
					<input
						className="form-input"
						type="text"
						name="UserName"
						placeholder="اسم المستخدم "
						onChange={(event) => {
							setUserName(event.target.value);
						}}
					/>

					<input
						className="form-input"
						type="text"
						name="FullName"
						placeholder="الاسم الكامل"
						onChange={(event) => {
							setFullName(event.target.value);
						}}
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
					/>

					<input
						className="form-input"
						type="email"
						name="Email"
						placeholder="البريد الالكتروني"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
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
					/>

					<input
						className="form-input"
						type="password"
						name="ConfirmPassword"
						placeholder="تأكيد كلمة المرور"
						onChange={(event) => {
							setConfirmPassword(event.target.value);
						}}
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
					/>
				
					<input
						className="form-input"
						type="text"
						name="Address"
						placeholder="العنوان "
						onChange={(event) => {
							setAddress(event.target.value);
						}}
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
			/>
					<input
						className="form-input"
						type="date"
						name="DateOfBirdth"
						placeholder={'DD/MM/YYYY'}
						onChange={(event) => {
							setDateOfBirdth(event.target.value);
						}}
					/>
				</div>

				<div className="checkBox1">
					<label className="container">
						مسؤول
						<input
							className="userType"
							type="checkbox"
							value="isAdmin"
							name="type"
							onChange={handleCheckBox}
							checked={setType.isAdmin}
						/>{' '}
						<span className="checkmark" />
					</label>
					<label className="container">
						معلم
						<input
							className="userType"
							type="checkbox"
							value="isTeacher"
							name="type"
							onChange={handleCheckBox}
							checked={setType.isTeacher}
						/>{' '}
						<span className="checkmark" />
					</label>
					<label className="container">
						ولي أمر
						<input
							className="userType"
							type="checkbox"
							value="isParent"
							name="type"
							onChange={handleCheckBox}
							checked={setType.isParent}
						/>
						<span className="checkmark" />
						<br /> <br />
					</label>
					<label className="container">
						طالب
						<input
							className="userType"
							type="checkbox"
							value="isChild"
							name="type"
							onChange={handleCheckBox}
							checked={setType.isChild}
						/>{' '}
						<span className="checkmark" />
					</label>
					<label className="container">
						متدرّب
						<input
							className="userType"
							type="checkbox"
							value="isTrainer"
							name="type"
							onChange={handleCheckBox}
							checked={setType.isTrainee}
						/>{' '}
						<span className="checkmark" />
					</label>
					<label className="container">
						مدرّب
						<input
							className="userType"
							type="checkbox"
							value="isTrainee"
							name="type"
							onChange={handleCheckBox}
							checked={setType.isTrainer}
						/>{' '}
						<span className="checkmark" />
					</label>
				</div>

				{ch == true ? (
					<div>
						<div className="form-inputs">
							<input
								className="form-input"
								type="text"
								name="Diseases"
								placeholder="هل يعاني الطفل من أمراض ؟اذكرها إن وجدت"
								value={Diseases}
								onChange={(event) => {
									setDiseases(event.target.value);
								}}
							/>
						</div>

						<div className="form-inputs">
							<input
								className="form-input"
								type="text"
								name="Medication"
								placeholder="هل يتناول الطفل أدوية معينة ؟ اذكرها إن وجدت "
								value={Medication}
								onChange={(event) => {
									setMedication(event.target.value);
								}}
							/>
						</div>
						<div className="form-inputs">
							<select
								className="form-input"
								value={Access}
								onChange={(e) => setAccess(e.target.value)}
								placeholder="طريقة الوصول إلى الروضة"
							>
								<option defaultValue={'طريقة الوصول إلى الروضة'} disabled>
									طريقة الوصول إلى الروضة
								</option>
								<option>الباص ذهاباً وإياباً</option>
								<option>الباص ذهاباً فقط</option>
								<option>الباص إياباً فقط</option>
								<option>بدون الباص </option>
							</select>
						</div>
					</div>
				) : null}

				{Pa == true ? (
					<div className="form-inputs">
						<p>هل قمت بتسجيل ابنك في الموقع ؟ </p>
						<input
							className="form-input"
							type="text"
							name="ChildSSN"
							placeholder="رقم هوية الابن"
							onChange={(event) => {
								setChildSSN(event.target.value);
							}}
						/>
					</div>
				) : null}

				<button type="submit" className="form-signUp-btn" onClick={onSubmit}>
					التسجيل
				</button>
				<br />

				<span className="form-input-login">
					{' '}
					هل لديك حساب من قبل؟ <a href="/login">تسجيل الدخول </a>{' '}
				</span>
			</form>
		</div>
	);
}
export default FormSignup;