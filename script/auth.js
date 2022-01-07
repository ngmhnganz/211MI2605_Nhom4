import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, child} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const app = initializeApp(config);
const database = getDatabase(app);
const myRef = ref(database);
const auth = getAuth();

$('#btnDangNhap').click(function(){
  let email = $('#emailLogin').val()
  let password = $('#passwordLogin').val()
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    localStorage.setItem('uid', userCredential.user.uid);
    window.location.href = window.location.origin
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
  });
})

$('#btnDangKy').click(function(){
  let email = $('#emailSignup').val()
  let password = $('#passwordSignup').val()
  let name = $('#nameSignup').val()
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(()=>{
      let mUser = auth.currentUser;
      localStorage.setItem('uid', mUser.uid);
      set(child(myRef,`User/${String(mUser.uid)}`), {
        userID: String(mUser.uid),
        userPoint: 0
      })
      .then(()=>{
        window.location.href = window.location.origin
      })
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
})






