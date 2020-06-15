import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import './preview-profile.style.scss'

const PreviewProfile = ({ currentUser }) =>{
	const { UID, currentUserAvatarUrl, email, firstName, lastName } = currentUser
	console.log(UID, currentUserAvatarUrl, email, firstName, lastName, 'currentUser')
	return(
		<Link to='/' className='preview-profile-container'>
			<figure className='preview-profile__image-container'>
				<img src={ currentUserAvatarUrl } className='preview-profile__image' alt='preview-header'/>
			</figure>
			<div className='preview-profile__user-info-container'>
				<p className='preview-profile__email'>{ email }</p>
				<p className='preview-profile__name'>{ `${firstName} ${lastName}` }</p>
			</div>
		</Link>
	)
}

const mapsStateToProps = state =>({ currentUser: selectCurrentUser(state) })

export default connect(mapsStateToProps)(PreviewProfile)