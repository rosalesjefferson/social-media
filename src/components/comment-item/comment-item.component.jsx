import React from 'react'

import './comment-item.style.scss'

const CommentItem = ({ firstName, lastName, comment }) =>(
		<li className='comment__item'>
			<p className='comment__item-name'>{ firstName } { lastName }: </p>
			<p className='comment__item-comment'>{ comment }</p>
		</li>
)

export default CommentItem