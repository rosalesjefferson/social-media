import React from 'react'
import moment from 'moment'

import './comment-item.style.scss'

const CommentItem = ({ firstName, lastName, timestamp, comment }) =>(
	<li className='comment__item'>
		<p className='comment__item-name'>
			{ firstName } { lastName }: 
			<span className='comment__item-comment'>{ comment }</span>
		</p>
		<p className='comment__item-time'>{ moment(timestamp).fromNow() }</p>
	</li>
)

export default CommentItem

