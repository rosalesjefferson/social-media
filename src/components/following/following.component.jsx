import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFollowingStart } from '../../redux/user/user.actions'
import { selectTimelineFollowing } from '../../redux/user/user.selectors'

import FollowersItem from '../followers-item/followers-item.component'

import './following.style.scss'

const Following = ({ timelineUID, fetchFollowingStart, following, reset }) =>{
	useEffect(() =>{
		let unsubscribe = false
		if(!unsubscribe){
			fetchFollowingStart({ timelineUID })
		}
		return () => { unsubscribe = true }
	}, [fetchFollowingStart, timelineUID])

	return(
		<div className='following'>
			<div className='following__header'>
				<span className='following__icon-container'>
					<i className="fas fa-user-friends following__icon"></i>
				</span>
				<h3 className='following__title header-3'>Following</h3>
			</div>
			<ul className='following__lists'>
				{
					following.map(({ id, ...otherProps }) =>(
						<FollowersItem key={ id } reset={ reset } { ...otherProps } />
					))
				}
			</ul>
		</div>
	)
}

const mapDispatchToProps = dispatch =>({ fetchFollowingStart: timelineUID => dispatch(fetchFollowingStart(timelineUID)) })

const mapStateToProps = state =>({ following: selectTimelineFollowing(state) })

export default connect(mapStateToProps, mapDispatchToProps)(Following)