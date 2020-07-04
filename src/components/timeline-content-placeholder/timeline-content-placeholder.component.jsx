import React from 'react'
import { Link } from 'react-router-dom'

import './timeline-content-placeholder.style.scss'

const TimelineContentPlaceholder = ({ description, arrowButton }) =>(
	<div className='timeline-content-placeholder'>
		<h4 className='timeline-content-placeholder__text'>{ description }</h4>
		{
			arrowButton ? 
				<Link to='/suggested' className='timeline-content-placeholder__icon-container'>
					<i className="fas fa-long-arrow-alt-right timeline-content-placeholder__icon"></i>
				</Link>
			: ''
		}

	</div>
)

export default TimelineContentPlaceholder