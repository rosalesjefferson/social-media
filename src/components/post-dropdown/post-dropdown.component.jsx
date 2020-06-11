import React, { useState, useEffect }  from 'react'
import { connect } from 'react-redux'

import { deletePostStart } from '../../redux/crud/crud.actions'
import { updatePostModalVisibility } from '../../redux/toggle/toggle.actions'

import EditPostCaption from '../edit-post-caption/edit-post-caption.component'


import './post-dropdown.style.scss'

const PostDropdown = ({ isHidden, deletePostStart, updatePostModalVisibility, setHiddenToFalse, ...otherProps }) =>{
	const [isModalHidden, setIsModalHidden] = useState(false)
	const { postItemId, post, postUID, currentUID } = otherProps
	console.log( postUID, 'POSTuid')

	useEffect(() =>{
		document.addEventListener('click', (e) =>{
			if(e.target.className !== 'post__dropdown-button edit'){
				if(!e.target.closest('.edit-post-caption__container')){
					setIsModalHidden(false)
				}
			}
		})
	}, [isModalHidden])

	const handleClickEdit = () =>{
		setIsModalHidden(true)
		setHiddenToFalse()
	}

	const passHandleClickEdit = () =>{
		setIsModalHidden(false)
	}

	const handleClickHide = (e) =>{

	}

	const handleClickDelete = (e) =>{
		deletePostStart({ postItemId })
	}
	return(
		<div className='post__dropdown-container'>
			<div className={ `post__dropdown-buttons-container ${isHidden ? 'active' : ''}` }>
				<span onClick={ handleClickEdit } className='post__dropdown-button edit'><i onClick={ handleClickEdit } className="far fa-edit"></i> Edit Caption</span>
				<span onClick={ handleClickHide } className='post__dropdown-button hide'><i onClick={ handleClickEdit } className="far fa-times-circle"></i> Hide Post</span>
				<span onClick={ handleClickDelete } className='post__dropdown-button delete'><i onClick={ handleClickEdit } className="far fa-trash-alt"></i> Delete Post</span>
			</div>
			<EditPostCaption 
				postItemId={ postItemId }
				post={ post }
				isModalHidden={ isModalHidden }
				passHandleClickEdit={ passHandleClickEdit }
			/>
		</div>
	)
}

const mapsDispatchToProps = dispatch =>({
	deletePostStart: (post) => dispatch(deletePostStart(post)),
	updatePostModalVisibility: () => dispatch(updatePostModalVisibility())
})

export default connect(null, mapsDispatchToProps)(PostDropdown)

