import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { selectIsPostsFetching, selectTimelinePosts } from '../../redux/crud/crud.selectors'

import LoadingSpinner from '../loading-spinner/loading-spinner.component'
import TimelineContentPlaceholder from '../timeline-content-placeholder/timeline-content-placeholder.component'
import PhotosItem from '../photos-item/photos-item.component'

import './photos.style.scss'

const Photos = ({ isFetching, id, posts }) =>{
	const [imageUrl, setImageUrl] = useState({ email: '', firstName: '', lastName: '', post: '', postImageUrl: '', userDP: '' })
	const [isHidden, setHidden] = useState(false)
	const [checkImageUrl, setCheck] = useState([])

	const { email, firstName, lastName, post, postImageUrl, userDP } = imageUrl

	useEffect(() =>{
		let unsubscribed = false

		if(!unsubscribed){
			if(isFetching){
				const url = posts.filter(post => post.postImageUrl ? post.postImageUrl : '' )
				setCheck(url)
			}else setCheck(null)
		}

		return () => { unsubscribed = true }

	}, [posts, isFetching])

	const showModalImage = (email, firstName, lastName, post, postImageUrl, userDP) =>{
		setImageUrl({ email: email, firstName: firstName, lastName: lastName, post: post, postImageUrl: postImageUrl, userDP: userDP })
		setHidden(!isHidden)
	}

	const hideModal = () =>{
		setHidden(false)
	}
	console.log('Photos Component')
	return(
		<div className='photos'>
			<div className='photos__header'>
				<span className='photos__icon-container'>
					<i className="fas fa-images photos__icon"></i>
				</span>
				<h3 className='photos__title header-3'>Photos</h3>
			</div>
			
				{
					checkImageUrl === null ? 
					<LoadingSpinner size='medium' substitutionSmall='true'/> 

					: checkImageUrl !== null && checkImageUrl.length > 0 ?
					<div className='photos__lists'>
						{
							posts.map(post => (
								post.postImageUrl ? <PhotosItem key={ post.id } showModalImage={ showModalImage } { ...post } /> : ''
							)) 	
						}
					</div>
					
					: <TimelineContentPlaceholder description='No Photos.'/> 
				}


			{
				isHidden ? 
					<div className='photos__modal-overlay'>
						<div className='photos__content'>
							<span className='photos__close-button'>
								<i onClick={ hideModal } className="fas fa-times"></i>
							</span>
							<div className={ `photos__content-header ${post.length < 1 ? 'reset-padding' : ''}` }>
								<figure className='photos__user-image-container'>
									<img src={ userDP } className='photos__user-image' alt='user modal' />
								</figure>
								<div className={ `photos__name-container ${post.length < 1 ? 'reset-padding' : ''}` }>
									<p className='photos__name'>{ firstName } { lastName }</p>
									<p className='photos__email'><em>{ email }</em></p>
								</div>
							</div>
							{ post.length > 0 ? <p className='photos__caption'>{ post }</p> : ''}
							<figure className='photos__modal-image-container'>
								<img src={ postImageUrl } className='photos__modal-image' alt='post modal'/>
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
		posts: selectTimelinePosts(timelineUID)(state),
		isFetching: selectIsPostsFetching(state)
	})
}
export default connect(mapStateToProps)(Photos)