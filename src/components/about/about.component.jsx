import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { editProfileStart } from '../../redux/user/user.actions'

import './about.style.scss'

const About = ({ editProfileStart, timelineUser: { email, lastName, firstName, address, contactNumber, birthday, education, work, created_at, id, currentUserAvatarUrl, currentUserCoverUrl } }) =>{
	const [userInfo, setUserInfo] = useState({
		uFirstName: firstName,
		uLastName: lastName,
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

	const { uFirstName, uLastName, uAddress, uContactNumber, uBirthday, uEducation, uWork, profilePictureObject, coverPhotoObject } = userInfo

	useEffect(() =>{
		setIsModalHidden(false)
	}, [lastName, firstName, address, contactNumber, birthday, education, work, currentUserAvatarUrl, currentUserCoverUrl])

	const handleClickModal = () =>{
		setIsModalHidden(!isModalHidden)
		setSpinnerHidden(false)
	}

	const onClickHideModal = () =>{
		setIsModalHidden(false)
	}

	const handleChange = e =>{
		const { id, value } = e.target
		setUserInfo({ ...userInfo, [id]: value })
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
		editProfileStart({ id, uFirstName, uLastName, uAddress, uContactNumber, uBirthday, uEducation, uWork, profilePictureObject, coverPhotoObject, currentUserAvatarUrl, currentUserCoverUrl })
		setSpinnerHidden(true)
	}

	console.log('about')
	return(
		<div className='about'>
			<div className='about__header-container'>
				<span className='about__icon-container'>
					<i className="fas fa-user"></i>
				</span>
				<h3 className='about__title header-3'>About</h3>
				<span className='about__icon-container'>
					<i onClick={ handleClickModal } className="far fa-edit"></i>
				</span>
			</div>
			<div className='about__info-container'>
				<p className='about__info'><span>Email: </span>{ email }</p>
				<p className='about__info'><span>Address: </span>{ address }</p>
				<p className='about__info'><span>Contact Number: </span>{ contactNumber }</p>
				<p className='about__info'><span>Birthday: </span>{ birthday }</p>
				<p className='about__info'><span>Education: </span>{ education }</p>
				<p className='about__info'><span>Work: </span>{ work }</p>
				<p className='about__info'><span>Joined: </span>{ created_at }</p>
			</div>
			<div className={ `about__form-overlay ${isModalHidden ? 'active' : ''}` }>
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
						<label htmlFor='uBirthday' className='about__label'>Birthday: </label>
						<input type="date" id="uBirthday" value={ birthday } onChange={ handleChange } className='about__input' />
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
			</div>
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