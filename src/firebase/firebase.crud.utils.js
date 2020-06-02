import { firestore}  from './firebase.utils.js'
export const getPosts = async snapShot =>{
	const fetchPosts = await snapShot.docs.map(doc => {
		return{
			id: doc.id,
			...doc.data()
		}
	})
	return fetchPosts
}
