import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
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
  logIn()
})

$('#btnDangKy').click(function(){
  signUp()
})

$('#btnGui').click(()=>{
  resetPassword()
})

function resetPassword() {
  if (checkReset()){
    let email = $('#emailReset').val()
    sendPasswordResetEmail(auth, email)
    .then(() => {
      let annouce = dialog({
        title: "Thành công!",
        message: "Đường link đặt lại mật khẩu đã được gửi tới email của bạn, vui lòng kiểm tra hộp thư nhé",
        type: "success"
      })
    })
    .catch((error) => {
      var resetMessage
      switch (error.code) {
        case 'auth/missing-email':
          resetMessage = 'Email chưa được đăng ký'
          break;
      
        default:
          resetMessage = error.code
          break;
      }
      let annouce = dialog({
        title: "Có lỗi!",
        message: resetMessage,
        type: "error"
      })
      // ..
    });
  }

}

function logIn() {
  let email = $('#emailLogin').val()
  let password = $('#passwordLogin').val()
  if (checkValidateLogin()){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = window.location.origin
    })
    .catch((error) => {
      let message;
      console.log(error.code)
      switch (error.code) {
        case 'auth/wrong-password':
          message = 'Tài khoản hoặc mật khẩu không đúng'
          break;
        case 'auth/user-not-found':
          message = "Email chưa được đăng ký"
          break;
        default:
          message = 'Có lỗi xảy ra vui lòng thử lại'
          break;
      }
      let bool = dialog({
        title: "Đã có lỗi xảy ra",
        message: message,
        type: "error"
      });
    });
  }
}

function signUp() {
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
      let message
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = "Email đã được đăng ký"
          break;
        default:
          message = "Đăng ký không thành công. Xin hãy thử lại"
          break;
      }
      let bool = dialog({
        title: "Đã có lỗi xảy ra",
        message: message,
        type: "error"
      });
    });
  }
  
}

function checkReset() {
  let valid = true
  if ($('#emailReset').val().trim()==''||$('#emailReset')==null){
    valid = false;
    setErrorFor($('#emailReset'),"Không được để trống")
  }
  else {
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mail = $('#emailReset').val().trim();
    if (mailRegex.test(mail)==false){
      valid = false
      setErrorFor($('#emailReset'),'Email không hợp lệ')
    }
    else {
      setSuccessFor($('#emailReset'))
    }
  }
  return valid
}

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
    let bool = dialog({
      title: "Lưu ý !",
      message: "Để hoàn tất đăng ký bạn cần đồng ý với các điều khoản và chính sách",
      type: "info"
    });
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

$(document).on('keypress',function(e) {
  if (e.which==13){
    if ($('#register').hasClass('is-selected')){
      signUp()
    }
    if ($('#login').hasClass('is-selected')){
      logIn()
    }
    if($('#reset').hasClass('is-seleted')){
      resetPassword()
    }
  }
});



