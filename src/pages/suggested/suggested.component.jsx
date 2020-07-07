import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { selectUsers } from '../../redux/user/user.selectors'
import { fetchUsersStart } from '../../redux/user/user.actions'

import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component'
import UserItem from '../../components/user-item/user-item.component'

import './suggested.style.scss';

const Suggested = ({ fetchUsersStart, users }) =>{
	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			fetchUsersStart()
		}
		return () => { unsubscribed = true }
	}, [fetchUsersStart])
		return(
		<div className='suggested-container'>
			{
				users === null ? <LoadingSpinner substitution='true' /> :
				<div className='container'>
					<h4 className=' suggested__title header-4'>Suggested</h4>
						{
							users !== null && users.length > 0 ? 
							<div className='suggested__users-container'>
								{
									users.map(user =>(
										<UserItem key={ user.id } buttonText='Follow' marginRightMedium='true' { ...user } />
									))
								}
							 </div> 
							 
						 	: <div className='suggested__nothing-placeholder-container'>
					  			<span className='suggested__nothing-placeholder'>Nothing To follow</span>
						  	  </div> 
						}
				</div>
			}
		</div>
	)
}
const mapsStateToProps = state =>({
	users: selectUsers(state)
})

const mapDispatchToProps = dispatch =>({
	fetchUsersStart: () => dispatch(fetchUsersStart())
})

export default connect(mapsStateToProps, mapDispatchToProps)(Suggested)