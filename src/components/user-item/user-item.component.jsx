import React, { useState }  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { followUserStart } from '../../redux/user/user.actions'

import './user-item.style.scss'

const UserItem = ({ followUserStart, ...otherProps }) =>{
	const [isFollowing, setIsFollowing] = useState(false)

	const { firstName, lastName, id, email, userDP, deleteIdReference, marginRightMedium } = otherProps
	
	const follow = () =>{
		followUserStart({ firstName, lastName, id, email, userDP, deleteIdReference })
		setIsFollowing(true)
	}
	return(
	<li className='user__item-container'>
		<Link to={ `/timeline/${id}` } className='user__link'>
			<figure className='user__image-container'>
				<img src={ userDP } className='user__image' alt='suggestion' />
			</figure>
			<span className='user__name'>{ firstName } { lastName }</span>
		</Link>
		<div className={ `user__spinner-container 
			${isFollowing ? 'active' : '' }
			${marginRightMedium ? 'margin-right-medium' : '' }`
		 }>
			<span className='user__spinner'></span>
		</div>
		<button onClick={ follow } className={ `user__button ${isFollowing ? '' : 'active' }` }>Follow</button>
	</li>
)}

const mapDispatchToProps = dispatch => ({
	followUserStart: data => dispatch(followUserStart(data))
})

export default connect(null, mapDispatchToProps)(UserItem)