import { createSelector } from 'reselect'

const selectorUser = (state) => state.user  

export const selectCurrentUser = createSelector([selectorUser], user => user.currentUser)
export const selectUserError = createSelector([selectorUser], user => user.error)
export const selectIsFetching = createSelector([selectorUser], user => user.isFetching)
export const selectIsAuthenticationSuccess = createSelector([selectorUser], user => user.isAuthenticationSuccess)
export const selectUserLists = createSelector([selectorUser], user => user.userLists)
export const selectIsFollowersFetching = createSelector([selectorUser], user => user.isFollowersFetching)
export const selectIsFollowingFetching = createSelector([selectorUser], user => user.isFollowingFetching)
export const selectTimelineFollowers = createSelector([selectorUser], user => user.timelineFollowers)
export const selectTimelineFollowing = createSelector([selectorUser], user => user.timelineFollowing)

export const selectUsers = createSelector([selectorUser], user => {
	if(user.userLists.length < 1) return null

	const UID = user.currentUser.UID
	const users = user.userLists
	const following = user.currentUser.following

	const noCurrentUser = users.filter(user => user.id !== UID)

	const followingUID = following.reduce((accumulator, follow) =>{
			accumulator.push(follow.followingUserId) 
			return accumulator
	}, [])

	const newUsers = noCurrentUser.filter(user => !followingUID.includes(user.id))

	return newUsers
})

export const selectTimelineUsers = userID => createSelector([selectUserLists], userLists =>{
	if(userLists.length < 1) return []
	const timelineUser = userLists.filter(user => user.id === userID)
	return timelineUser[0]
})























// import { createSelector } from 'reselect'

// const selectorUser = (state) => state.user  

// export const selectCurrentUser = createSelector([selectorUser], user => user.currentUser)
// export const selectIsFetching = createSelector([selectorUser], user => user.isFetching)
// export const selectUserLists = createSelector([selectorUser], user => user.userLists)
// export const selectIsFollowersFetching = createSelector([selectorUser], user => user.isFollowersFetching)
// export const selectIsFollowingFetching = createSelector([selectorUser], user => user.isFollowingFetching)
// export const selectTimelineFollowers = createSelector([selectorUser], user => user.timelineFollowers)
// export const selectTimelineFollowing = createSelector([selectorUser], user => user.timelineFollowing)

// export const selectUsers = createSelector([selectorUser], user => {
// 	if(user.userLists.length < 1) return null

// 	const UID = user.currentUser.UID
// 	const users = user.userLists
// 	const following = user.currentUser.following

// 	const noCurrentUser = users.filter(user => user.id !== UID)

// 	const followingUID = following.reduce((accumulator, follow) =>{
// 			accumulator[follow.followingUserId] = follow
// 			return accumulator
// 	}, {})

// 	const newUsers = noCurrentUser.filter(user => !Object.keys(followingUID).includes(user.id))

// 	return newUsers
// })

// export const selectTimelineUsers = userID => createSelector([selectUserLists], userLists =>{
// 	if(userLists.length < 1) return []
// 	const timelineUser = userLists.filter(user => user.id === userID)
// 	return timelineUser[0]
// })

