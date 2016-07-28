// firebase.auth().createUserWithEmailAndPassword("mukesh@gmail.com","qawzsx!3").catch(function(error){
// console.log(error);
// })
// firebase.auth().currentUser
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }
// });

// var user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }, function(error) {
//   // An error happened.
// });


// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }, function(error) {
//   // An error happened.
// });


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }


// (new Date()).getTime();