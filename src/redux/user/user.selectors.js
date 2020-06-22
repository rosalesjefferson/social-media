import { createSelector } from 'reselect'

const selectorUser = (state) => state.user  

export const selectCurrentUser = createSelector([selectorUser], user => user.currentUser)
export const selectUserLists = createSelector([selectorUser], user => user.userLists)

export const selectUsers = createSelector([selectorUser], user => {
	if(user.length < 0) return

	const UID = user.currentUser.UID
	const users = user.userLists
	const following = user.following

	const noCurrentUser = users.filter(user => user.id !== UID)

	const followingUID = following.reduce((accumulator, follow) =>{
			accumulator[follow.followingUserId] = follow
			return accumulator
	}, {})

	// const newUsers = noCurrentUser.filter(user =>{
	// 	return !Object.keys(followingUID).includes(user.id)
	// })
	
	const newUsers = noCurrentUser.filter(user => !Object.keys(followingUID).includes(user.id))

	return newUsers
})

export const selectTimelineUsers = userID => createSelector([selectUserLists], userLists =>{
	const timelineUser = userLists.filter(user => user.id === userID)
	return timelineUser
})