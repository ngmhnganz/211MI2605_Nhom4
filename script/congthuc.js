// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get, query, orderByChild, equalTo} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(config);
const database = getDatabase(app);

const params = new URLSearchParams(window.location.search)
const recipeID =Object.fromEntries(params.entries()).id

//? bind document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var congthuc;
var recipeRef = query(ref(database, 'CongThuc'), orderByChild('recipeID') , equalTo(recipeID) );
console.log(recipeID)
onValue(recipeRef, (snapshot)=> {
    console.log(recipeRef)

    var congthuc = Object.values( snapshot.val() )[0];
    console.log(congthuc)
    
    $('.recipe-dau').innerHTML = `
    
        <div class="banner-img">
            <img src="${congthuc.recipeImage}" alt="">
        </div>
    
        <div class="title">
            <p id="title-name"> Cách làm ${congthuc.recipeName}</p>
            <p id="title-des">${congthuc.recipeShortDescription}</p>
        </div>
    `
    
    $('.content-left').innerHTML = `
        <div class="khung">
            <p class="khung-title"> Đánh giá</p>
            <p class="khung-content">Khẩu phần ${congthuc.recipeRation} người </p>
            <p class="khung-content">Thời gian nấu: ${congthuc.recipeTime} phút </p>
            <p class="khung-content">Mức độ: ${congthuc.recipeLevel} </p>
        </div>
        <div class="khung" style="margin-top: 10px;">
            <p class="khung-title" style="margin-bottom: 10px;">Nguyên liệu cần có:</p>
            <div class="hang-NVL">
                <a href="./san-pham.html?id=}">Bột mì</a>
                <i class="fas fa-shopping-basket"></i>
            </div>

        </div>
    `
    $('.content-right').innerHTML = `
        <div class="khung">
            <p class="khung-title">Cách làm</p>
            <p class="khung-content">${congthuc.recipeDescription}</p>
        </div>
    `
    
})
