import React, { useState, useEffect }  from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { deletePostStart } from '../../redux/crud/crud.actions'

import EditPostCaption from '../edit-post-caption/edit-post-caption.component'


import './post-dropdown.style.scss'

const PostDropdown = ({ isHidden, deletePostStart, setHiddenToFalse, match, location, ...otherProps }) =>{
	const [isModalHidden, setIsModalHidden] = useState(false)
	const { postItemId, post } = otherProps

	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			document.addEventListener('click', (e) =>{
				if(e.target.className !== 'post__dropdown-button edit'){
					if(!e.target.closest('.edit-post-caption__container')){
						setIsModalHidden(false)
					}
				}
			})
		}

		return () => { unsubscribed = true }
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

	const handleClickCopyToClipboard = (e) =>{
		// const copyText = document.getElementById("myInput")
		// copyText.select();
		// document.execCommand("copy")
		console.log('copied to clip board')
	}
	return(
		<div className='post__dropdown-container'>
			<div className={ `post__dropdown-buttons-container ${isHidden ? 'active' : ''}` }>
				<span onClick={ handleClickEdit } className='post__dropdown-button edit'><i onClick={ handleClickEdit } className="far fa-edit icon-dropdown"></i> Edit Caption</span>
				<span onClick={ handleClickHide } className='post__dropdown-button hide'><i onClick={ handleClickHide } className="far fa-times-circle icon-dropdown"></i> Hide Post</span>
				<span onClick={ handleClickDelete } className='post__dropdown-button delete'><i onClick={ handleClickDelete } className="far fa-trash-alt icon-dropdown"></i> Delete Post</span>
				<span onClick={ handleClickCopyToClipboard } className='post__dropdown-button copy'><i onClick={ handleClickCopyToClipboard } className="far fa-copy icon-dropdown"></i> Copy Link</span>
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
	deletePostStart: (post) => dispatch(deletePostStart(post))
})

export default withRouter(connect(null, mapsDispatchToProps)(PostDropdown))

				// <input type="text" id="myInput" defaultValue={`${match.path}${postItemId}`} className='post__dropdown-copy-value'/>
