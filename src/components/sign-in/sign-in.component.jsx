import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signInStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-in.component.scss'

const SignIn = ({ signInStart }) =>{
	const [userCredentials, setCredentials] = useState({ 
		email: '', 
		password: ''
	})

	const { email, password } = userCredentials

	const handleChange = (e) =>{
		const { id, value } = e.target
		setCredentials({ ...userCredentials, [id]: value })
	}

	const handleSubmit = (e) =>{
		e.preventDefault()

		signInStart({ email, password })

		setCredentials({ 
			email: '', 
			password: ''
		})
	}
	return (
		<form onSubmit={ handleSubmit } className='signin-form'>
		<h4 className='header-4'>WeConnect</h4>
		<h3 className='header-3 mb-2'>Sign in</h3>
			<div className='form__group'>
				<FormInput 
					id='email'
					type='email'
					value={ email }
					onChange={ handleChange }
					label='Email: exp. rosales@gmail.com'
					required
				/>
				<p className='form__feedback'>asdasdasdGgy</p>
			</div>

			<div className='form__group'>
				<FormInput 
					id='password'
					type='password'
					value={ password }
					onChange={ handleChange }
					label='Password'
				/>
				<p className='form__feedback'>asdasdasdGgy</p>
			</div>
			<div className='form__button-container'>
				<Link to='/signup' className='form__button-instead'>Sign up instead</Link>
				<CustomButton type='submit'>Sign In</CustomButton>
			</div>
		</form>
)}

const mapsDispatchToProps = dispatch => ({
	signInStart: (userCredentials) => dispatch(signInStart(userCredentials))
})

export default connect(null, mapsDispatchToProps)(SignIn)