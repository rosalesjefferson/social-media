import { createSelector } from 'reselect'

const selectorPosts = (state) => state.posts

export const selectPosts = createSelector([selectorPosts], posts => posts.posts)

export const selectIsButtonDropdownHidden = createSelector([selectorPosts], posts => {
	return posts.isButtonDropdownHidden
})


export const selectUID = createSelector([selectPosts], posts =>{
	if(!posts) return []
		return posts.UID
})

export const selectTimelinePosts = id  => createSelector([selectPosts], posts =>{
	if(!posts) return
	const allPosts = posts.posts
	const timelimePosts = allPosts.filter(post => post.postUID === id)

	return timelimePosts
})

export const selectPostsWithFollowing = (isTimeline, timelineUID) => createSelector([selectPosts], posts =>{
	if(!posts) return []
	const postLists = posts.posts
	const following = posts.following
	const UID = posts.UID

	if(!isTimeline){
		let followingUID = following.reduce((accumulator, follow) =>{
			accumulator[follow.followingUserId] = follow
			return accumulator
		}, {})

		const homePosts = postLists.filter(post => Object.keys(followingUID).includes(post.postUID) || [UID].includes(post.postUID))

		return homePosts
	}

	if(isTimeline){
		const timelinePosts = postLists.filter(post => post.postUID === timelineUID)
		return timelinePosts
	}

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


		 // export const selectPostsWithFollowing = createSelector([selectPosts], posts =>{
// 	if(!posts) return []
// 		const postLists = posts.posts
// 		const following = posts.following
// 		const UID = posts.UID

// 		let followingUID = following.reduce((accumulator, follow) =>{
// 			accumulator[follow.followingUserId] = follow
// 			return accumulator
// 		}, {})

// 		const newPosts = postLists.filter(post => Object.keys(followingUID).includes(post.postUID) || [UID].includes(post.postUID))

// 		return newPosts

		// let filteredPosts = new Set([])

		// following
		//  .map(user => user.followingUserId)	
		//  .forEach(followingUserId =>{
		//  	postLists.forEach(post =>{
		//  		if(post.postUID === followingUserId){
		//  			filteredPosts.add(post)
		//  		}
		//  	})
		//  })

		//  postLists.forEach(post =>{
		//  	if(post.postUID === UID){
	 // 			filteredPosts.add(post)
	 // 		}
		//  })
		// return Array.from(filteredPosts)
	
// })