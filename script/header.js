 // search-box open close js code
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
  console.log(menuOpenBtn)
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
  
  // let jsArrow = document.querySelector(".js-arrow");
  // jsArrow.onclick = function() {
  //  navLinks.classList.toggle("show3");
  // }
  