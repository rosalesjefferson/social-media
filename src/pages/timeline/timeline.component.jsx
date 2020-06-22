import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCurrentUser, selectTimelineUsers } from '../../redux/user/user.selectors'

import Posts from '../../components/posts/posts.component'
import TimelineUserInfo from '../../components/timeline-user-info/timeline-user-info.component'
import About from '../../components/about/about.component'
import Following from '../../components/following/following.component'
import Followers from '../../components/followers/followers.component'
import Photos from '../../components/photos/photos.component'

import './timeline.style.scss';

const Timeline = ({ timelineUser, currentUser }) =>{
	const [isTimeline, setIsTimeline] = useState(true)
	const [isHidden, setIsHidden] = useState({
		timeline: true,
		about: false,
		following: false,
		followers: false,
		photos: false,
	})
	const { timeline, about, following, followers, photos } = isHidden
	const { email, firstName, lastName, currentUserAvatarUrl, id, created_at } = timelineUser[0]

	const onClickHidden = (e) =>{
		const target = e.target.innerText
		setIsHidden({
			timeline: false,
			about: false,
			following: false,
			followers: false,
			photos: false,
			[target.toLowerCase()]: true
		})
	}
	console.log('timeline')

	return(
		<div className='timeline__container'>
			<div className='timeline-header-container'>
				<figure className='timeline__cover-image-container'>
					<img src='' className='timeline__cover-image' />
				</figure>
				<ul className='timeline__lists-container'>
					<figure className='timeline__user-image-container'>
						<img src={ currentUserAvatarUrl } alt='timeline' className='timeline__user-image'/>
						<Link to={`/${id}`}className='header-3 timeline__name-container'>
							<span className='timeline__name'>{ firstName } { lastName }</span>
							<span className='timeline__nickname'>(Test)</span>
						</Link>
					</figure>

					<li id='timeline' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Timeline</span></li>
					<li id='about' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>About</span></li>
					<li id='following' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Following</span></li>
					<li id='followers' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Followers</span></li>
					<li id='photos' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Photos</span></li>
				</ul>
			</div>
			{ timeline ? 
				<div className='timeline-post-container'>
					<TimelineUserInfo featuredPhoto={ currentUserAvatarUrl } />
					<Posts isTimeline={ isTimeline } timelineUID={ id } />
				</div>
			: ''}
			{ about ? <About timelineUser={ timelineUser[0] }/> : ''}
			{ following ? <Following /> : ''}
			{ followers ? <Followers /> : ''}
			{ photos ? <Photos /> : ''}
		</div>
	)
}

const mapsStateToProps = (state, ownProps) =>{
	const userID = ownProps.match.params.currentUID
	return({
		timelineUser: selectTimelineUsers(userID)(state), 
		currentUser: selectCurrentUser(state)
	})
}

export default connect(mapsStateToProps)(Timeline)



