import React, { useState } from 'react'
import { connect } from 'react-redux'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { addPostStart } from '../../redux/crud/crud.actions'

import './add-post.style.scss'

const AddPost = ({ addPostStart, currentUser }) =>{
	const [posts, setPost] = useState({ post: '', imageObject: null,  })
	
	const { post, imageObject } = posts
	const handleChange = (e) =>{
		const { id, value } = e.target
		setPost({ ...posts, [id]: value })
	}

	const handleFileChange = (e) =>{
		const imageFile = e.target.files[0]
		setPost({ ...posts, imageObject: imageFile})
		console.log(e.target)
	}


	const handleSubmit = (e) =>{
		e.preventDefault()
		if(post.length > 0 || imageObject){
			addPostStart({ post, imageObject })
			setPost({ post: '', imageObject: null })
		}else return
	}

	const handleClickClose = () =>{
		setPost({ ...posts, imageObject: null})
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
					placeholder={ currentUser ? `What's on your mind, ${ currentUser.firstName }?`: `What's on your mind?` }
				></textarea>
			</div>
			<div className={ `add-post__button-container ${imageObject ? 'active' : ''  }` }>
				<label htmlFor='imgFile' className='add-post__label'>
					<span className='add-post__icon'><i className="far fa-image"></i></span>
					<span className='add-post__text'>Photo</span>
				</label>
				{imageObject ? 
					<figure className='add-post__image-container'>
						<img className='add-post__image' src={URL.createObjectURL(imageObject)} alt='post' />
						<figcaption className='add-post__image-close'><i onClick={ handleClickClose } className="fas fa-times"></i></figcaption>
					</figure>
				: null}
	 			<input type='file' id='imgFile' onChange={ handleFileChange } className='add-post__image-file'/>
				<button  className={ `add-post__button ${posts.post.length > 0 || imageObject ? 'active' : ''}` }>Post</button>
			</div>
		</form>
	</div>
)}

const mapsStateToDispatch = dispatch => ({
	addPostStart: (post) => dispatch(addPostStart(post))
})

const mapsStateToProps = state =>({
	currentUser: selectCurrentUser(state)
})

export default connect(mapsStateToProps, mapsStateToDispatch)(AddPost)



/*
<label htmlFor='imgFile' className='add-post__label'>
	<span className='add-post__icon'><i className="far fa-image"></i></span>
	<span className='add-post__text'>Photo/Video</span>
</label>
<label htmlFor='location' className='add-post__label location'>
	<span className='add-post__icon'><i className="fas fa-map-marker-alt"></i></span>
	<span className='add-post__text'>Location</span>
</label>
<label htmlFor='activity' className='add-post__label activity'>
	<span className='add-post__icon'><i className="far fa-smile"></i></span>
	<span className='add-post__text'>Feeling/Activity</span>
</label>
*/


// const { image } = images
	// const uploadChange = async (e) =>{
	// 	const file = e.target.files[0]
	// 	setImage({ image: file })

	// 	const storageRef = storage.ref()
	// 	const fileRef = storageRef.child('userAvatar/jefferson.jpg')
	// 	const url = await fileRef.getDownloadURL()
	// 	console.log(url, 'URL')
	// }
	// const uploadSubmit = async (e) =>{
	// 	e.preventDefault()
	// 	console.log(image)
		// let storageRef = storage.ref()
		// // fetch image
		// const fileRef = storageRef.child(`userAvatar/${image.name}`)
		// // upload image
		// await fileRef.put(image)
		// console.log(URL.createObjectURL(image))
// https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript

		// fileRef.put(image).then(() =>
		// 	console.log('uploaded file')
		// )
		// const fileUrl = await fileRef.getDownloadURL()
	// }


// <form >
// 			<label htmlFor='avatar'>Upload</label>
// 			<input type='text' id='name' onChange={ uploadChange } placeholder='name' />
// 			<button>submit</button>
// 		</form>

// 		<ul>
// 		</ul>
