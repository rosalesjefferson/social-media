export const uniqueUsers = (previewsUsers, nextUsers) =>{
	const previewsUID = previewsUsers.reduce((accumulator, user) =>{
		accumulator[user.id] = user
		return accumulator
	}, {})

	const uniqueUsers = nextUsers.filter(user => !Object.keys(previewsUID).includes(user.id))
	return uniqueUsers
}

export const uniqueFollowing = (previewsFollowing, nextFollowing) =>{
	const newFollowing = previewsFollowing.filter(prev => prev.followingUserId !== nextFollowing.followingUserId)
	return newFollowing
}

export const removeUnfollow = (previewsFollowing, toUnfollow) =>{
	const newFollowing = previewsFollowing.filter(prev => prev.followingUserId !== toUnfollow.followingUserId )
	console.log(newFollowing, 'test new')
	return newFollowing
}