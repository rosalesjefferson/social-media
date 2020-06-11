import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'


import PostDropdown from '../post-dropdown/post-dropdown.component'
import { updatePostDropdownVisibility } from '../../redux/toggle/toggle.actions'

import './post-item-header-buttons.style.scss'

const PostItemHeaderButtons = ({updatePostDropdownVisibility, ...otherProps }) =>{
	const [isHidden, setIsHidden] = useState(false)
	useEffect(() =>{
		document.addEventListener('click', (e) =>{
			if(!e.target.closest('.post__item-header-button')){
				setIsHidden(false)
			}
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
						/>
				</div>
			</div>
			
		)
}

const mapsDispatchToProps = dispatch => ({
	updatePostDropdownVisibility: () => dispatch(updatePostDropdownVisibility())
})

export default React.memo(connect(null, mapsDispatchToProps)(PostItemHeaderButtons))