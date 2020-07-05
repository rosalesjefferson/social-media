import React, { useState, useEffect } from 'react'

import './photos-item.style.scss'

const PhotosItem = ({ email, firstName, lastName, post, postImageUrl, userDP, showModalImage }) =>{
	const [isDark, setDark] = useState(false)
	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			setTimeout(() =>{
				setDark(true)
			}, 500)
		}
		return () => { unsubscribed = true }
	}, [isDark])
	return(
		<figure onClick={ () => showModalImage(email, firstName, lastName, post, postImageUrl, userDP, showModalImage) } 
			className={ `photos__image-container ${isDark ? 'has-image' : ''}` }
		>
			<img src={ postImageUrl } className='photos__image' />
		</figure>
	)
}
export default PhotosItem