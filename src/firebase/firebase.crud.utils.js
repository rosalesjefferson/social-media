import { firestore, auth, storage }  from './firebase.utils.js'


// POST
export const getPosts = async (snapShot, currentUser) =>{
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

	const { comments } = await snapShot.data()

	await commentsCollectionRef.update({
		...snapShot.data(),
		comments: [
				...comments,
				{...payload, created_at: created_at }
			]
})


	 // .onSnapshot((snapshot) => {
  //           snapshot.docChanges().forEach(changeData => {
                
  //               if(changeData.type === 'added'){
  //                   //update UI
  //                   callbackData(changeData.doc.data());
  //               }
  //           });
  //       });

	// const postCollectionRef = firestore.collection('posts')
	// let posts = []
	// const postSnapshot = await postCollectionRef.onSnapshot(snapShot =>{
	// 	snapShot.docChanges().forEach(realtimeData =>{
	// 		// if(realtimeData.type === 'update'){
	// 		// 	 posts.push(realtimeData.doc.data())
	// 		// }
	// 		console.log(realtimeData)
	// 		console.log(snapShot.docChanges())
	// 		console.log(snapShot.docs)
	// 	})
	// })
	// setTimeout(() =>{
	// 	console.log(posts, 'realtime')
	// }, 0)

	// commentsCollectionRef.add({
	// 	created_at,
	// 	commentUID: UID,
	// 	...payload
	// })
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

