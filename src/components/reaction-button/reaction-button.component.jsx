import React, { useState } from 'react'

import './reaction-button.style.scss'

const ReactionButton = ({ hideComments }) =>{

	const handleClickComments = () =>{
		hideComments()
	}

	return(
		<div className='reaction-button-container'>
			<div className='reaction__likes-container'>
				<p className='reaction__likes'><i className="far fa-thumbs-up"></i> 20 likes</p>
				<p className='reaction__likes'>10 shares</p>
				<p className='reaction__likes'>&bull;</p>
				<p className='reaction__likes'>13 comments</p>
			</div>
			<div className='reaction__buttons'>
				<span className='reaction__button'><i className="far fa-thumbs-up"></i></span>
				<span className='reaction__button'><i onClick={ handleClickComments } className="far fa-comment-alt"></i></span>
				<span className='reaction__button'><i className="far fa-share-square"></i></span>
			</div>

		</div>
	)
}
export default ReactionButton