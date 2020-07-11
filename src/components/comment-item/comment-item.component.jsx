import React from 'react'
import moment from 'moment'

import './comment-item.style.scss'

const CommentItem = ({ firstName, lastName, timestamp, comment }) =>(
		<li className='comment__item'>
			<div className='comment__item-description'>
				<p className='comment__item-name'>{ firstName } { lastName }: </p>
				<p className='comment__item-comment'>{ comment }</p>
			</div>
			<p className='comment__item-time'>{ moment(timestamp).fromNow() }</p>
		</li>
)

export default CommentItem

