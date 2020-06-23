import React, { useState } from 'react'
import { connect } from 'react-redux'

import { editBioFeaturedStart } from '../../redux/user/user.actions'

import './timeline-user-info.style.scss'

const TimelineUserInfo = ({ featuredPhoto, bio, timelineUID, editBioFeaturedStart }) =>{
	const [timelineUserInfo, setTimelineUserInfo] = useState({ bioEdit: bio, featuredPhotoEdit: null })
	const [isHidden, setHidden] = useState(true)
	const { bioEdit, featuredPhotoEdit } = timelineUserInfo

	const handleChange = (e) =>{
		const { id, value } = e.target
		setTimelineUserInfo({ ...timelineUserInfo, [id]: value })
	}

	const handleFileChange = (e) =>{
		const imageFile = e.target.files[0]
		setTimelineUserInfo({ ...timelineUserInfo, featuredPhotoEdit: imageFile})
	}

	const handleClickClearImage = () =>{
		setTimelineUserInfo({ ...timelineUserInfo, featuredPhotoEdit: null })
	}

	const handleSubmit = (e) =>{
		e.preventDefault()
		editBioFeaturedStart({ bioEdit, featuredPhotoEdit, timelineUID })
		setTimelineUserInfo({ bioEdit: '', featuredPhotoEdit: null })
		setHidden(false)
	}
	return(
		<div className='timeline-user-info-container'>
			<div className='timeline-user-info__bio-container'>
				<div className='timeline-user-info__header-container'>
					<span className='timeline-user-info__header-icon-container'>
						<i className="fas fa-globe-asia"></i>
					</span>
					<p className='timeline-user-info__title'>Intro</p>
					<span className='timeline-user-info__icon-edit-container'><i className="far fa-edit"></i></span>
				</div>

			{isHidden ?
				<div className='timeline-user-info__form-overlay'>
					<form onSubmit={ handleSubmit }className='timeline-user-info__form-container'>
						<h5 className='timeline-user-info__form-header-container header-5'>
							<span className='timeline-user-info__form-header-title'>Edit</span>
							<span className='timeline-user-info__form-header-icon-container'><i className="fas fa-times"></i></span>
						</h5>
						<textarea 
							value={ bioEdit }
							onChange={ handleChange }
							type='text' 
							id='bioEdit'
							className='timeline-user-info__input'
						  	placeholder={ `${bioEdit ? '' : 'Exp. Aspiring Software Engineer'}` }
						></textarea>
						<div className={ `timeline-user-info__form-group ${featuredPhotoEdit ? 'active' : ''}` }>
							<label htmlFor='imgFile' className='timeline-user-info__label'>
								<span className='timeline-user-info__icon-container'><i className="far fa-image"></i></span>
								<span className='timeline-user-info__text'>Featured photo</span>
							</label>
	 						<input type='file' id='imgFile' onChange={ handleFileChange } className='timeline-user-info__image-file'/>
	 						{featuredPhotoEdit ? <figure className='timeline-user-info__image-container'>
								<img className='timeline-user-info__image' src={URL.createObjectURL(featuredPhotoEdit)} alt='edit bio' />
								<span className='timeline-user-info__image-close'><i onClick={ handleClickClearImage } className="fas fa-times"></i></span>
							</figure> : ''}
							<button className='timeline-user-info__button'>Save</button>
						</div>
					</form>
				</div>
			: ''}



				<div className='timeline-user-info__content-container'>
					{bio ? '' :
						<span className='timeline-user-info__icon-container'>
							<i className='far fa-comment-alt timeline-user-info__icon'></i>
						</span> 
					}
					{ bio ? <p className='timeline-user-info__bio'>{ bio }</p> 
						  : <p className='timeline-user-info__bio active'>Add a bio</p>
					}
				</div>
			</div>
			{featuredPhoto ? 
				<figure className='timeline-user-info__featured-photo-container'>
					<img src={ featuredPhoto } className='timeline-user-info__featured-photo' alt='featured photos' />
				</figure>
			:  
				<div className='timeline-user-info__content-container'>
					{bio ? '' :
						<span className='timeline-user-info__icon-container'>
							<i className='far fa-image timeline-user-info__icon'></i>
						</span> 
					}
					<p className='timeline-user-info__bio active'>Add a featured photo</p>

				</div>
		    }
		</div>
	)
}

const mapDispatchToProps = (dispatch) =>({
	editBioFeaturedStart: (data) => dispatch(editBioFeaturedStart(data))
})

export default connect(null, mapDispatchToProps)(TimelineUserInfo)
