import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchFollowingStart } from '../../redux/user/user.actions'
import { selectIsFollowingFetching, selectTimelineFollowing } from '../../redux/user/user.selectors'

import LoadingSpinner from '../loading-spinner/loading-spinner.component'
import FollowersItem from '../followers-item/followers-item.component'
import TimelineContentPlaceholder from '../timeline-content-placeholder/timeline-content-placeholder.component'

import './following.style.scss'

const Following = ({ timelineUID, isFollowingFetching, fetchFollowingStart, following, reset }) =>{
	useEffect(() =>{
		let unsubscribe = false

		if(!unsubscribe)fetchFollowingStart({ timelineUID })

		return () => { unsubscribe = true }

	}, [fetchFollowingStart, timelineUID])

	console.log('Following Component')
	return(
		<div className='following'>
			<div className='following__header'>
				<span className='following__icon-container'>
					<i className="fas fa-user-friends following__icon"></i>
				</span>
				<h3 className='following__title header-3'>Following</h3>
			</div>
			{
				!isFollowingFetching ? <LoadingSpinner size='medium' substitutionSmall='true' /> 

				: isFollowingFetching && following.length > 0 ?
					<ul className='following__lists'>
						{
							following.map(({ id, ...otherProps }) =>(
								<FollowersItem key={ id } reset={ reset } { ...otherProps } />
							))
						}
					</ul>
					
				 : <TimelineContentPlaceholder description='No following. Follow now!' arrowButton='true' />
			}
		</div>
	)
}

const mapDispatchToProps = dispatch =>({ fetchFollowingStart: timelineUID => dispatch(fetchFollowingStart(timelineUID)) })

const mapStateToProps = state =>({ 
	isFollowingFetching: selectIsFollowingFetching(state),
	following: selectTimelineFollowing(state) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Following)