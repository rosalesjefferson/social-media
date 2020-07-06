export const deletePosts = (prevPosts, postToDelete) =>{
	const filteredPosts = prevPosts.filter(post => post.id !== postToDelete.id)
	return filteredPosts
}