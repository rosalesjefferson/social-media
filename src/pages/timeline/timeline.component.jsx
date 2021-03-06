import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCurrentUser, selectTimelineUsers } from '../../redux/user/user.selectors'
import { fetchUsersStart } from '../../redux/user/user.actions'

import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component'
import TimelineButton from '../../components/timeline-button/timeline-button.component'
import AddPost from '../../components/add-post/add-post.component'
import Posts from '../../components/posts/posts.component'
import TimelineUserInfo from '../../components/timeline-user-info/timeline-user-info.component'
import About from '../../components/about/about.component'
import Following from '../../components/following/following.component'
import Followers from '../../components/followers/followers.component'
import Photos from '../../components/photos/photos.component'

import './timeline.style.scss';

const Timeline = ({ timelineUser, currentUser, match, fetchUsersStart }) =>{
	const [isTimeline] = useState(true)
	const [isHidden, setIsHidden] = useState({
		timeline: true,
		about: false,
		following: false,
		followers: false,
		photos: false,
	})

	const [windowWidth, setWidth] = useState(window.innerWidth)
	const [isDropdownHidden, setDropdown] = useState(false)

	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			fetchUsersStart()
		}
		return () => { unsubscribed = true }
	}, [fetchUsersStart])


	useEffect(() =>{
			resetToTimelineComponent()
	}, [timelineUser])


	useEffect(() => {
		const resize = () =>{
			setWidth(window.innerWidth)		
		}

		window.addEventListener('resize', resize)

		return () => { window.removeEventListener('resize', resize) }
	})


	useEffect(() => {
		const clickOutside = e =>{
			if(!e.target.closest('.timeline__dropdown-icon-container'))setDropdown(false)
		}

		window.addEventListener('click', clickOutside)

		return () => { window.removeEventListener('click', clickOutside) }
	}, [isDropdownHidden])

	const { timeline, about, following, followers, photos } = isHidden
	const { firstName, lastName, userDP, userCover, id, featuredPhoto, bio, nickname, created_at  } = timelineUser
	const UID = currentUser.UID

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

	const resetToTimelineComponent = () =>{
		setIsHidden({
			timeline: true,
			about: false,
			following: false,
			followers: false,
			photos: false
		})	
	}
	console.log('Timeline Component')
	return(
 			<div className='timeline__padding'>
 				<div className='timeline__container'>
	 				{
		 				timelineUser.length < 1 ? 
		 				 <LoadingSpinner substitution='true' />
		 				: <div>
								<div className='timeline-header-container'>
									<figure className='timeline__cover-image-container'>
										{ userCover.length > 0 ? <img src={ userCover } className='timeline__cover-image' alt='cover'/>
										: '' }
										{ UID !== id ?
											<TimelineButton currentUser={ currentUser } timelineUserInfo={ timelineUser } windowWidth={ windowWidth }/>
											: ''
										}

										{
											windowWidth <= 600 ?
											<span onClick={ () => setDropdown(!isDropdownHidden) } className='timeline__dropdown-icon-container'><i className="fas fa-ellipsis-h timeline__dropdown-icon"></i></span>
											: ''

										}


									{
										windowWidth <= 600 ?
										<ul className={ `timeline__lists-dropdown ${ isDropdownHidden ? 'visible' : '' }` }>
											<li id='timeline' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Timeline</span></li>
											<li id='about' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>About</span></li>
											<li id='following' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Following</span></li>
											<li id='followers' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Followers</span></li>
											<li id='photos' className='timeline__item'><span onClick={ onClickHidden } className='timeline__link'>Photos</span></li>
										</ul> : ''
									}

									</figure>
									<ul className='timeline__lists-container'>
										<figure className='timeline__user-image-container'>
											<img src={ userDP } alt='timeline' className='timeline__user-image'/>
											<Link to={`/timeline/${id}`}className='header-3 timeline__name-container'>
												<span className='timeline__name'>{ firstName } { lastName }</span>
												<span className='timeline__nickname'>{`${nickname.length > 0 ? `(${ nickname })` : '' }`}</span>
											</Link>
										</figure>

										<li id='timeline' className='timeline__item'><span onClick={ onClickHidden } className={ `timeline__link ${timeline ? 'active' : ''}`}>Timeline</span></li>
										<li id='about' className='timeline__item'><span onClick={ onClickHidden } className={ `timeline__link ${about ? 'active' : ''}`}>About</span></li>
										<li id='following' className='timeline__item'><span onClick={ onClickHidden } className={ `timeline__link ${following ? 'active' : ''}`}>Following</span></li>
										<li id='followers' className='timeline__item'><span onClick={ onClickHidden } className={ `timeline__link ${followers ? 'active' : ''}`}>Followers</span></li>
										<li id='photos' className='timeline__item'><span onClick={ onClickHidden } className={ `timeline__link ${photos ? 'active' : ''}`}>Photos</span></li>
									</ul>

									{
										windowWidth <= 600 ?
										<div className='timeline__user-display-photo-info-container'>
											<figure className='timeline__user-image-container'>
												<img src={ userDP } alt='timeline' className='timeline__user-image'/>
											</figure>

											<Link to={`/timeline/${id}`}className='header-3 timeline__name-container'>
												<span className='timeline__name'>{ firstName } { lastName }</span>
												<span className='timeline__nickname'>{`${nickname.length > 0 ? `(${ nickname })` : '' }`}</span>
											</Link>
										</div> : ''

									}

								</div>

								{ timeline ? 
									<div className='timeline-feed-container'>
										<TimelineUserInfo 
											featuredPhoto={ featuredPhoto } 
											bio={ bio } 
											timelineUID={ id } 
											UID={ UID } 
											joined={ created_at }
										/> 
										<div className='timeline-posts-container'>
											{ id === UID ? <AddPost /> : '' }
											<Posts isTimeline={ isTimeline } timelineUID={ id } />
										</div>
									</div>
								: ''}
								{ about ? <About timelineUser={ timelineUser } UID={ UID }/> : ''}
								{ following ? <Following timelineUID={ id } reset={ resetToTimelineComponent } /> : ''}
								{ followers ? <Followers timelineUID={ id } reset={ resetToTimelineComponent } /> : ''}
								{ photos ? <Photos timelineUID={ id }/> : ''}
							</div>	
	 				}
	 			</div>
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


const mapDispatchToProps = dispatch => ({
	fetchUsersStart: () => dispatch(fetchUsersStart())
})
export default connect(mapsStateToProps, mapDispatchToProps)(Timeline)



