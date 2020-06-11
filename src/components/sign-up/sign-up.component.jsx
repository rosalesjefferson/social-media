import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUpStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-up.component.scss'

const SignUp = ({ signUpStart }) =>{
	const [userCredentials, setCredentials] = useState({ 
		firstName: '', 
		lastName: '', 
		email: '', 
		password: '', 
		confirmPassword: ''
	})

	const { firstName, lastName, email, password, confirmPassword } = userCredentials

	const handleChange = (e) =>{
		const { id, value } = e.target
		setCredentials({ ...userCredentials, [id]: value })
	}

	const handleSubmit = (e) =>{
		e.preventDefault()

		if(password !== confirmPassword ){
			alert(`password don't match`)
			return
		}
		if(password.length < 6){
			alert('Password must be at least 6 characters')
			return
		}

		signUpStart({ firstName, lastName, email, password })

		setCredentials({ 
			firstName: '', 
			lastName: '', 
			email: '', 
			password: '', 
			confirmPassword: '', 
		})
	}
	console.log('signup page')
	return (
		<form onSubmit={ handleSubmit } className='signup-form'>
			<div className='container'>
				<h4 className='header-4'>WeConnect</h4>
				<h3 className='header-3 mb-2'>Create your WeConnect Account</h3>
				<div className='form__group'>
					<FormInput 
						id='firstName'
						type='text'
						value={ firstName }
						onChange={ handleChange }
						label='First name'
					/>
					<p className='form__feedback'>Please fill out this field</p>
				</div>

				<div className='form__group'>
					<FormInput 
						id='lastName'
						type='text'
						value={ lastName }
						onChange={ handleChange }
						label='Last name'
					/>
					<p className='form__feedback'>Please fill out this field</p>
				</div>

				<div className='form__group large'>
					<FormInput 
						id='email'
						type='email'
						value={ email }
						onChange={ handleChange }
						label='Email: exp. rosales@gmail.com'
						required
					/>
					<p className='form__feedback'>Please fill out this field</p>
					</div>

				<div className='form__group'>
					<FormInput 
						id='password'
						type='password'
						value={ password }
						onChange={ handleChange }
						label='Password'
					/>
					<p className='form__feedback'>Please fill out this field</p>
				</div>


				<div className='form__group'>
					<FormInput 
						id='confirmPassword'
						type='password'
						value={ confirmPassword }
						onChange={ handleChange }
						label='Confirm password'
					/>
					<p className='form__feedback'></p>
				</div>
				<div className='form__button-container'>
					<Link to='/signin' className='form__button-instead'>Sign in instead</Link>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</div>
			</div>
		</form>
)}

const mapsDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapsDispatchToProps)(SignUp)