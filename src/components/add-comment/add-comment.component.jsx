import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addCommentStart } from '../../redux/crud/crud.actions'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import './add-comment.style.scss'

const AddComment = ({ addCommentStart, getCurrentUser, postItemId }) =>{
	const [comment, setComment] = useState('')
	const { UID, email, firstName, lastName } = getCurrentUser

	const handleChange = (e) =>{
		const value = e.target.value
		setComment(value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		addCommentStart({ comment, postItemId, email, firstName, lastName, UID })
		setComment('')
	}
	return(
		<form onSubmit={ handleSubmit } className='add-comment__form'>
				<input 
					className='add-comment__input'
					id='comment'
					type='text' 
					onChange={ handleChange }
					value={ comment }
					placeholder='Add a comment...'
				/>
			<button type='submit' className={ `add-comment__button ${comment.length  > 0 ? 'active': ''}`}>Post</button>
		</form>
	)
}

const mapsStateToProps = state =>({
	getCurrentUser: selectCurrentUser(state)
})

const mapsDispatchToProps = dispatch =>({
	addCommentStart: (comment) => dispatch(addCommentStart(comment))
})

export default connect(mapsStateToProps, mapsDispatchToProps)(AddComment)