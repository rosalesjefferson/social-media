import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFollowingStart } from '../../redux/user/user.actions'

import './following.style.scss'

const Following = ({ timelineUID, fetchFollowingStart }) =>{
	useEffect(() =>{
		let unsubscribe = false
		if(!unsubscribe){
			fetchFollowingStart({ timelineUID })
		}
		return () => { unsubscribe = true }
	}, [fetchFollowingStart])

	console.log('following')
	return(
		
	<h1>FOLLOWING</h1>
)}

const mapDispatchToProps = dispatch =>({
	fetchFollowingStart: timelineUID => dispatch(fetchFollowingStart(timelineUID))
})

export default connect(null, mapDispatchToProps)(Following)