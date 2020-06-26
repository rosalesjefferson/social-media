import React, { useState, useEffect } from 'react'

import PostDropdown from '../post-dropdown/post-dropdown.component'

import './post-item-header-buttons.style.scss'

const PostItemHeaderButtons = ({ ...otherProps }) =>{
	const [isHidden, setIsHidden] = useState(false)
	// useEffect(() =>{
	// 	let unsubscribed = false
	// 	if(!unsubscribed){
	// 		document.addEventListener('click', (e) =>{
	// 			// if(!e.target.closest('.post__item-header-button')) setIsHidden(false)
	// 			if (!document.querySelector('.post__item-header-button').contains(e.target)) setIsHidden(false)
	// 		})
	// 	}

	// 	// cleanup function or unmount in class
	// 	return () => { unsubscribed = true }
	// }, [isHidden])

	const handleClick = () =>{
		setIsHidden(!isHidden)
	}

	const setHiddenToFalse = () =>{
		setIsHidden(false)
	}	
	return(
			<div className='post__item-header-button-container'>
				<div className='post__item-header-button'>
					<span onClick={ handleClick } className='post__item-headner-button'><i className="fas fa-ellipsis-h"></i></span>
						<PostDropdown 
							{...otherProps}
							isHidden={ isHidden }
							setHiddenToFalse={ setHiddenToFalse }
						/>
				</div>
			</div>
			
		)
}

export default React.memo(PostItemHeaderButtons)