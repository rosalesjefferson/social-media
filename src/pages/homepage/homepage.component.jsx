import React from 'react'
import { connect } from 'react-redux'

import { selectIsPostsFetching } from '../../redux/crud/crud.selectors'

import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component'
import Posts from '../../components/posts/posts.component'
import AddPost from '../../components/add-post/add-post.component'
import Suggestions from '../../components/suggestions/suggestions.component'
import PreviewProfile from '../../components/preview-profile/preview-profile.component'

import './homepage.component.scss'

const Hompage = ({ isFetching }) =>{
	const condition = false
	const timelineUID = 'NO ID'
	return(
	<div className='homepage'>
		<div className='container'>
			<div className='newsfeed-container'>
				<AddPost />
				<Posts isTimeline={ condition } timelineUID={ timelineUID } />				
			</div>	
		<div className='suggestions-preview-profile-container'>
			<PreviewProfile />
			<Suggestions />
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