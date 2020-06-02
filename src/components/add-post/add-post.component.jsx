import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addPostStart } from '../../redux/crud/crud.actions'

import './add-post.style.scss'

const AddPost = ({ addPostStart }) =>{
	const [posts, setPost] = useState({ post: '' })

	const handleChange = (e) =>{
		const { id, value } = e.target
		setPost({ ...posts, [id]: value })
	}

	const { post } = posts

	const handleSubmit = (e) =>{
		e.preventDefault()
		addPostStart({ post })
		setPost({ post: '' })
	}
	return(
	<div className='add-post__container'>
		<h5 className='header-5'>Create Post</h5>
		<form onSubmit={ handleSubmit } className='add-post__form'>
			<div className='add-post__form-group'>
				<textarea 
					value={ post }
					onChange={ handleChange }
					id='post'
					type='text' 
					className='add-post__form-input' 
					placeholder={`What's on your mind, Jefferson?`}
				></textarea>
			</div>
			<div className='add-post__button-container'>
				<p>other buttons to follow</p>
				<button  className='add-post__button'>Post</button>
			</div>
		</form>
	</div>
)}

const mapsStateToDispatch = dispatch => ({
	addPostStart: (post) => dispatch(addPostStart(post))
})

export default connect(null, mapsStateToDispatch)(AddPost)