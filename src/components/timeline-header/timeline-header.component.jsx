// import React from 'react'
// import { connect } from 'react-redux'
// import { Link, withRouter } from 'react-router-dom'

// import { selectTimelinePosts } from '../../redux/crud/crud.selectors'
// import { selectCurrentUser, selectTimelineUsers } from '../../redux/user/user.selectors'

// import './timeline-header.style.scss'

// const TimelineHeader = ({currentUser }) =>{
// 	// console.log(timelineUser, 'timelineUser')
// 	// const { email, firstName, lastName, currentUserAvatarUrl, id } = timelineUser[0]
// 	return(
// 		<div className='timeline-header-container'>
// 			<h1>asdasd</h1>
// 		</div>
// 	)
// }

// const mapsStateToProps = (state, ownProps) =>{
// 	console.log(ownProps)
// 	return({
// 		currentUser: selectCurrentUser(state)
// 	})
// }

// export default withRouter(connect(mapsStateToProps)(TimelineHeader))



import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { selectCurrentUser, selectTimelineUsers } from '../../redux/user/user.selectors'

import './timeline-header.style.scss'

const TimelineHeader = ({ timelineUser, currentUser }) =>{
	console.log(timelineUser, 'timelineUser')
	const { email, firstName, lastName, currentUserAvatarUrl, id } = timelineUser[0]
	return(
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

				<li className='timeline__item'><Link to={ `/timeline/${id}` } className='timeline__link'>Timeline</Link></li>
				<li className='timeline__item'><Link to={ `/about/${id}` } className='timeline__link'>About</Link></li>
				<li className='timeline__item'><Link to={ `/timeline/following/${id}` } className='timeline__link'>Following</Link></li>
				<li className='timeline__item'><Link to={ `/timeline/followers/${id}` } className='timeline__link'>Followers</Link></li>
				<li className='timeline__item'><Link to={ `/timeline/photos/${id}` } className='timeline__link'>Photos</Link></li>
			</ul>
		</div>
	)
}

const mapsStateToProps = (state, ownProps) =>{
	const userID = ownProps.match.params.currentUID
	console.log(userID, 'userID')
	console.log(ownProps, 'ownProps')
	return({
		timelineUser: selectTimelineUsers(userID)(state), 
		currentUser: selectCurrentUser(state)
	})
}

export default withRouter(connect(mapsStateToProps)(TimelineHeader))
