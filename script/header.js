import { getAuth, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";

const app = initializeApp(config)
const auth = getAuth();

let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
let searchBoxCancel = document.querySelector(".search-box .bx-x");
// let userBox = document.querySelector(".userbox .menu");

searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});
// userBox.addEventListener("click"), ()=>{
//   userBox.classList.toggle('active')
// }

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
  console.log("ok")
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}

// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
  navLinks.classList.toggle("show1");
}

document.querySelector('.unsigned').onclick = function(){
  window.location.href = window.location.origin +"/user/login.html"
}

document.querySelector('#btnUserHome').onclick = function(){
  window.location.href = window.location.origin +"/user/"
}
document.querySelector('#btnUserIcon').onclick = function(){
  window.location.href = window.location.origin +"/user/"
}
document.querySelector("#btnUserCart").onclick = function(){
  window.location.href = window.location.origin +'/user/giohang.html'
}
onAuthStateChanged(auth, (user) => {
  if (user) {
      $('.signed').addClass('showUser')
      $('.unsigned').removeClass('showUser')
  } else {
      $('.unsigned').addClass('showUser')
      $('.signed').removeClass('showUser')
      console.log("out")
  }
});

$('#btnSignOut').click(function(){
  signOut(auth).then(() => {
      window.location.href = window.location.origin
    }).catch((error) => {
      alert(error.errorMessage)
    });
})

$('#inputSearch').on("keyup", function(e) {
  if (e.keyCode == 13) {
      window.location.href = window.location.origin+"/sanpham/?search="+$('#inputSearch').val()
  }
});
