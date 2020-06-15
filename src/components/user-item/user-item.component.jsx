import React from 'react'
import { Link } from 'react-router-dom'

import './user-item.style.scss'

const UserItem = ({ firstName, lastName }) =>(
	<li className='suggestions__item'>
		<Link to='/' className='suggestions__link'>{ firstName } { lastName }</Link>
	</li>
)

export default UserItem