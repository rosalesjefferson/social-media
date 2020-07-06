import React, { useState, useEffect }  from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { deletePostStart } from '../../redux/crud/crud.actions'

import EditPostCaption from '../edit-post-caption/edit-post-caption.component'


import './post-dropdown.style.scss'

const PostDropdown = ({ passHandleClickHideDropdown, isHidden, deletePostStart, match, location, ...otherProps }) =>{
	const [isModalHidden, setIsModalHidden] = useState(false)
	const [isDeleteHidden, setDelete] = useState(false)
	const [isSpinnerHidden, setSpinnerHidden] = useState(false)
	const { postItemId, post, currentUID, postUID } = otherProps

	useEffect(() =>{
		let unsubscribed = false
		if(!unsubscribed){
			if(!isHidden) setDelete(false)
		}
		return () => { unsubscribed = true }
	}, [isHidden])

	const handleClickEdit = (uid, postuid) =>{
		if(uid !== postuid) return
		passHandleClickHideDropdown()
		setIsModalHidden(true)
		setDelete(false)
	}

	const passHandleClickEdit = () =>{
		setIsModalHidden(false)
	}

	const handleClickShow = (uid, postuid) =>{
		if(uid !== postuid) return
		setDelete(!isDeleteHidden)
	}

	const handleClickDelete = (uid, postuid) =>{
		if(uid !== postuid) return
		setSpinnerHidden(true)
		deletePostStart({ postItemId })
	}

	console.log('post dropdown')
	return(
		<div className='post__dropdown-container'>
		{
			isHidden ? 
				<div className='post__dropdown-buttons-container'>
					<span onClick={ () => handleClickEdit(currentUID, postUID) } className={ `post__dropdown-button edit ${currentUID !== postUID ? 'not': ''}` }>
						<i className="far fa-edit icon-dropdown"></i> 
						<span className='post__dropdown-text'>
							{ currentUID === postUID ? 'Edit Caption' : 'Not Allowed' }
						</span>
					</span>

					<span onClick={ () => handleClickShow(currentUID, postUID) } className={ `post__dropdown-button delete ${currentUID !== postUID ? 'not': ''}` }>
						<i className="far fa-trash-alt icon-dropdown"></i>
						<span className='post__dropdown-text'>
					 		{ currentUID === postUID ? 'Delete Post' : 'Not Allowed' }
						</span>
					</span>
				</div> : ''
		}

		{
			isDeleteHidden ? 
				<div className='post__dropdown-sure-container'>
					<span className='post__dropdown-sure'>Are you sure you want to delete?</span>

					<button onClick={ () => handleClickDelete(currentUID, postUID) } className={ `post__dropdown-sure-button ${isSpinnerHidden ? 'remove-background' : ''}` }>
							{
								isSpinnerHidden ? <div className='post__dropdown-spinner-container'>
													<span className={ `post__dropdown-spinner ${isSpinnerHidden ? 'active' : ''}` }></span>
												</div> : 'Yes'
							} 
					</button> 
				</div> : ''
		}
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
					// {
					// 	isSpinnerHidden ? 
					// 		<div className='post__dropdown-spinner-container'>
					// 			<span className='post__dropdown-spinner'></span>
					// 		</div>
					// 	: <button onClick={ () => handleClickDelete(currentUID, postUID) } className='post__dropdown-sure-button'>Yes</button>
					// }


	// const handleClickCopyToClipboard = (e) =>{
	// 	const copyText = document.getElementById("myInput")
	// 	copyText.select();
	// 	document.execCommand("copy")
	// 	console.log('copied to clip board')
	// }

// <span onClick={ currentUID === postUID ? handleClickCopyToClipboard : notAllowed  } className={ `post__dropdown-button copy ${currentUID !== postUID ? 'not': ''}` }>
// 	<i onClick={ currentUID === postUID ? handleClickCopyToClipboard : notAllowed  } className="far fa-copy icon-dropdown">
// 	</i> 
// 	<input type="text" id="myInput" defaultValue={`${match.path}${postItemId}`} className='post__dropdown-copy-value'/>
// 	<span className='post__dropdown-text'>{ currentUID === postUID ? 'Copy Link' : 'Not Allowed' }</span>
// </span>
// // <input type="text" id="myInput" defaultValue={`${match.path}${postItemId}`} className='post__dropdown-copy-value'/>
