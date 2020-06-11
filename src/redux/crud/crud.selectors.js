import { createSelector } from 'reselect'

const selectorPosts = (state) => state.posts

export const selectPosts = createSelector([selectorPosts], posts => posts.posts)

export const selectIsButtonDropdownHidden = createSelector([selectorPosts], posts => {
	return posts.isButtonDropdownHidden
})

export const selectPostsWithFriends = createSelector([selectPosts], posts =>{
	if(!posts) return []
		const postLists = posts.posts
		const friendLists = posts.friends
		const UID = posts.UID

		let filteredPosts = new Set([])

		friendLists
		 .map(friend => friend.friendID)	
		 .forEach(friendID =>{
		 	postLists.forEach(post =>{
		 		if(post.postUID === friendID){
		 			filteredPosts.add(post)
		 		}
		 	})
		 })

		 postLists.forEach(post =>{
		 	if(post.postUID === UID){
	 			filteredPosts.add(post)
	 		}
		 })
		return Array.from(filteredPosts)
	
})

export const selectUID = createSelector([selectPosts], posts =>{
	if(!posts) return []
		return posts.UID
})




// return Array.from(filteredPosts).sort((a, b) =>{
// 		 	return new Date(b.created_at) - new Date(a.created_at)	
// 		 })	


		 // commentsLists.forEach(comment =>{
		 // 	const final = filteredPosts.reduce((acc, post) =>{
		 // 		if(post.id === comment.postItemId){
		 // 			return acc += {...post, comments: [comment]}
		 // 		}
		 // 		else{
		 // 			return acc += {...post}
		 // 		}
		 // 	},[])
		 // 	console.log(final)
		 // })
		 // let finalPost = [...filteredPosts]