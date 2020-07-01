import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { editBioFeaturedStart } from '../../redux/user/user.actions'

import './timeline-user-info.style.scss'

const TimelineUserInfo = ({ featuredPhoto, bio, timelineUID, UID, joined, editBioFeaturedStart }) =>{
	const [timelineUserInfo, setTimelineUserInfo] = useState({ bioEdit: bio, featuredPhotoEdit: null, existingFeaturedPhoto: featuredPhoto })
	const [isHidden, setHidden] = useState(false)
	const [isSpinnerHidden, setIsSpinnerHidden] = useState(false)

	const { bioEdit, featuredPhotoEdit, existingFeaturedPhoto } = timelineUserInfo

	useEffect(() =>{
		if(bioEdit !== bio || existingFeaturedPhoto !== featuredPhotoEdit){
			setHidden(false)
			setTimelineUserInfo({ ...timelineUserInfo, bioEdit: bio, featuredPhotoEdit: null })
		}
	}, [bio, featuredPhoto])

	const onClickEdit = () =>{
		setHidden(!isHidden)
		setIsSpinnerHidden(false)
		setTimelineUserInfo({ ...timelineUserInfo, featuredPhotoEdit: null })
	}

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
		editBioFeaturedStart({ bioEdit, featuredPhotoEdit, timelineUID, existingFeaturedPhoto: existingFeaturedPhoto })
		setIsSpinnerHidden(true)
	}
	console.log(bio, 'bio')

	return(
		<div className='timeline-user-info-container'>
			<div className='timeline-user-info__bio-container'>
				<div className='timeline-user-info__header-container'>
					<span className='timeline-user-info__header-icon-container'>
						<i className="fas fa-globe-asia"></i>
					</span>
					<p className='timeline-user-info__title'>Intro</p>
					{ UID === timelineUID ?
						<span className='timeline-user-info__icon-edit-container'><i onClick={ onClickEdit } className="far fa-edit timeline-user-info__icon-edit"></i></span>
						: ''
					}
				</div>

				<div className={ `timeline-user-info__form-overlay 
									${isHidden ? 'visible' : ''}
							  `}>
					<form onSubmit={ handleSubmit }className='timeline-user-info__form-container'>
						<h5 className='timeline-user-info__form-header-container header-5'>
							<span className='timeline-user-info__form-header-title'>Edit</span>
							<span className='timeline-user-info__form-header-icon-container'><i onClick={ onClickEdit } className="fas fa-times"></i></span>
						</h5>
						<textarea 
							value={ bioEdit }
							onChange={ handleChange }
							type='text' 
							id='bioEdit'
							className={ `timeline-user-info__input ${featuredPhoto.length < 1 ? 'no-featured': ''}` }
						  	placeholder='Exp. Aspiring Software Engineer'
						></textarea>
						<div className={ `timeline-user-info__form-group ${featuredPhotoEdit ? 'active' : ''}` }>
							<label htmlFor='imgFile' className='timeline-user-info__label'>
								<span className='timeline-user-info__icon-container'><i className="far fa-image"></i></span>
								<span className='timeline-user-info__text'>Featured photo</span>
							</label>

	 						<input type='file' id='imgFile' onChange={ handleFileChange } className='timeline-user-info__image-file'/>
	 						{featuredPhotoEdit ?
		 						 <figure className='timeline-user-info__image-container'>
									<img className='timeline-user-info__image' src={URL.createObjectURL(featuredPhotoEdit)} alt='edit bio' />
									<span onClick={ handleClickClearImage } className='timeline-user-info__image-close'><i  className="fas fa-times"></i></span>
								</figure> 
							: ''}

							<button className={ `timeline-user-info__button 
													${bioEdit.length > 0 ? 'active' : ''}
													${featuredPhotoEdit ? 'active' : ''}
													${isSpinnerHidden ? 'hide-button' : ''}
												` }
							>Save</button>
							<div className={ `timeline-user-info__spinner-container ${isSpinnerHidden ? 'active' : ''}` }>
								<span className='timeline-user-info__spinner'></span>
							</div>
						</div>
					</form>
				</div>

				{
					UID === timelineUID ?
						<div className='timeline-user-info__content-container'>
							{bio.length > 0 ? '' :
								<span className='timeline-user-info__icon-container'>
									<i className='far fa-comment-alt timeline-user-info__icon'></i>
								</span> 
							}
							{ bio.length > 0 ? <p className='timeline-user-info__bio'>{ bio }</p> 
								  : <p onClick={ onClickEdit } className='timeline-user-info__bio active'>Add a bio</p>
							}
						</div>
					: <div className='timeline-user-info__content-container'>
						{ bio.length > 0 ? <p className='timeline-user-info__bio'>{ bio }</p> 
							  : <p className='timeline-user-info__joined-container'><span className='timeline-user-info__joined'>Joined: </span>{ joined }</p> 
						}
					 </div>
				}
			</div>
			{featuredPhoto.length > 0 ? 
				<figure className='timeline-user-info__featured-photo-container'>
					<img src={ featuredPhoto } className='timeline-user-info__featured-photo' alt='featured photos' />
				</figure>
			:  ''
		    }

		    {
		    	UID === timelineUID ? 
			    	<div className='timeline-user-info__content-container'>
						{
						    featuredPhoto.length > 0 ? '' :
							<span className='timeline-user-info__icon-container'>
								<i className='far fa-image timeline-user-info__icon'></i>
							</span> 
						}

						{ featuredPhoto.length < 1 ?
							<p onClick={ onClickEdit } className='timeline-user-info__bio active'>Add a featured photo</p>
							: ''
						}
					</div>
				: ''
		    }
		</div>
	)
}

const mapDispatchToProps = (dispatch) =>({
	editBioFeaturedStart: (data) => dispatch(editBioFeaturedStart(data))
})

export default connect(null, mapDispatchToProps)(TimelineUserInfo)
