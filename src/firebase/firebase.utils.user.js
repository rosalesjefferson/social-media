import { auth, firestore }  from './firebase.utils.js';

export const createUserProfile = async (userAuth, additionalData) =>{
  if(!userAuth) return

  const userReference = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userReference.get()

  // Create profile if user not exists
  if(!snapShot.exists){
    const created_at = new Date().toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    try{
      await userReference.set({
        created_at,
        email: userAuth.email,
        ...additionalData
      })
    } catch(error){
      console.log('Error Creating user', error.message)
    }
  }

  return userReference 
}

export const getUserFriends = async userReference =>{
  const userFriendsReference = userReference.collection('friends')
  const snapShot = await userFriendsReference.get()
  const friendLists = await snapShot.docs.map(doc => {
    return{
      id: doc.id,
      ...doc.data()
    }
  })
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





  // await userProfileDocReference.collection('friends').doc('BNJru1HWFVjgTjN0TAQ8').update({
  //   id: 'UGH',
  //   test: 'FUCKKKKKKKKKKKKKKKK'
  // })
  // const ref = userProfileDocReference.collection('friends')
  // get object
  // .get() will get an object in our collection that has different properties. One of the property is called docs.
  // docs has an array of objects. Each of the object has data of our database. In order to get the data, we will use data(). but we need to iterate first in our docs in order for us to use the data().
  // collection.get()
  // const userSnap = await ref.get()
  // const postSnap = await = refPost.get()
  // userSnap.docs.map(doc => {console.log(doc, 'friends')})





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