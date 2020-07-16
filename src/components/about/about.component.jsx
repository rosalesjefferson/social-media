import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { editProfileStart } from '../../redux/user/user.actions'

import './about.style.scss'

const About = ({ editProfileStart, UID, timelineUser }) =>{
	
	const { id, email, lastName, firstName, nickname, 
			hobbies, address, contactNumber, birthday, 
			gender, education, work, created_at, userDP, 
			userCover } = timelineUser

	const [userInfo, setUserInfo] = useState({
		uFirstName: firstName,
		uLastName: lastName,
		uNickname: nickname,
		uHobbies: hobbies,
		uGender: gender,
		uAddress: address,
		uContactNumber: contactNumber,
		uBirthday: birthday,
		uEducation: education,
		uWork: work,
		profilePictureObject: null,
		coverPhotoObject: null
	})

	const [isSpinnerHidden, setSpinnerHidden] = useState(false)
	const [isModalHidden, setIsModalHidden] = useState(false)

	const { uFirstName, uLastName, uNickname, uHobbies, uAddress, uContactNumber, uBirthday, uGender, uEducation, uWork, profilePictureObject, coverPhotoObject } = userInfo

	useEffect(() =>{
		let unsub = false
		if(!unsub){
			setIsModalHidden(false)
			setUserInfo({ ...userInfo, profilePictureObject: null, coverPhotoObject: null })
		}
		return () => { unsub = true }
	}, [ timelineUser ])

	const handleClickModal = () =>{
		setIsModalHidden(!isModalHidden)
		setSpinnerHidden(false)
		setUserInfo({ ...userInfo, profilePictureObject: null, coverPhotoObject: null })
	}

	const onClickHideModal = () =>{
		setIsModalHidden(false)
		setUserInfo({ ...userInfo, profilePictureObject: null, coverPhotoObject: null })
	}

	const handleChange = e =>{
		const { id, value } = e.target
		setUserInfo({ ...userInfo, [id]: value })
	}

	const handleChangeRadio = e =>{
		const { value } = e.target
		setUserInfo({ ...userInfo,  uGender: value})
	}

	const handleChangeImageFile = e =>{
		const { id, files } = e.target
		setUserInfo({ ...userInfo, [id]: files[0] })
	}

	const handleClickCloseDisplayImage = e =>{
		if(e.target.parentElement.parentElement.className.includes('profile-parent')) setUserInfo({  ...userInfo, profilePictureObject: null})
		if(e.target.parentElement.parentElement.className.includes('cover-parent')) setUserInfo({  ...userInfo, coverPhotoObject: null})
	}

	const handleSubmit = e =>{
		e.preventDefault()
		editProfileStart({ id, email, uFirstName, uLastName, uNickname, uHobbies, uAddress, uContactNumber, uBirthday, uGender, uEducation, uWork, profilePictureObject, coverPhotoObject, userDP, userCover })
		setSpinnerHidden(true)
	}
	return(
		<div className='about'>
			<div className='about__header-container'>
				<span className='about__icon-container'>
					<i className="fas fa-user"></i>
				</span>
				<h3 className='about__title header-3'>About</h3>
				{ id === UID ?
					<span className='about__icon-container'>
						<i onClick={ handleClickModal } className="far fa-edit"></i>
					</span> : ''
				 }

			</div>
			<div className='about__info-container'>
				<p className='about__info'><span>Email: </span>{ email }</p>
				<p className='about__info'><span>Gender: </span>{ `${ gender.length > 0 ? gender : 'None'}` }</p>
				<p className='about__info'><span>Hobbies: </span>{ `${ hobbies.length > 0 ? hobbies : 'None'}` }</p>
				<p className='about__info'><span>Address: </span>{ `${ address.length > 0 ? address : 'None'}` }</p>
				<p className='about__info'><span>Contact Number: </span>{ `${ contactNumber.length > 0 ? contactNumber : 'None'}` }</p>
				<p className='about__info'><span>Birthday: </span>{ `${ birthday.length > 0 ? birthday : 'None'}` }</p>
				<p className='about__info'><span>Education: </span>{ `${ education.length > 0 ? education : 'None'}` }</p>
				<p className='about__info'><span>Work: </span>{ `${ work.length > 0 ? work : 'None'}` }</p>
				<p className='about__info'><span>Joined: </span>{ created_at }</p>
			</div>
			{ isModalHidden ?
			<div className='about__form-overlay'>
				<form onSubmit={ handleSubmit } className='about__form'>
					<span className='about__form-icon-container'>
						<i onClick={ onClickHideModal } className="fas fa-times"></i>
					</span>

					<div className='about__form-group'>
						<label htmlFor='uFirstName' className='about__label'>First Name: </label>
						<input 
							value={ uFirstName }
							onChange={ handleChange }
							id='uFirstName'
							type='text' 
							className='about__input' 
							placeholder='First name'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uLastName' className='about__label'>Last Name: </label>
						<input 
							value={ uLastName }
							onChange={ handleChange }
							id='uLastName'
							type='text' 
							className='about__input' 
							placeholder='Last name'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uNickname' className='about__label'>Nickname: </label>
						<input 
							value={ uNickname }
							onChange={ handleChange }
							id='uNickname'
							type='text' 
							className='about__input' 
							placeholder='Nickname'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uHobbies' className='about__label'>Hobbies: </label>
						<input 
							value={ uHobbies }
							onChange={ handleChange }
							id='uHobbies'
							type='text' 
							className='about__input' 
							placeholder='Hobbies'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uContactNumber' className='about__label'>Contact Number: </label>
						<input 
							value={ uContactNumber }
							onChange={ handleChange }
							id='uContactNumber'
							type='text' 
							className='about__input' 
							placeholder='Contact Number'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uAddress' className='about__label'>Address: </label>
						<input 
							value={ uAddress }
							onChange={ handleChange }
							id='uAddress'
							type='text' 
							className='about__input' 
							placeholder='Address'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uEducation' className='about__label'>Education: </label>
						<input 
							value={ uEducation }
							onChange={ handleChange }
							id='uEducation'
							type='text' 
							className='about__input' 
							placeholder='Education'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uWork' className='about__label'>Work: </label>
						<input 
							value={ uWork }
							onChange={ handleChange }
							id='uWork'
							type='text' 
							className='about__input' 
							placeholder='Work'
						/>
					</div>

					<div className='about__form-group'>
						<label htmlFor='uBirthday' className='about__label'>Birthday: </label>
						<input type="date" id="uBirthday" value={ uBirthday } onChange={ handleChange } className='about__input' />
					</div>


					<div className='about__form-group'>
						<label htmlFor='profilePictureObject' className='about__label'>Profile Picture: </label>
						<input 
							onChange={ handleChangeImageFile }
							id='profilePictureObject'
							type='file' 
							className='about__input profile' 
						/>
						<label htmlFor='profilePictureObject' className='about__label-profile-button'>
							<span className='about__form-icon-profile-container'><i className="far fa-image"></i></span>
							<span className='about__form-profile-text'>Choose File</span>
						</label>
					</div>

					<div className='about__form-group'>
						<label htmlFor='coverPhotoObject' className='about__label'>Cover Photo: </label>
						<input 
							onChange={ handleChangeImageFile }
							id='coverPhotoObject'
							type='file' 
							className='about__input profile' 
						/>
						<label htmlFor='coverPhotoObject' className='about__label-profile-button'>
							<span className='about__form-icon-profile-container'><i className="far fa-image"></i></span>
							<span className='about__form-profile-text'>Choose File</span>
						</label>
					</div>


					<div className='about__form-group'>
						<h4 className='about__label'>Gender: </h4>
						<div className='about__radio-button-container'>
							  <input onChange={ handleChangeRadio } type="radio" id="male" name="gender" value="Male" className='about__radio-button'/>
							  <label htmlFor="male" className='about__radio-button-label'>Male</label>
							  <input onChange={ handleChangeRadio } type="radio" id="female" name="gender" value="Female" className='about__radio-button'/>
							  <label htmlFor="female" className='about__radio-button-label'>Female</label>
						</div>
					</div>
				
					{profilePictureObject ? 
						<figure className='about__image-display-container profile-parent'>
							<img className='about__image-display' src={ URL.createObjectURL(profilePictureObject) } alt='about' />
							<figcaption className='about__image-display-close'><i onClick={ handleClickCloseDisplayImage } className="fas fa-times"></i></figcaption>
						</figure>
					: <p className='about__image-display-text'>No file Chosen</p>}

					{coverPhotoObject ? 
						<figure className='about__image-display-container cover-parent'>
							<img className='about__image-display' src={ URL.createObjectURL(coverPhotoObject) } alt='about' />
							<figcaption className='about__image-display-close'><i onClick={ handleClickCloseDisplayImage } className="fas fa-times"></i></figcaption>
						</figure>
					: <p className='about__image-display-text'>No file Chosen</p>}

				



					<div className='about__button-container'>
						{ isSpinnerHidden ?
							<div className='about__spinner-container'>
								<span className='about__spinner'></span>
							</div>
						: <button type='submit' className='about__button'>Save</button>
						}
					</div>
				</form>
			</div> : '' }
		</div>
	)
}

const mapDispatchToProps = dispatch =>({
	editProfileStart: data => dispatch(editProfileStart(data))
})

export default connect(null, mapDispatchToProps)(About)

// <div className={ `edit-post-caption__spinner-container ${isSpinnerHidden ? 'active' : '' }` }>
// 	<span className='edit-post-caption__spinner'></span>
// </div>