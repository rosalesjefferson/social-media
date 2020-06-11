import React, { useState, useEffect } from 'react'

import ReactionButton from '../reaction-button/reaction-button.component'
import CommentItem from '../comment-item/comment-item.component'

import './comments.style.scss'

const Comments = ({ comments }) =>{
	const [isHidden, setIsHidden] = useState(false)

	useEffect(() =>{
		let container = document.querySelector('.comments__lists-container')
  		// container.current.scrollIntoView({behavior: 'smooth'})
		// container.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

		// messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
	}, [])

	const hideComments = () =>{
		setIsHidden(!isHidden)
	}
	console.log(comments.length, 'length')
	return(
		<div className='comments__container'>
			<ReactionButton hideComments={ hideComments } />
				{ 
				comments.length > 0 ? 
				 <ul className={`comments__lists-container 
				 	${isHidden ? 'active' : ''}
				 	${comments.length === 2 ? 'two' : ''}
				 	${comments.length >= 3 ? 'three' : ''}
				 	`}>
					 { 
					 	comments
					 	.map((comment, index) =>(
							<CommentItem key={index} { ...comment } />
					   ))
					 }
				 </ul>
				 : ''
				}
		</div>
	)
}

export default Comments
					    // .filter((comment, index) => index < 4)
