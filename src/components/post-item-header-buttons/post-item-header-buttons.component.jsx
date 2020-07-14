import React, { useState, useEffect } from 'react'

import PostDropdown from '../post-dropdown/post-dropdown.component'

import './post-item-header-buttons.style.scss'

const PostItemHeaderButtons = ({ ...otherProps }) =>{
	const [isHidden, setIsHidden] = useState(false)

	useEffect(() =>{
		const clickOutside = e =>{
			if(!e.target.closest('.post__item-header-button-container')) setIsHidden(false)
		}

		window.addEventListener('click', clickOutside)

		return () => {  window.removeEventListener('click', clickOutside) }
	}, [isHidden])

	const handleClick = () =>{
		setIsHidden(!isHidden)
	}
	console.log('post item header buttons 3 dots')
	return(
			<div className='post__item-header-button-container'>
				<div className='post__item-header-button'>
					<span onClick={ handleClick } className='post__item-header-icon-container'><i className="fas fa-ellipsis-h"></i></span>
						<PostDropdown 
							{...otherProps}
							isHidden={ isHidden }
							passHandleClickHideDropdown={ handleClick }
						/>
				</div>
			</div>
			
		)
}

export default React.memo(PostItemHeaderButtons)