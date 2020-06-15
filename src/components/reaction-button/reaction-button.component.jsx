import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { addLikeStart } from '../../redux/crud/crud.actions'

import './reaction-button.style.scss'

const ReactionButton = ({ hideComments, totalComments, currentUID, addStart, postItemId, likes }) =>{
	const [isLikeActive, setLike] = useState(false)

	useEffect(() =>{
		let unsubscribed = false
		const likesFunc = async () =>{
			if(!unsubscribed){
				const matchID = await likes.find(like => like.currentUID === currentUID)	
					
				if(matchID){
					setLike(true)
				}else{
					setLike(false)
				}
			}
		}

		likesFunc()
		
		return () => { unsubscribed = true }
	}, [likes, currentUID])

	const handleClickComments = () =>{
		hideComments()
	}
	const handleClickLike = () =>{
		setLike(!isLikeActive)
		addStart({ currentUID, postItemId })
	}

	return(
		<div className='reaction-button-container'>
			<div className='reaction__counts-container'>
				<p className='reaction__counts'>
				{ likes.length > 0 ? <span><i className="far fa-thumbs-up"></i> { likes.length } { likes.length === 1 ? 'like' : 'likes' }</span> : '' }
				</p>
				{totalComments > 0 ? <p onClick={ handleClickComments } className='reaction__counts'>&bull; { totalComments  } { totalComments === 1 ? 'comment' : 'comments'  }</p>: '' }
			</div>
			<div className='reaction__buttons'>
				<span className={ `reaction__button ${isLikeActive ? 'active' : ''}` }><i onClick={ handleClickLike }className="far fa-thumbs-up"></i></span>
				<span className='reaction__button'><i onClick={ handleClickComments } className="far fa-comment-alt"></i></span>
			</div>

		</div>
	)
}

const mapsDipatchToProps = dispatch =>({
	addStart: (UID) => dispatch(addLikeStart(UID))
})

export default connect(null, mapsDipatchToProps)(ReactionButton)

				// <span className='reaction__button'><i className="far fa-share-square"></i></span>
