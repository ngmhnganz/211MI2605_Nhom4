// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const app = initializeApp(config);
const database = getDatabase(app);
const databaseRef = ref(database);
const params = new URLSearchParams(window.location.search)
const recipeID =Object.fromEntries(params.entries()).id

get(child(databaseRef,`CongThuc/${recipeID}`))
.then((snapshot) => {
    return snapshot.val()
})
.then(recipe => {
    loadUI(recipe)
    loadDescription(recipe.recipeDescription)
    loadIngredientList(Object.values(recipe.recipeIngredient))
})

function loadIngredientList(ingredientList){
    let html = ingredientList.map(ingredient => {
        return `
         <a href="./san-pham.html?id=}">${ingredient.name}</a>`
     })
     $('.hang-NVL').html(html)
}

function loadDescription(description){
    var steps = description.split('#')
    console.log(steps)
    var html = ` <div class="khung">
    <p class="khung-title">Cách làm</p>`
    for (let i =0; i< steps.length;i+=2){
        html += ` <p class="khung-content"><b>${steps[i]}</b>: ${steps[i+1]}</p>`
    }
    html+= "</div>"
    $('.content-right').html(html) 
}

function loadUI(congthuc) {
    $('.recipe-dau').html( `    
        <div class="banner-img">
            <img src="${congthuc.recipeImage}" alt="">
        </div>

        <div class="title">
            <p id="title-name"> Cách làm ${congthuc.recipeName}</p>
            <p id="thoigian"></p>
        </div>
    `)
        
    $('.content-left').html(`
        <div class="khung">
            <p class="khung-title"> Đánh giá</p>
            <p class="khung-content">Khẩu phần ${congthuc.recipeRation} người </p>
            <p class="khung-content">Thời gian nấu: ${congthuc.recipeTime} phút </p>
            <p class="khung-content">Mức độ: ${congthuc.recipeLevel} </p>
        </div>
        <div class="khung" style="margin-top: 10px;">
            <p class="khung-title" style="margin-bottom: 10px;">Nguyên liệu cần có:</p>
            <div class="hang-NVL">
                
            </div>
        </div>
    `)
}

function getDay(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var thu = today.getDay(); 
    if(dd <10) {
        dd = '0' +dd
    }

    if(thu == '0'){
        thu = "Chủ nhật"
    }
    if(thu == '1'){
        thu = "Thứ hai"
    }
    if(thu == '2'){
        thu = "Thứ ba"
    }
    if(thu == '3'){
        thu = "Thứ tư"
    }
    if(thu == '4'){
        thu = "Thứ năm"
    }
    if(thu == '5'){
        thu = "Thứ sáu"
    }
    if(thu == '6'){
        thu = "Thứ bảy"
    }
    
    document.getElementById("thoigian").innerHTML= thu +"," + dd+"/"+mm+"/"+yyyy;
}