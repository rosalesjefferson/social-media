import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { selectTimelinePosts } from '../../redux/crud/crud.selectors'

import PhotosItem from '../photos-item/photos-item.component'

import './photos.style.scss'

const Photos = ({ id, posts }) =>{
	const [imageUrl, setImageUrl] = useState({ email: '', firstName: '', lastName: '', post: '', postImageUrl: '', userDP: '' })
	const [isHidden, setHidden] = useState(false)

	const { email, firstName, lastName, post, postImageUrl, userDP } = imageUrl

	// useEffect(() =>{
	// 	document.addEventListener('click', e =>{
	// 		if(e.target.className === 'photos__modal-overlay')setHidden(false)
	// 	})
	// })

	const showModalImage = (email, firstName, lastName, post, postImageUrl, userDP) =>{
		setImageUrl({ email: email, firstName: firstName, lastName: lastName, post: post, postImageUrl: postImageUrl, userDP: userDP })
		setHidden(!isHidden)
	}

	const hideModal = () =>{
		setHidden(false)
	}
	console.log('photos')
	return(
		<div className='photos'>
			<div className='photos__header'>
				<span className='photos__icon-container'>
					<i className="fas fa-images photos__icon"></i>
				</span>
				<h3 className='photos__title header-3'>Photos</h3>
			</div>
			<div className='photos__lists'>
				{
					posts.map(post => (
						post.postImageUrl ? <PhotosItem key={ post.id } showModalImage={ showModalImage } { ...post } /> : ''
					))
				}
			</div>

			{
				isHidden ? 
					<div className='photos__modal-overlay'>
						<div className='photos__content'>
							<span className='photos__close-button'>
								<i onClick={ hideModal } className="fas fa-times"></i>
							</span>
							<div className={ `photos__content-header ${post.length < 1 ? 'reset-padding' : ''}` }>
								<figure className='photos__user-image-container'>
									<img src={ userDP } className='photos__user-image' />
								</figure>
								<div className={ `photos__name-container ${post.length < 1 ? 'reset-padding' : ''}` }>
									<p className='photos__name'>{ firstName } { lastName }</p>
									<p className='photos__email'><em>{ email }</em></p>
								</div>
							</div>
							{ post.length > 0 ? <p className='photos__caption'>{ post }</p> : ''}
							<figure className='photos__modal-image-container'>
								<img src={ postImageUrl } className='photos__modal-image' />
							</figure>
						</div>
					</div> : ''
			}

		</div>
	)
}

const mapStateToProps = (state, ownProps) =>{
	const { timelineUID } = ownProps
	return({
		posts: selectTimelinePosts(timelineUID)(state)
	})
}
export default connect(mapStateToProps)(Photos)