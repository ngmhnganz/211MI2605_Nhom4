import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, child} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const app = initializeApp(config);
const database = getDatabase(app);
const myRef = ref(database);
const auth = getAuth();

onAuthStateChanged(auth, (user)=>{
  if (user){
    window.location.href = window.location.origin
  }
})

$('#btnDangNhap').click(function(){
  let email = $('#emailLogin').val()
  let password = $('#passwordLogin').val()
  if (checkValidateLogin()){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = window.location.origin
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
    });
  }
})

$('#btnDangKy').click(function(){
  let email = $('#emailSignup').val()
  let password = $('#passwordSignup').val()
  let name = $('#nameSignup').val()
  if (checkValidateSignUp()){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: name
      })
      .then(()=>{
        let mUser = auth.currentUser;
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
      console.log(error.code)
      // ..
    });
  }
  
})

function checkValidateSignUp(){
  var valid = true
  if ($('#nameSignup').val().trim()==""||$('#nameSignup')==null){
    valid = false;
    setErrorFor($('#nameSignup'),"Không được để trống")
  }
  else{
    setSuccessFor($('#nameSignup'))
  }

  if ($('#emailSignup').val().trim()==''||$('#emailSignup')==null){
    valid = false;
    setErrorFor($('#emailSignup'),"Không được để trống")
  }
  else {
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mail = $('#emailSignup').val().trim();
    if (mailRegex.test(mail)==false){
      valid = false
      setErrorFor($('#emailSignup'),'Email không hợp lệ')
    }
    else {
      setSuccessFor($('#emailSignup'))
    }
  }

  if ($('#passwordSignup').val().trim()==''||$('#passwordSignup').val()==null){
    valid = false;
    setErrorFor($('#passwordSignup'),"Không được để trống")
  }
  else {
    if ($('#passwordSignup').val().trim().length<8){
      valid = false;
      setErrorFor($('#passwordSignup'), 'Password phải có ít nhất 8 kí tự')
    }
    else
      setSuccessFor($('#passwordSignup'))
  }

  if ($('#re-passwordSignup').val().trim()==''||$('#re-passwordSignup').val()==null){
    valid = false;
    setErrorFor($('#re-passwordSignup'),'Không được để trống')
  }
  else{
    var pass = $('#passwordSignup').val()
    var re_pass = $('#re-passwordSignup').val()
    if (pass != re_pass){
      setErrorFor($('#re-passwordSignup'),'Mật khẩu không trùng khớp')
      valid = false; 
    }
    else {
      setSuccessFor($('#re-passwordSignup'))
    }
  }
  
  if(!$('#accept-terms').is(':checked')){
    valid= false;
  }
  return valid
  
}

function checkValidateLogin() {
  var valid = true;
  if ($('#emailLogin').val().trim()==""||$('#emailLogin')==null){
    valid = false;
    setErrorFor($('#emailLogin'),"Không được để trống")
  }
  else{
    setSuccessFor($('#emailLogin'))
  }

  if ($('#passwordLogin').val().trim()==""||$('#passwordLogin')==null){
    valid = false;
    setErrorFor($('#passwordLogin'),"Không được để trống")
  }
  else{
    setSuccessFor($('#passwordLogin'))
  }
  return valid
}
function setErrorFor(input, message) {
  input.parent().removeClass('success')
  input.parent().addClass('error')
	input.parent().children('small').html(message)
}

function setSuccessFor(input) {
  input.parent().removeClass('error')
  input.parent().addClass('success')
}





