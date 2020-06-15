import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUsersStart } from '../../redux/user/user.actions'
import { selectUsers } from '../../redux/user/user.selectors'

import UserItem from '../user-item/user-item.component'

import './suggestions.style.scss'

const Suggestions = ({ fetchUsersStart, users }) =>{
	useEffect(() =>{
		fetchUsersStart()
	}, [fetchUsersStart])

	return(
		<div className='suggestions__container'>
			<div className='suggestions__header-container'>
				<h5 className='suggestions__title'>Suggestions For You</h5>
				<Link to='/' className='suggestions__see-all'>See all</Link>
			</div>
			<ul className='suggestions__lists-container'>
				{
					users.map(({ id, ...otherProps }) =>(
						<UserItem key={ id } { ...otherProps }/>
					))
				}
			</ul>
		</div>
	)
}

const mapsStateToProps = state =>({
	users: selectUsers(state)
})

const mapDispatchToProps = dispatch =>({
	fetchUsersStart: () => dispatch(fetchUsersStart())
})

export default connect(mapsStateToProps, mapDispatchToProps)(Suggestions)