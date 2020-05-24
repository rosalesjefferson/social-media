import { auth, firestore}  from './firebase.utils.js'

export const createUserProfileDocument = async (userAuth, additionalData) =>{
  if(!userAuth) return

  // reference of fetch data
  // long version
  // const userReference = firestore.collection('users').doc(userAuth.uid)

  //reference
  // const userReference = firestore.collection('users')
  // get collection ref using .data userReference.get(). This returns a object of .empty, size and docs(which is our all of the unique with object each id)
  // we can check if a documents inside a collectionRef is empty by using .empty..

  // short version
  // docReference is use to get, set, update or delete data. We use this as a reference

  const userDocReference = firestore.doc(`users/${userAuth.uid}`)
  
  // wait for the userDocReference to get the userAuth.uid
  // snapshoptObject was get from userDocReference and use get() method request
  const snapShot = await userDocReference.get()
  // userReference.get().data() is use to get the data object

  // we can also add collections using collectionRef and add() method request

  // snapshot is a collection of data
  // check if the user is exist in users collection database
  if(!snapShot.exists){
    // get the displayName and email of currentUser and also the date that the data is created
    const { displayName, email } = userAuth 
    const created_at = new Date();

    // if the user is not exist, the code below will run and create a new user information to users collection database
    try{
      await userDocReference.set({
        displayName,
        email,
        created_at,
        ...additionalData
      })
    } catch(error){
      console.log('Error Creating user', error.message)
    }
  }
  // return user reference so we can use user Reference in some parts of our code, component or use to do other things
  return userDocReference
} 