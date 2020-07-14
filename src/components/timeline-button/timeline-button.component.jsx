import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { followUserStart } from '../../redux/user/user.actions'

import './timeline-button.style.scss'

const TimelineButton = ({ currentUser, followUserStart, timelineUserInfo: { id, firstName, lastName, email, userDP }, windowWidth }) =>{
	const [isHidden, setHidden] = useState(false)
	const [isFollowing, setFollowing] = useState(false)
	const [isSpinnerHidden, setSpinner] = useState(false)

	useEffect(() =>{
		const isExist = currentUser.following.find(follow => follow.followingUserId === id)
		if(isExist) setFollowing(true)

		else setFollowing(false)

		setHidden(false)
		setSpinner(false)
	}, [id, currentUser.following])

	const handleClickHide = () =>{
		setHidden(!isHidden)
	}

	const toFollowOrUnfollow = () =>{
		followUserStart({ firstName, lastName, id, email, userDP })
		setSpinner(true)
	}
	return(
		<div className='timeline__button-container'>
			{
				isFollowing ? <button className='timeline__button-following'>
								{ windowWidth > 600 ? <i className="fas fa-check timeline__button-icon check"></i> : '' }
								{ windowWidth > 600 ? <span className='timeline__button-text'>Following</span> : '' }
								{ windowWidth > 600 ? <i onClick={ handleClickHide } className="fas fa-caret-down timeline__button-icon down"></i> : '' }
								
								{
									windowWidth <= 600 ?
									<i onClick={ handleClickHide } className="fas fa-user-check timeline__button-icon"></i>
									: ''
								}

								<div className={ `timeline__dropdown ${isHidden ? 'active' : ''}` }>
									<span onClick={ toFollowOrUnfollow } className='timeline__dropdown-button'>Unfollow</span>
									{ isSpinnerHidden ?
										<div className='timeline__spinner-container'>
											<span className='timeline__spinner'></span>
										</div>
										: ''
									}
								</div> 
							</button>

				: <button className= {`timeline__button-following ${!isFollowing ? 'follow' : ''  }` }>
				{ windowWidth > 600 ? <span onClick={ toFollowOrUnfollow } className='timeline__button-text'>Follow</span> : '' }
				{ windowWidth <= 600 ? <i onClick={ toFollowOrUnfollow } className="fas fa-user-plus timeline__button-icon"></i> : '' }
					
					{ isSpinnerHidden ?
							<div className='timeline__spinner-container'>
								<span className='timeline__spinner'></span>
							</div>
						: ''
					}
				</button>
			}
		</div>
	)
}

const mapDispatchToProps = dispatch =>({
	followUserStart: data => dispatch(followUserStart(data))
})

export default connect(null, mapDispatchToProps)(TimelineButton)