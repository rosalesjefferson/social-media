import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchPostsStart } from '../../redux/crud/crud.actions'
import { selectUserAndPosts } from '../../redux/crud/crud.selectors'

import AddPost from '../../components/add-post/add-post.component'
import PostItem from '../../components/post-item/post-item.component'

import './homepage.component.scss'

const Hompage = ({ fetchPostsStart, posts }) =>{
	useEffect(() =>{
		fetchPostsStart()
	}, [fetchPostsStart])
	
	console.log('homepage', posts)
	return(
	<div className='homepage'>
		<div className='container'>
			<div className='newsfeed__container'>
				<AddPost />
				{
					posts.map(({ id, ...otherProps }) =>(
						<PostItem key={ id } { ...otherProps } />
					))
				}
			</div>
			<div className='friends-suggestion-container'>
				<h1> FRIENDS </h1>
			</div>
		</div>
	</div>
)}

const mapsDispatchToProps = dispatch => ({
	fetchPostsStart: () => dispatch(fetchPostsStart())
})

const mapsStateToProps = (state) => ({
	posts: selectUserAndPosts(state)
})

export default React.memo(connect(mapsStateToProps, mapsDispatchToProps)(Hompage))