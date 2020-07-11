import React from 'react'

import './photos-item.style.scss'

const PhotosItem = ({ firstName, lastName, post, postImageUrl, userDP, timestamp, showModalImage }) =>{
	return(
		<figure onClick={ () => showModalImage( firstName, lastName, post, postImageUrl, userDP, timestamp, showModalImage) } 
			className='photos__image-container'
		>
			<img src={ postImageUrl } className='photos__image' alt='timeline gallery'/>
		</figure>
	)
}
export default PhotosItem