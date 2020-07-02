import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFollowersStart } from '../../redux/user/user.actions'
import { selectTimelineFollowers } from '../../redux/user/user.selectors'

import FollowersItem from '../followers-item/followers-item.component'

// https://www.youtube.com/watch?v=74iHoCM83Mg

import './followers.style.scss'

const Followers = ({ timelineUID, fetchFollowersStart, followers, reset }) =>{
	useEffect(() =>{
		let unsubscribe = false
		
		if(!unsubscribe) fetchFollowersStart({ timelineUID })

		return () => { unsubscribe = true }

	}, [fetchFollowersStart, timelineUID])

	return(
		<div className='followers'>
			<div className='followers__header'>
				<span className='followers__icon-container'>
					<i className="fas fa-user-friends followers__icon"></i>
				</span>
				<h3 className='followers__title header-3'>Followers</h3>
			</div>
			<ul className='followers__lists'>
				{
					followers.map(({ id, ...otherProps }) =>(
						<FollowersItem key={ id } reset={ reset } { ...otherProps } />
					))
				}
			</ul>
		</div>
	)
}

const mapDispatchToProps = dispatch =>({ fetchFollowersStart: timelineUID => dispatch(fetchFollowersStart(timelineUID)) })

const mapsStateToProps = state =>({ followers: selectTimelineFollowers(state) })

export default connect(mapsStateToProps, mapDispatchToProps)(Followers)