import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFollowersStart } from '../../redux/user/user.actions'
import { selectTimelineFollowers } from '../../redux/user/user.selectors'
// https://www.youtube.com/watch?v=74iHoCM83Mg

import './followers.style.scss'

const Followers = ({ timelineUID, fetchFollowersStart, followers }) =>{
	useEffect(() =>{
		let unsubscribe = false
		if(!unsubscribe){
			fetchFollowersStart({ timelineUID })
		}
		return () => { unsubscribe = true }
	}, [fetchFollowersStart])

	console.log('followers', followers)
	return(
		<div className='followers'>
			{
				followers.map(follower =>(
					<h1 key={ follower.id }>{ follower.firstName } { follower.lastName }</h1>
				))
			}
		</div>
	)
}

const mapDispatchToProps = dispatch =>({
	fetchFollowersStart: timelineUID => dispatch(fetchFollowersStart(timelineUID))
})

const mapsStateToProps = state =>({
	followers: selectTimelineFollowers(state)
})

export default connect(mapsStateToProps, mapDispatchToProps)(Followers)