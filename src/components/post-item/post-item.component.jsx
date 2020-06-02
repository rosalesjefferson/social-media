import React, { useState } from 'react'

import CommentItem from '../comment-item/comment-item.component'

import AddComment from '../add-comment/add-comment.component'

import './post-item.style.scss'

const PostItem = ({post, ...otherProps}) =>{
		console.log('post-item component')
	return(
	<div className='post-item__container mb-2'>
		<div className='post__item'>
			<h1>{ post } </h1>
		</div>

		<AddComment />

		<ul className='comments__lists-container'>
			<CommentItem/>
		</ul>
	</div>
)}

export default React.memo(PostItem)