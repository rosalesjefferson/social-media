import React from 'react'

import SignIn from '../../components/sign-in/sign-in.component.jsx'

import './sign-in-and-up.component.scss'

const SignInAndUp = ({ match }) =>(
	<div className='signinandup'>
		<div className='container'>
			<SignIn />
		</div>
	</div>
)

export default SignInAndUp
