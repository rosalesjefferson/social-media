import React, { useState, useMemo } from 'react'

import PostDropdown from '../post-dropdown/post-dropdown.component'

import './post-item-header-buttons.style.scss'

const PostItemHeaderButtons = ({ ...otherProps }) =>{
	const [isHidden, setIsHidden] = useState(false)
	const outsideDropdown = useMemo(() =>{
		document.addEventListener('click', (e) =>{
			if(!e.target.closest('.post__item-header-button')) setIsHidden(false)
			// if (!document.querySelector('.post__item-header-button').contains(e.target)) setIsHidden(false)
		})
	}, [isHidden])

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
							handleClick={ handleClick }
						/>
				</div>
			</div>
			
		)
}

export default React.memo(PostItemHeaderButtons)