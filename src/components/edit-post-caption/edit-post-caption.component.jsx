import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { editCaptionStart } from '../../redux/crud/crud.actions'

import './edit-post-caption.style.scss'

const EditPostCaption = ({postItemId, post, passHandleClickEdit, editCaptionStart }) =>{
	const [caption, setCaption] = useState(post)
	const [isSpinnerHidden, setSpinner] = useState(false)

	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			setTimeout(() =>{
				setSpinner(false)
			}, 500)
		}
		return () => { unsubscribed = true }
	}, [post])

	const handleChange = (e) =>{
		const value = e.target.value
		setCaption(value)
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		editCaptionStart({ caption, postItemId })
		setSpinner(true)
	}

	const hideModal = () =>{
		passHandleClickEdit()
	}
	console.log('edit post caption component')
	return(
		<div className='edit-post-caption__outside-background'>
			<div className='edit-post-caption__container'>
				<div className='edit-post-caption__header-container'>
					<h5 className='header-5 edit-post-caption__title'>Edit Caption</h5>
					<span className='edit-post-caption__close-button'><i onClick={ hideModal } className="fas fa-times"></i></span>
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
						<button type='submit' className={ `edit-post-caption__button 
								${caption.length > 0 ? 'active' : ''}
								${isSpinnerHidden ? 'hidden' : ''} 
						`}>Save</button>
						<div className={ `edit-post-caption__spinner-container ${isSpinnerHidden ? 'active' : '' }` }>
							<span className='edit-post-caption__spinner'></span>
						</div>
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