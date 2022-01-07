import { getAuth, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
const app = initializeApp(config);
const auth = getAuth();
var mUser = auth.currentUser;

$('#btnDangNhap').click(function(){
    var email = $('#emailLogin').val()
    var password = $('#passwordLogin').val()
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






