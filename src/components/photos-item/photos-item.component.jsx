import React from 'react'

import './photos-item.style.scss'

const PhotosItem = ({ email, firstName, lastName, post, postImageUrl, userDP, showModalImage }) =>(
	<figure onClick={ () => showModalImage(email, firstName, lastName, post, postImageUrl, userDP) }className='photos__image-container'>
		<img src={ postImageUrl } className='photos__image' />
	</figure>
)

export default PhotosItem