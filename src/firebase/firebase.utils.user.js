import { auth, firestore}  from './firebase.utils.js'

export const createUserProfile = async (userAuth, additionalData) =>{
  if(!userAuth) return

  const userDocReference = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userDocReference.get()

  // await userProfileDocReference.collection('friends').doc('BNJru1HWFVjgTjN0TAQ8').update({
  //   id: 'UGH',
  //   test: 'FUCKKKKKKKKKKKKKKKK'
  // })

  // const now = new Date
  //  await userProfileDocReference.collection('friends').add({
  //   id: userAuth.uid,
  //   test: 'test add friends',
  //   created_at: now
  //  })


  // const ref = userProfileDocReference.collection('friends')
  // get object
  // .get() will get an object in our collection that has different properties. One of the property is called docs.
  // docs has an array of objects. Each of the object has data of our database. In order to get the data, we will use data(). but we need to iterate first in our docs in order for us to use the data().
  // collection.get()
  // const userSnap = await ref.get()
  // const postSnap = await = refPost.get()
  // userSnap.docs.map(doc => {console.log(doc, 'friends')})

  // Create profile if user not exists
  if(!snapShot.exists){
    const created_at = new Date().toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    try{
      await userDocReference.set({
        created_at,
        userId: userAuth.uid,
        ...additionalData
      })
    } catch(error){
      console.log('Error Creating user', error.message)
    }
  }

  return userDocReference 
}

export const getFriendLists = async (userDocReference) =>{
  const userFriendsDocReference = userDocReference.collection('friends')
  const snapShot = await userFriendsDocReference.get()
  const friendLists = await snapShot.docs.map(doc => doc.data())
  return friendLists
}

export const getCurrentUser = () =>{
  return new Promise((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}


// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b