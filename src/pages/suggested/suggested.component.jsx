import React from 'react'
import { connect } from 'react-redux'

import { selectUsers } from '../../redux/user/user.selectors'

import UserItem from '../../components/user-item/user-item.component'

import './suggested.style.scss';

const Suggested = ({ users }) =>(
	<div className='suggested-container'>
		<div className='container'>
			<h4 className=' suggested__title header-4'>Suggested</h4>
			<div className='suggested__users-container'>
				{
					users.map(user =>(
						<UserItem key={ user.id } buttonText='Follow' marginRightMedium='true' { ...user } />
					))
				}
			</div>
		</div>
	</div>
)

const mapsStateToProps = state =>({
	users: selectUsers(state)
})

export default connect(mapsStateToProps)(Suggested)