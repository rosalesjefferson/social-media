import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUsersStart } from '../../redux/user/user.actions'
import { selectUsers } from '../../redux/user/user.selectors'

import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component'
import UserItem from '../user-item/user-item.component'

import './suggestions.style.scss'

const Suggestions = ({ fetchUsersStart, users, numberOfUsers }) =>{
	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			fetchUsersStart()
		}
		return () => { unsubscribed = true }
	}, [fetchUsersStart])
	console.log('suggestions component')
	return(
			<div className='suggestions__container'>
				<div className='suggestions__header-container'>
					<h5 className='suggestions__title'>Suggestions For You</h5>
					<Link to='/suggested' className='suggestions__see-all'>See all</Link>
				 </div> 

				{
					users === null ? <LoadingSpinner size='medium' /> : ''
				}

				{
					users !== null && users.length > 0 
					? <ul className='suggestions__lists-container'>
						{	
							users
							.filter((user, index) => index < numberOfUsers)
							.map(user =>(
								<UserItem key={ user.id } buttonText='Follow' { ...user } />
							))
						}
					  </ul> 
				  	: ''	
				}

				{
					users !== null && users.length < 1 
					? <div className='suggestions__nothing-placeholder-container'>
				  		<span className='suggestions__nothing-placeholder'>Nothing To follow</span>
					  </div> : ''
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

export default connect(mapsStateToProps, mapDispatchToProps)(Suggestions)

					// .filter((user, index) => index < 4)
