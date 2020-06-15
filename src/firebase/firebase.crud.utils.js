import { firestore, auth, storage }  from './firebase.utils.js'


// POST
export const getPosts = async (snapShot) =>{
	const UID = await auth.currentUser.uid
	const usersCollectionRef = firestore.doc(`users/${UID}`)

	const friendsCollectionRef = usersCollectionRef.collection('friends')
	const friendsSnapshot = await friendsCollectionRef.get()

	const fetchPosts = await snapShot.docs.map(doc =>{
		return{
			id: doc.id,
			...doc.data()
		}
	})

	const fetchFriends = await friendsSnapshot.docs.map(doc =>{
		return{
			id: doc.id,
			...doc.data()
		}
	})


	const posts = { posts: fetchPosts,  friends: fetchFriends, UID: UID  }
	return{
		posts, 
		friends: fetchFriends
	}
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
	const created_at = new Date().toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
	const { postItemId  } = payload

	const commentsCollectionRef = firestore.doc(`posts/${postItemId}`)

	const snapShot = await commentsCollectionRef.get()

	const { comments } = snapShot.data()

	await commentsCollectionRef.update({
		...snapShot.data(),
		comments: [
				...comments,
				{...payload, created_at: created_at }
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