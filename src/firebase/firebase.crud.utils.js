import { firestore, auth, storage }  from './firebase.utils.js'


// export const getPosts = async (snapShot) =>{
// 	const UID = await auth.currentUser.uid
// 	const usersCollectionRef = firestore.doc(`users/${UID}`)

// 	const followingCollectionRef = usersCollectionRef.collection('following')
// 	const followingSnapshot = await followingCollectionRef.get()

// 	const fetchPosts = await snapShot.docs.map(doc =>{
// 		return{
// 			id: doc.id,
// 			...doc.data()
// 		}
// 	})

// 	const fetchFollowing = await followingSnapshot.docs.map(doc =>{
// 		return{
// 			id: doc.id,
// 			...doc.data()
// 		}
// 	})


// 	const posts = { posts: fetchPosts,  following: fetchFollowing, UID: UID  }
// 	return{
// 		posts, 
// 		following: fetchFollowing
// 	}
// }



// POST
export const getPosts = async (snapShot) =>{
	const UID = await auth.currentUser.uid
	const usersCollectionRef = firestore.doc(`users/${UID}`)

	const followingCollectionRef = usersCollectionRef.collection('following')
	const followingSnapshot = await followingCollectionRef.get()

	const fetchPosts = await snapShot.docs.map(doc =>{
		return{
			id: doc.id,
			...doc.data()
		}
	})

	const fetchFollowing = await followingSnapshot.docs.map(doc =>{
		return{
			id: doc.id,
			...doc.data()
		}
	})

	return{
		UID,
		posts: fetchPosts,
		following: fetchFollowing
	}
}

export const getPostsOnly = async (snapShot) =>{
	const fetchPosts = await snapShot.docs.map(doc =>{
		return{
			id: doc.id,
			...doc.data()
		}
	})

	return fetchPosts
}

export const getImageUrl = async imageObject =>{
	const storageRef = storage.ref()
	if(imageObject){
		const fileRef = storageRef.child(`postsImages/${imageObject.name}`)
		await fileRef.put(imageObject)
		const imageUrl = await fileRef.getDownloadURL()
		return imageUrl
	}else{
		return null
	}
}

export const getCurrentUserInfo = async (currentUser, userCollectionRef) =>{
	const userRef = firestore.doc(`users/${currentUser.uid}`)
	return userRef
}

// COMMENTS
export const addCommentToPost = async (payload) =>{
	// const created_at = new Date().toLocaleString("en-US", {
 //      weekday: "long",
 //      day: "numeric",
 //      month: "long",
 //      year: "numeric",
 //    });
 	const now = Date.now()
	const { postItemId  } = payload

	const commentsCollectionRef = firestore.doc(`posts/${postItemId}`)

	const snapShot = await commentsCollectionRef.get()

	const { comments } = snapShot.data()

	await commentsCollectionRef.update({
		...snapShot.data(),
		comments: [
				...comments,
				{...payload, timestamp: now }
			]
	})
}

//DELETE POST
export const postToDelete = async postsCollectionRef =>{
	await postsCollectionRef.delete()
}

export const saveEditCaption = async (postsCollectionRef, payload) =>{
	const { caption } = payload

	const snapshot = await postsCollectionRef.get()

	await postsCollectionRef.update({
		...snapshot.data(),
		post: caption
	})
}



// ADD LIKE
// let isLike = false

export const addLikeToPost = async (payload ) =>{

	const { postItemId, currentUID } = payload

	const postsCollectionRef = firestore.doc(`posts/${postItemId}`)

	const snapShot = await postsCollectionRef.get()

	const { likes } = snapShot.data()

	const exist = await likes.find(like => like.currentUID === currentUID)
	const unlike = await likes.filter(like => like.currentUID !== currentUID)
	
	if(exist){
		await postsCollectionRef.update({
			...snapShot.data(),
			likes: [
					...unlike,
				]

		})
	}else{
		await postsCollectionRef.update({
			...snapShot.data(),
			likes: [
					...likes,
					{ currentUID: currentUID }
				]

		})		
	}







}