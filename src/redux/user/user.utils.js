export const uniqueUsers = (previewsUsers, nextUsers) =>{
	const previewsUID = previewsUsers.reduce((accumulator, user) =>{
		accumulator[user.id] = user
		return accumulator
	}, {})

	const uniqueUsers = nextUsers.filter(user => !Object.keys(previewsUID).includes(user.id))
	return uniqueUsers
}