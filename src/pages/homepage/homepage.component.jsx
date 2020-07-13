import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { selectIsPostsFetching } from '../../redux/crud/crud.selectors'

import Posts from '../../components/posts/posts.component'
import AddPost from '../../components/add-post/add-post.component'
import Suggestions from '../../components/suggestions/suggestions.component'
import PreviewProfile from '../../components/preview-profile/preview-profile.component'

import './homepage.component.scss'

const Hompage = ({ isFetching }) =>{
	const [windowWidth, setWidth] = useState(window.innerWidth)
	useEffect(() =>{

		const resize = () =>{
			setWidth(window.innerWidth)		
		}

		window.addEventListener('resize', resize)

		return () => { window.removeEventListener('resize', resize) }
	}, [windowWidth])

	const condition = false
	const timelineUID = 'NO ID'

	console.log('Homepage component')
	return(
	<div className='homepage'>
		<div className='container'>
			<div className='newsfeed-container'>
				<AddPost />
				<Posts isTimeline={ condition } timelineUID={ timelineUID } />				
			</div>

			{ windowWidth <= 700 ? <Suggestions numberOfUsers={ 10 }/> : '' }

			<div className='suggestions-preview-profile-container'>
				<PreviewProfile />
				<Suggestions numberOfUsers={ 5 }/>
		  	</div> 
		</div>
	</div>
)}

const mapStateToProps = state =>({
	isFetching: selectIsPostsFetching(state)
})

export default connect(mapStateToProps)(Hompage)


// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }