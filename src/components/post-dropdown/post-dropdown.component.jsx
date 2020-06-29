import React, { useState }  from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { deletePostStart } from '../../redux/crud/crud.actions'

import EditPostCaption from '../edit-post-caption/edit-post-caption.component'


import './post-dropdown.style.scss'

const PostDropdown = ({ handleClick, isHidden, deletePostStart, setHiddenToFalse, match, location, ...otherProps }) =>{
	const [isModalHidden, setIsModalHidden] = useState(false)
	const { postItemId, post, currentUID, postUID } = otherProps

	// useEffect(() =>{
	// 	let unsubscribed = false
	// 	if(!unsubscribed){
	// 		document.addEventListener('click', (e) =>{
	// 			if(e.target.className !== 'post__dropdown-button edit'){
	// 				if(!e.target.closest('.edit-post-caption__container')){
	// 					setIsModalHidden(false)
	// 				}
	// 			}
	// 		})
	// 	}

	// 	return () => { unsubscribed = true }
	// }, [isModalHidden])

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
	const notAllowed = () =>{
		console.log('not allowed')
	}

	const handleClickCopyToClipboard = (e) =>{
		// const copyText = document.getElementById("myInput")
		// copyText.select();
		// document.execCommand("copy")
		console.log('copied to clip board')
	}
	console.log('post dropdown')
	return(
		<div className='post__dropdown-container'>
			<div className={ `post__dropdown-buttons-container ${isHidden ? 'active' : ''}` }>
				<span onClick={ currentUID === postUID ? handleClickEdit : notAllowed } className={ `post__dropdown-button edit ${currentUID !== postUID ? 'not': ''}` }>
					<i onClick={ currentUID === postUID ? handleClickEdit : notAllowed } className="far fa-edit icon-dropdown">
					</i> 
					<span className='post__dropdown-text'>{ currentUID === postUID ? 'Edit Caption' : 'Not Allowed' }</span>
				</span>
				<span onClick={ currentUID === postUID ? handleClickDelete: notAllowed } className={ `post__dropdown-button delete ${currentUID !== postUID ? 'not': ''}` }>
					<i onClick={ currentUID === postUID ? handleClickDelete: notAllowed } className="far fa-trash-alt icon-dropdown">
					</i>
					<span className='post__dropdown-text'>{ currentUID === postUID ? 'Delete Post' : 'Not Allowed' }</span>
				</span>
				<span onClick={ currentUID === postUID ? handleClickCopyToClipboard : notAllowed  } className={ `post__dropdown-button copy ${currentUID !== postUID ? 'not': ''}` }>
					<i onClick={ currentUID === postUID ? handleClickCopyToClipboard : notAllowed  } className="far fa-copy icon-dropdown">
					</i> 
					<span className='post__dropdown-text'>{ currentUID === postUID ? 'Copy Link' : 'Not Allowed' }</span>
				</span>
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
