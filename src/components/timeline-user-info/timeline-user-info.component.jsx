import React from 'react'

import './timeline-user-info.style.scss'

const TimelineUserInfo = ({ featuredPhoto }) =>{

	return(
		<div className='timeline-user-info-container'>
			<div className='timeline-user-info__bio-container'>
				<div className='timeline-user-info__header-container'>
					<span className='timeline-user-info__header-icon-container'>
						<i className="fas fa-globe-asia"></i>
					</span>
					<p className='timeline-user-info__title'>Intro</p>
				</div>
				<div className='timeline-user-info__content-container'>
					<span className='timeline-user-info__icon-container'>
						<i className='far fa-comment-alt timeline-user-info__icon'></i>
					</span>
					<p className='timeline-user-info__bio'>I love my smell!</p>
				</div>
			</div>
			<figure className='timeline-user-info__featured-photo-container'>
				<img src={ featuredPhoto } className='timeline-user-info__featured-photo' />
			</figure>
		</div>
	)
}

export default TimelineUserInfo