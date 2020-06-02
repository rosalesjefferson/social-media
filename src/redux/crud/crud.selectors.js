import { createSelector } from 'reselect'

const selectorPosts = (state) => state.posts

const selectorUserAndPosts = (state) => {
	const userPosts = {
		user: state.user,
		posts: state.posts
	}
	return userPosts
}

export const selectPosts = createSelector([selectorPosts], posts => posts.posts)

export const selectUserAndPosts = createSelector([selectorUserAndPosts], userPostsData =>{
	const posts = userPostsData.posts.posts
	const userId = userPostsData.user.currentUser.id
	const friends = userPostsData.user.currentUser.friends
	
	let filteredPosts = new Set([])
	friends
	 .map(friend => friend.nameId)
	 .forEach(friendId =>{
		posts.forEach(post =>{
	 		if(post.currentUserId === friendId){
			 	filteredPosts.add(post)
	 		}
		})
	})
	 posts.forEach(post => {
	 		if(post.currentUserId === userId){
	 			filteredPosts.add(post)
	 		}
	 })

	return Array.from(filteredPosts)
})

