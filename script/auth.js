import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
const app = initializeApp(config);
const auth = getAuth();
var mUser = auth.currentUser;
console.log(mUser)

$('#btnDangNhap').click(function(){
    var email = $('#emailLogin').val()
    var password = $('#passwordLogin').val()
    console.log(email)
    console.log(password)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    window.location.href = window.location.origin
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
  });
})


$('#btnSignOut').click(function(){
    signOut(auth).then(() => {
        alert('Đã đăng xuất')
      }).catch((error) => {
        alert(error.errorMessage)
      });

})
onAuthStateChanged(auth, (user) => {
    if (user) {
        $('.signed').addClass('showUser')
        $('.unsigned').removeClass('showUser')
        const uid = user.uid;
        console.log(uid)
      // ...
    } else {
        $('.unsigned').addClass('showUser')
        $('.signed').removeClass('showUser')
        console.log("out")
    }
  });


