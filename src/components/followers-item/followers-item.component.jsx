import React from 'react'
import { Link } from 'react-router-dom'

import './followers-item.style.scss'

const FollowersItem = ({ firstName, lastName, userDP, followersUserID, reset, followingUserId, email }) =>(
	<li className='follower__item'>
		<Link to={`/timeline/${followersUserID !== undefined ? followersUserID : followingUserId }`} onClick={ reset } className='follower__link'>
			<figure className='follower__image-container'>
				<img src={ userDP } className='follower__image' alt='suggestion' />
			</figure>
			<div className='follower__info'>
				<span className='follower__name'>{ firstName } { lastName }</span>
				<span className='follower__email'><em>{ email }</em></span>
			</div>
		</Link>
	</li>
)

export default FollowersItem
