import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUpStart } from '../../redux/user/user.actions'
import { selectIsAuthenticationSuccess, selectUserError } from '../../redux/user/user.selectors'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-up.component.scss'

const SignUp = ({ signUpStart, selectIsAuthenticationSuccess, error }) =>{
	const [userCredentials, setCredentials] = useState({ 
		firstName: '', 
		lastName: '', 
		email: '', 
		password: '', 
		confirmPassword: ''
	})

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const { firstName, lastName, email, password, confirmPassword } = userCredentials

	const getLabelText = parentElement =>{
		return parentElement.querySelector('.form-input__label').textContent
	}

	const showError = (inputElement, message, hasError) =>{
		inputElement.className = `form-input__field ${hasError}`
		const errorElement = inputElement.parentElement.parentElement.querySelector('.form__feedback')
		errorElement.innerText = message
	}

	const checkEmail = inputElement =>{
		if(!emailPattern.test(inputElement.value)) showError(inputElement, 'Email must contain dot and @ (single @ only) in the email address', 'error')
		if(emailPattern.test(inputElement.value)) showError(inputElement, '')
		if(inputElement.value === '') showError(inputElement, 'Email is required', 'error')
	}

	const checkPasswordMatch = inputElement =>{
		if(inputElement.value === password) showError(inputElement, '')
		if(inputElement.value !== password) showError(inputElement, 'Password does not match', 'error')
		if(inputElement.value === '') showError(inputElement, 'Confirm password is required', 'error')
	}

	const checkLength = (inputElement, min, max) =>{
		const inputLength = inputElement.value.length
		const hasError = 'error'

		if(inputLength > 0 && inputLength < min) showError(inputElement, `${getLabelText(inputElement.parentElement)} must be at least ${min} characters`, hasError)

		if(inputLength > min -1 && inputLength < max + 1) showError(inputElement, '')

		if(inputLength > max) showError(inputElement, `${getLabelText(inputElement.parentElement)} must be less than ${max} characters`, hasError)

		if(inputElement.value === '') showError(inputElement, `${getLabelText(inputElement.parentElement)} is required`, hasError)
	}

	useEffect(() =>{
		if(error){
			if(error.includes('already')) showError(document.getElementById('email'), error, 'error')
		}
	}, [error])
	
	const handleChange = (e) =>{
		const { id, value } = e.target
		const inputElement = e.target
		setCredentials({ ...userCredentials, [id]: value })

		if(id === 'firstName') checkLength(inputElement, 2, 20)
		if(id === 'lastName') checkLength(inputElement, 2, 20)
		if(id === 'email') checkEmail(inputElement)
		if(id === 'password') checkLength(inputElement, 6, 25)
		if(id === 'confirmPassword') checkPasswordMatch(inputElement)
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		const inputs = document.querySelectorAll('.form-input__field')

		if(firstName.length > 1 && firstName.length < 21 && lastName.length > 1 && lastName.length < 21 && password.length > 5 && password.length < 26 && password === confirmPassword && emailPattern.test(email)){
			signUpStart({ firstName, lastName, email, password })
		}

		inputs.forEach(input =>{
			if(input.id === 'firstName')checkLength(input, 2, 20) 
			if(input.id === 'lastName')checkLength(input, 2, 20) 
			if(input.id === 'email')checkEmail(input) 
			if(input.id === 'password')checkLength(input, 6, 25) 
			if(input.id === 'confirmPassword')checkPasswordMatch(input) 
		})
	}
	console.log('signup page')
	return (
		<form onSubmit={ handleSubmit } className='signup-form'>
			<div className='container'>
			{
				selectIsAuthenticationSuccess ?
					<div className='signup-form__spinner-container'>
						<span className='signup-form__spinner'></span>
					</div>
				: ''
			}
				
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
					<p id='form-feedback' className='form__feedback'></p>
				</div>

				<div className='form__group'>
					<FormInput 
						id='lastName'
						type='text'
						value={ lastName }
						onChange={ handleChange }
						label='Last name'
					/>
					<p id='form-feedback' className='form__feedback'></p>
				</div>

				<div className='form__group large'>
					<FormInput 
						id='email'
						type='text'
						value={ email }
						onChange={ handleChange }
						label='Email: exp. rosales@gmail.com'
					/>
					<p id='form-feedback' className='form__feedback'></p>
					</div>

				<div className='form__group'>
					<FormInput 
						id='password'
						type='password'
						value={ password }
						onChange={ handleChange }
						label='Password'
					/>
					<p id='form-feedback' className='form__feedback'></p>
				</div>


				<div className='form__group'>
					<FormInput 
						id='confirmPassword'
						type='password'
						value={ confirmPassword }
						onChange={ handleChange }
						label='Confirm password'
					/>
					<p id='form-feedback' className='form__feedback'></p>
				</div>
				<div className='form__button-container'>
					<Link to='/signin' className='form__button-instead'>Sign in instead</Link>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</div>
			</div>
		</form>
)}

const mapStateToProps = state =>({
	selectIsAuthenticationSuccess: selectIsAuthenticationSuccess(state),
	error: selectUserError(state)
})

const mapsDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
})

export default connect(mapStateToProps, mapsDispatchToProps)(SignUp)