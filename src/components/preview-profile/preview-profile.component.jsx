import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import './preview-profile.style.scss'

const PreviewProfile = ({ currentUser }) =>{
	const { currentUserAvatarUrl, email, firstName, lastName, UID } = currentUser
	return(
		<Link to={ `/timeline/${UID}` } className='preview-profile-container'>
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