import React from 'react'

import SignIn from '../../components/sign-in/sign-in.component.jsx'
import SignUp from '../../components/sign-up/sign-up.component.jsx'

import './sign-in-and-up.component.scss'

const SignInAndUp = () =>(
	<div className='signinandup'>
		<div className='container'>
				<SignUp />
		</div>
	</div>
)

export default SignInAndUp
