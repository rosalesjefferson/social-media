import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFollowersStart } from '../../redux/user/user.actions'
import { selectTimelineFollowers, selectIsFollowersFetching } from '../../redux/user/user.selectors'


import LoadingSpinner from '../loading-spinner/loading-spinner.component'
import TimelineContentPlaceholder from '../timeline-content-placeholder/timeline-content-placeholder.component'
import FollowersItem from '../followers-item/followers-item.component'

// https://www.youtube.com/watch?v=74iHoCM83Mg

import './followers.style.scss'

const Followers = ({ timelineUID, fetchFollowersStart, isFollowersFetching, followers, reset }) =>{
	useEffect(() =>{
		let unsubscribe = false
		
		if(!unsubscribe) fetchFollowersStart({ timelineUID })

		return () => { unsubscribe = true }

	}, [fetchFollowersStart, timelineUID])

	console.log('Followers Component')
	
	return(
		<div className='followers'>
			<div className='followers__header'>
				<span className='followers__icon-container'>
					<i className="fas fa-user-friends followers__icon"></i>
				</span>
				<h3 className='followers__title header-3'>Followers</h3>
			</div>
			{
				!isFollowersFetching ? <LoadingSpinner size='medium' substitutionSmall='true' /> : ''
			}

			{
				isFollowersFetching && followers.length > 0 ?
					<ul className='followers__lists'>
						{
							followers.map(({ id, ...otherProps }) =>(
								<FollowersItem key={ id } reset={ reset } { ...otherProps } />
							))
						}
					</ul> : ''
			}

			{
				isFollowersFetching && followers.length < 1 ? <TimelineContentPlaceholder description='No followers.'/> : ''
			}
		</div>
	)
}

const mapDispatchToProps = dispatch =>({ fetchFollowersStart: timelineUID => dispatch(fetchFollowersStart(timelineUID)) })

const mapsStateToProps = state =>({ 
	followers: selectTimelineFollowers(state) ,
	isFollowersFetching: selectIsFollowersFetching(state)
})

export default connect(mapsStateToProps, mapDispatchToProps)(Followers)