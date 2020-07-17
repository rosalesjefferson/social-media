import { createSelector } from 'reselect'

const selectorPosts = (state) => state.posts

export const selectIsPostsFetching = createSelector([selectorPosts], posts => posts.isFetching) 
export const selectPosts = createSelector([selectorPosts], posts => posts.posts)

export const selectUID = createSelector([selectorPosts], posts =>{
	if(!posts) return []
		return posts.UID
})

export const selectTimelinePosts = id  => createSelector([selectorPosts], posts =>{
	if(posts === null) return
	const allPosts = posts.posts
	const timelimePosts = allPosts.filter(post => post.postUID === id)
	return timelimePosts
})

export const selectPostsWithFollowing = (isTimeline, timelineUID) => createSelector([selectorPosts], posts =>{
	if(posts.posts.length < 1) return null
	const allPosts = posts.posts
	const following = posts.following
	const UID = posts.UID

	if(!isTimeline){
		let followingUID = following.reduce((accumulator, follow) =>{
			accumulator.push(follow.followingUserId)
			return accumulator
		}, [])

		const homePosts = allPosts.filter(post => followingUID.includes(post.postUID) || UID === post.postUID).sort((a, b) => b.timestamp - a.timestamp)

		return homePosts
	}

	if(isTimeline){
		const timelinePosts = allPosts.filter(post => post.postUID === timelineUID).sort((a, b) => b.timestamp - a.timestamp)
		return timelinePosts
	}

})



















// import { createSelector } from 'reselect'

// const selectorPosts = (state) => state.posts

// export const selectIsPostsFetching = createSelector([selectorPosts], posts => posts.isFetching) 
// export const selectPosts = createSelector([selectorPosts], posts => posts.posts)

// export const selectUID = createSelector([selectPosts], posts =>{
// 	if(!posts) return []
// 		return posts.UID
// })

// export const selectTimelinePosts = id  => createSelector([selectPosts], posts =>{
// 	if(posts === null) return
// 	const allPosts = posts.posts
// 	const timelimePosts = allPosts.filter(post => post.postUID === id)
// 	return timelimePosts
// })

// export const selectPostsWithFollowing = (isTimeline, timelineUID) => createSelector([selectPosts], posts =>{
// 	if(!posts) return 
// 	const postLists = posts.posts
// 	const following = posts.following
// 	const UID = posts.UID

// 	if(!isTimeline){
// 		let followingUID = following.reduce((accumulator, follow) =>{
// 			accumulator[follow.followingUserId] = follow
// 			return accumulator
// 		}, {})

// 		const homePosts = postLists.filter(post => Object.keys(followingUID).includes(post.postUID) || [UID].includes(post.postUID))

// 		return homePosts
// 	}

// 	if(isTimeline){
// 		const timelinePosts = postLists.filter(post => post.postUID === timelineUID)
// 		return timelinePosts
// 	}

// })


// // return Array.from(filteredPosts).sort((a, b) =>{
// // 		 	return new Date(b.created_at) - new Date(a.created_at)	
// // 		 })	
