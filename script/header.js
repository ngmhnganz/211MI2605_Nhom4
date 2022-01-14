import { getAuth, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(config)
const auth = getAuth();
const database = getDatabase(app);



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

}
$('.bx-menu').click(()=>{
  console.log('0l')
  navLinks.style.left = "0";
})
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}

// sidebar submenu open close js code
let sanPhamArrow = document.querySelector(".sanPham-arrow");
sanPhamArrow.onclick = function() {
  navLinks.classList.toggle("show1");
}

let userArrow = document.querySelector(".user-arrow");
userArrow.onclick = function() {
  navLinks.classList.toggle("show3");
}

document.querySelector('#btnUserHome2').onclick = function () {
  window.location.href = window.location.origin +"/user/"
}

document.querySelector('#btnUserOrder2').onclick = function () {
  window.location.href = window.location.origin +"/user/order.html"
}

document.querySelector('.unsigned').onclick = function(){
  window.location.href = window.location.origin +"/user/login.html"
}

document.querySelector('#btnUserHome').onclick = function(){
  window.location.href = window.location.origin +"/user/"
}

document.querySelector('#btnUserOrder').onclick = function(){
  window.location.href = window.location.origin +"/user/order.html"
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
      $('.full--hide').css('display','block')
      var cartRef = ref(database,  `User/${auth.currentUser.uid}/userCart`);
      onValue(cartRef, (snapshot)=>{
          if (snapshot.val()==null){
              $('#cart_badge').css('visibility','collapse')
              $('.total-price').css('visibility','collapse')
          }
          else{
            $('#cart_badge').css('visibility','visible')
            $('.total-price').css('visibility','visible')
          }
      })
  } else {
      $('.unsigned').addClass('showUser')
      $('.signed').removeClass('showUser')
      $('.full--hide').css('display','none')
  }
});

$('#btnSignOut').click(function(){
  signOut(auth).then(() => {
      window.location.href = window.location.origin
    }).catch((error) => {
      alert(error.errorMessage)
    });
})

$('#btnSignOut2').click(()=>{
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
