import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signInStart } from '../../redux/user/user.actions'
import { selectUserError, selectIsAuthenticationSuccess } from '../../redux/user/user.selectors'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-in.component.scss'

const SignIn = ({ signInStart, isSuccess, error }) =>{
	const [userCredentials, setCredentials] = useState({ 
		email: '', 
		password: ''
	})
	const [userError, setError] = useState({
		emailError: '',
		passwordError: '',
		attemptError: '',
	})

	const { emailError, passwordError, attemptError } = userError
	const { email, password } = userCredentials

	useEffect(() => {
		let unsubscribed = false
		var timeOut
		const validation = () =>{
			if(error){
				if(error.includes('password')){
					setError({ emailError: '', passwordError: error, attemptError: '' })
				}
				if(error.includes('identifier')){
					setError({ emailError: error, passwordError: '', attemptError: '' })
				}

				if(error.includes('many')){
					setError({ emailError: '', passwordError: '', attemptError: error })
				}
			}else setError({ emailError: '', passwordError: '', attemptError: '' })

			timeOut = setTimeout(() =>{
				setError({ ...userError, emailError: '', passwordError: '' })
			}, [5000])
		}
		
		if(!unsubscribed){
			validation()
		}

		return () => { 
			unsubscribed = true
			clearTimeout(timeOut)
		}
	}, [error])

	const handleChange = (e) =>{
		const { id, value } = e.target
		setCredentials({ ...userCredentials, [id]: value })
		// if(e.target.id === 'email'){
		// 	if(e.target.validity.typeMismatch){
		// 		e.target.setCustomValidity("Please enter a valid email address")
		// 	}else{
		// 		e.target.setCustomValidity("")
		// 	}
		// }
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		signInStart({ email, password })
	}

	return (
		<form onSubmit={ handleSubmit } className={ `signin-form ${emailError.length > 0 ? 'has-error' : ''}` }>
			<h4 className='header-4'>WeConnect</h4>
			<h3 className='header-3 mb-2'>Sign in</h3>
				<div className='form__group'>
					<FormInput 
						id='email'
						type='email'
						value={ email }
						onChange={ handleChange }
						label='Email: exp. aquino@gmail.com'
						required
					/>
					<p className='form__feedback'>{ emailError }</p>
				</div>

				<div className='form__group'>
					<FormInput 
						id='password'
						type='password'
						value={ password }
						onChange={ handleChange }
						label='Password'
						required
					/>
					<p className='form__feedback'>{ passwordError }</p>
				</div>

				<div className={ `form__feedback-attempt-container ${attemptError.length > 0 ? 'has-error' : ''}` }>
					<p className='form__feedback-attempt'>{ attemptError }</p>
				</div>

				<div className='form__button-container'>
					<Link to='/signup' className='form__button-instead'>Sign up instead</Link>
					<CustomButton type='submit'>Sign In</CustomButton>
				</div>
		</form>
)}

const mapStateToProps = state =>({
	error: selectUserError(state),
	isSuccess: selectIsAuthenticationSuccess(state)
})

const mapsDispatchToProps = dispatch => ({
	signInStart: (userCredentials) => dispatch(signInStart(userCredentials))
})

export default connect(mapStateToProps, mapsDispatchToProps)(SignIn)