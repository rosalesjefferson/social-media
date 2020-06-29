import { auth, firestore, storage }  from './firebase.utils.js';

const created_at = new Date().toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const createUserProfile = async (userAuth, additionalData) =>{
  if(!userAuth) return

  const userReference = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userReference.get()

  // Create profile if user not exists
  if(!snapShot.exists){
    try{
      await userReference.set({
        created_at,
        email: userAuth.email,
        gender: '',
        hobbies: '',
        address: '',
        birthday: '',
        work: '',
        contactNumber: '',
        currentUserAvatarUrl: 'https://www.cbns.org.au/wp-content/uploads/2017/05/img_placeholder_avatar.jpg',
        currentUserCoverUrl: '',
        featuredPhoto: '',
        education: '',
        nickname: '',
        bio: '',
        ...additionalData
      })
    } catch(error){
      console.log('Error Creating user', error.message)
    }
  }

  return userReference 
}

export const getFollowing = async userReference =>{
  const userFollowingReference = userReference.collection('following')
  const snapShot = await userFollowingReference.get()
  const following = await snapShot.docs.map(doc => {
    return{
      id: doc.id,
      ...doc.data()
    }
  })
  return following
}

export const getFollowers = async userReference =>{
  const userFollowersReference = userReference.collection('followers')
  const snapShot = await userFollowersReference.get()
  const followers = await snapShot.docs.map(doc => {
    return{
      id: doc.id,
      ...doc.data()
    }
  })
  return followers
}

export const getCurrentUser = () =>{
  return new Promise((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}


export const getAllUsers = async () =>{
  // const UID = auth.currentUser.uid

  const usersCollectionRef = firestore.collection('users')
  const usersSnapShot = await usersCollectionRef.get()

  const users = await usersSnapShot.docs.map(doc =>{
    return{
      id: doc.id,
      ...doc.data()
    }
  })

  return users
}

export const userToFollowAndUnfollow = async (payload) =>{
  const UID = await auth.currentUser.uid
  const { firstName, lastName, id, email, currentUserAvatarUrl } = payload

  const usersCollectionRef = firestore.doc(`users/${UID}`)
  const userSnapshot = await usersCollectionRef.get()

  const followersCollectionRef = firestore.doc(`users/${id}`).collection('followers')
  const followersSnapshot = await followersCollectionRef.get()
  const isFollowersExist = await followersSnapshot.docs.find(doc => doc.data().followersUserID === UID)

  if(!isFollowersExist){
    const { email, firstName, lastName, currentUserAvatarUrl } = userSnapshot.data()
    try{
      await followersCollectionRef.add({
        created_at,
        email: email,
        firstName: firstName,
        lastName: lastName,
        currentUserAvatarUrl: currentUserAvatarUrl,
        followersUserID: UID
      })
    console.log('followers not exist')
    }catch(err){
      console.log(err.message, 'followers not exist error')
    }
  }

  if(isFollowersExist){
    try{
      await followersCollectionRef.doc(id).delete()
      console.log('followers exist')
    }catch(err){
      console.log(err.message, 'followers exist error')
    }
  }



  const followingCollectionRef = usersCollectionRef.collection('following')
  const followingSnapShot = await followingCollectionRef.get()
  const isFollowingExist = await followingSnapShot.docs.find(doc => doc.data().followingUserId === id)  

  if(!isFollowingExist){
    try{
      await followingCollectionRef.add({
          created_at,
          followingUserId: id,
          userAvatarUrl: currentUserAvatarUrl,
          email: email,
          firstName, 
          lastName
      })  
    console.log('following not exist')
    }catch(err){
      console.log(err.message, 'following error')
    }
  }
  
  if(isFollowingExist){
    try{
      await followingCollectionRef.doc(id).delete()
      console.log('following already')
    }catch(err){
      console.log(err.message, 'following already error')
    }
  }

  return { created_at, followingUserId: id, email, firstName, lastName, userAvatarUrl: currentUserAvatarUrl }
}

export const getUserImageUrl = async userImageObject =>{
  const storageRef = storage.ref()
  if(userImageObject){
    const fileRef = storageRef.child(`userAvatar/${userImageObject.name}`)
    await fileRef.put(userImageObject)
    const imageUrl = await fileRef.getDownloadURL()
    return imageUrl
  }else{
    return null
  }
}


export const bioFeaturedToUpdate = async (payload) =>{
  const { bioEdit, timelineUID, userImageUrl, existingFeaturedPhoto } = payload

  const usersCollectionRef = firestore.collection('users')
  const individualUserCollectionRef = firestore.collection('users').doc(timelineUID)

  const snapShot = await individualUserCollectionRef.get()

  let userFeaturedUrl

  if(existingFeaturedPhoto === null && userImageUrl === null) userFeaturedUrl = null
  if(existingFeaturedPhoto !== null && userImageUrl === null) userFeaturedUrl = existingFeaturedPhoto
  if(userImageUrl) userFeaturedUrl = userImageUrl

    try{
        await individualUserCollectionRef.update({
          ...snapShot.data(),
          bio: bioEdit,
          featuredPhoto: userFeaturedUrl
        })
      }catch(err){
        console.log(err.message)
      }

  const userSnapshot = await usersCollectionRef.get()

  const users = await userSnapshot.docs.map(doc =>{
    return{
      id: doc.id,
      ...doc.data()
    }
  })
  return users
}

export const updateProfileInfo = async payload =>{
  const { id, uFirstName, uLastName, uNickname, uHobbies, uAddress, uContactNumber, uBirthday, uGender, uEducation, uWork, userProfileUrl, userCoverUrl, currentUserAvatarUrl, currentUserCoverUrl } = payload
  const usersCollectionRef = firestore.collection('users')
  const individualUserCollectionRef = usersCollectionRef.doc(id)

  const userIndividualSnapshot = await individualUserCollectionRef.get()

  let profileUrl
  let coverURL

  if(userProfileUrl === null && currentUserAvatarUrl === null) profileUrl = null
  if(userProfileUrl === null && currentUserAvatarUrl !== null) profileUrl = currentUserAvatarUrl
  if(userProfileUrl !== null) profileUrl = userProfileUrl

  if(userCoverUrl === null && currentUserCoverUrl === null) coverURL = null
  if(userCoverUrl === null && currentUserCoverUrl !== null) coverURL = currentUserCoverUrl
  if(userCoverUrl) coverURL = userCoverUrl

  await individualUserCollectionRef.update({
    ...userIndividualSnapshot.data(),
    firstName: uFirstName,
    lastName: uLastName,
    nickname: uNickname,
    hobbies: uHobbies,
    address: uAddress,
    contactNumber: uContactNumber,
    birthday: uBirthday,
    gender: uGender,
    education: uEducation,
    work: uWork,
    currentUserAvatarUrl: profileUrl,
    currentUserCoverUrl: coverURL
  })

  // userIndividualSnapshot.data().currentUserAvatarUrl
  // console.log(userIndividualSnapshot.data().currentUserAvatarUrl, 'url')

  const postsCollectionRef = firestore.collection('posts')
  const currentUserPosts = postsCollectionRef.where('postUID', '==', id)
  // await currentUserPosts
  const postsSnapshot = await currentUserPosts.get()

  try{
    await postsSnapshot.docs.forEach(doc =>{
      firestore.collection('posts').doc(doc.id).update({
        currentUserAvatarUrl: profileUrl
      })
    })
  }catch(err){
    console.log(err.message, 'POST DP')
  }

  const userSnapshot = await usersCollectionRef.get()

  const updatedUsers = await userSnapshot.docs.map(doc =>{
    return{
      id: doc.id,
      ...doc.data()
    }
  })

  return updatedUsers
}

export const getTimelineFollowing = async payload =>{
  const followingCollectionRef = firestore.doc(`users/${payload.timelineUID}`).collection('following')
  const snapShot = await followingCollectionRef.get()

  const following = await snapShot.docs.map(doc =>{
    return{
      id: doc.id,
      ...doc.data()
    }
  })

  return following
}

export const getTimelineFollowers = async payload =>{
  const followersCollectionRef = firestore.doc(`users/${payload.timelineUID}`).collection('followers')
  const snapShot = await followersCollectionRef.get()

  const followers = await snapShot.docs.map(doc =>{
    return{
      id: doc.id,
      ...doc.data()
    }
  })

  return followers
}




// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b

// Create a root reference
  // const storageRef = storage.ref()

  // Create a reference to 'mountains.jpg'
  // let ganttChartRef = storage.child('69475885_2235617029894804_64475692565266432_n.jpg')

  // Create a reference to 'images/mountains.jpg'
  // let ganttChartImageRef = storageRef.child('userAvatar/dp.png')

  // While the file names are the same, the references point to different files
  // ganttChartRef.name === ganttChartImageRef.name            // true
  // ganttChartRef.fullPath === ganttChartImageRef.fullPath    // false

// https://stackoverflow.com/questions/53139432/importing-only-auth-package-from-firebase-module

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";
// import "firebase/messaging";
// import "firebase/database";

// const config = {
//   apiKey: "",
//   authDomain: "",
//   databaseURL: "",
//   messagingSenderId: "",
//   projectId: "",
//   storageBucket: ""
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true });
// firestore.enablePersistence({ experimentalTabSynchronization: true });


// export { firebase };


//// And use the following to import

// import { firebase } from "path/to/file"