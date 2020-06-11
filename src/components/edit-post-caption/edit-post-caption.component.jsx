import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'

import { editCaptionStart } from '../../redux/crud/crud.actions'

import './edit-post-caption.style.scss'

const EditPostCaption = ({postItemId, post, isModalHidden, passHandleClickEdit, editCaptionStart }) =>{
	const [caption, setCaption] = useState(post)
	// const [isHidden, setIsHidden] = useState(false)
	const [isSpinnerHidden, setSpinner] = useState(false)

	const handleChange = (e) =>{
		const value = e.target.value
		setCaption(value)
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		editCaptionStart({ caption, postItemId })
		setSpinner(true)
	}

	const match = useMemo(() =>{
		if(caption === post){
			setSpinner(false)
			setTimeout(() =>{
				passHandleClickEdit()
			}, 2)
		}
	}, [post])

	console.log(isModalHidden, 'caption component')
	return(
		<div className={ `edit-post-caption__outside-background ${isModalHidden ? 'active' : ''}`}>
			<div className='edit-post-caption__container'>
				<h5 className='header-5 edit-post-caption__title'>Edit Caption</h5>
				<div className={ `edit-post-caption__spinner-container ${isSpinnerHidden ? 'active' : '' }` }>
					<span className='edit-post-caption__spinner'></span>
				</div>
				<form onSubmit={ handleSubmit } className='edit-post-caption__form'>
				<div className='edit-post-caption__form-group'>
					<textarea 
						value={ caption }
						onChange={ handleChange }
						id='caption'
						type='text' 
						className='edit-post-caption__input' 
					></textarea>
					<button type='submit' className={ `edit-post-caption__button ${caption.length > 0 ? 'active' : ''}` }>Save</button>
				</div>
				</form>
			</div>
		</div>
	)
}

const mapsDispatchToProps = dispatch =>({
	editCaptionStart: (caption) => dispatch(editCaptionStart(caption))
})

export default React.memo(connect(null, mapsDispatchToProps)(EditPostCaption))