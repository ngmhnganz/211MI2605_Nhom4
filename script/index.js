// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2ErRZh4bASK1ozghLBIsX-pXEtX_RY0E",
    authDomain: "datanhom8.firebaseapp.com",
    databaseURL: "https://datanhom8-default-rtdb.firebaseio.com",
    projectId: "datanhom8",
    storageBucket: "datanhom8.appspot.com",
    messagingSenderId: "327404550023",
    appId: "1:327404550023:web:5322eae15a96ed7d968522",
    measurementId: "G-0Q2Y815D3X"
};

  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app);

//? bind document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//? query element
const bannerBtns = $$('.banner-btn');
console.log(bannerBtns)

//? data
const bannerList= [
    {
        bannerImg: "./assets/img/1.jpg",
        bannerLink :""
    },
    {
        bannerImg: "./assets/img/2.jpg",
        bannerLink :""
    },
    {
        bannerImg: "./assets/img/3.jpg",
        bannerLink :""
    },
]
var currentBannerIndex =0;

//? render data from api
var productRef = ref(database, 'NguyenLieu');
onValue(productRef, (snapshot) => {
    const productList =[]
    let i=0;
     
    //láy dữ liệu về từ firebase
    try {
        snapshot.forEach(function(child){
            productList.push(child.val())
            i++;
            if (i>7) throw 'break';  //forEach không hỗ trợ break nên dùng throw exception để break
    })
    }
    catch{
        //
    }
    
     // đựa dữ liệu vào thẻ html
    let htmls = productList.map(product => {
        return `
        <div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b">
             <a href="./sanpham/san-pham.html?id=${product.productID}" class="product-container">
                 <div class="product-img">
                     <img src="${product.productImg}" alt="">
                 </div>
                 <div class="product-detail">
                     <p>${product.productName}</p>
                     <div class="product-info">
                         <p>${product.productPrice}</p>
                         <i class="fas fa-plus-circle"></i>
                     </div>
                 </div>
             </a>
         </div>`
    })
    $('.product').innerHTML = htmls.join('');
});

var monngonRef = ref(database, 'NguyenLieu');
onValue(monngonRef, (snapshot) => {
    const monngonList =[]
    let i=0;
     
    //láy dữ liệu về từ firebase
    try {
        snapshot.forEach(function(child){
            monngonList.push(child.val())
            i++;
            if (i>3) throw 'break';  //forEach không hỗ trợ break nên dùng throw exception để break
    })
    }
    catch{
        //
    }
    
   //  đựa dữ liệu vào thẻ html
    let htmls = monngonList.map(product => {
        return `
        <div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b">
            <a href="./sanpham/san-pham.html?id=${product.productID}" class="product-container" style="box-shadow: 0px 0px 10px 0px rgb(131 131 131 / 18%);">
                    <div class="product-img">
                        <img src="${product.productImg}" alt="">
                    </div>
                    <div class="product-detail">
                        <p>${product.productName}</p>
                        <div class="product-info"> 
                            <p>$${product.productPrice}</p>
                            <i class="fas fa-plus-circle"></i>
                        </div>
                    </div>
            </a>
           
        </div>
        `
    })
    $('.mon-ngon-cua-ngay-product').innerHTML = htmls.join('');
});

var recipeRef = ref(database, 'CongThuc');
onValue(recipeRef, (snapshot) => {
    const recipeList =[]
    let i=0;
     
    //láy dữ liệu về từ firebase
    try {
        snapshot.forEach(function(child){
            recipeList.push(child.val())
            i++;
            if (i>2) throw 'break';  //forEach không hỗ trợ break nên dùng throw exception để break
    })
    }
    catch{
        //
    }
    
     // đựa dữ liệu vào thẻ html
    let htmls = recipeList.map(recipe => {
        return `
        <div class="col l-4 m-4 c-12 mg-t mg-r mg-l mg-b">
        <div class="recipe-container">
            <div class="recipe-img">
                <img src="${recipe.recipeImage}" alt="">
            </div>
            <div class="recipe-detail">
                    ${recipe.recipeName}
                <div class="recipe-description">
                    ${recipe.recipeDescription}
                </div>
            </div>
        </div>
    </div>
        `
    })
    $('.thuc-don-hom-nay-recipe').innerHTML = htmls.join('');
});




//? xử lý chuyển banner
function loadCurrentBanner() {
    //Todo đang bị bug glitch khi chuyển banner
    jQuery('.banner-img img').fadeOut(300, function(){
        $('.banner-img img').src = bannerList[currentBannerIndex].bannerImg;
    })
    .fadeIn(300)
  
}
loadCurrentBanner();

bannerBtns.forEach(function(btn, index) {
    btn.onclick = function(){
        currentBannerIndex=index
        loadCurrentBanner();
    }
})


// Initialize Firebase

