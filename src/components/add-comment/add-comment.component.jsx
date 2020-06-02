import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addCommentStart } from '../../redux/crud/crud.actions'

import './add-comment.style'

const AddComment = ({ addCommentStart }) =>{
	const [comment, setComment] = useState('')
	const handleChange = (e) =>{
		const value = e.target.value
		setComment(value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		addCommentStart({ comment })
		setComment('')
	}
	console.log('add comment component')
	return(
		<form onSubmit={ handleSubmit } className='add-comment-form'>
				<input 
					className='add-comment__input'
					id='comment'
					type='text' 
					onChange={ handleChange }
					value={ comment }
					placeholder='comment'
				/>
			<button type='submit' className='add-comment__button'>Add</button>
		</form>
	)
}

const mapsDispatchToProps = dispatch =>({
	addCommentStart: (comment) => dispatch(addCommentStart(comment))
})

export default connect(null, mapsDispatchToProps)(AddComment)