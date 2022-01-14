// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(config)
const database = getDatabase(app);

//? bind document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//? query element
const bannerBtns = $$('.banner-btn');

//? data
const bannerList= [
    {
        bannerImg: "../assets/img/Banner1_CongThuc.png",
        bannerLink:""
    },
    {
        bannerImg: "../assets/img/Banner2_CongThuc.png",
        bannerLink :""
    },
    {
        bannerImg: "../assets/img/Banner3_CongThuc.png",
        bannerLink :""
    },
]
var currentBannerIndex =0;

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

//đưa recipe vào
var recipeRef = ref(database, 'CongThuc');
onValue(recipeRef, (snapshot) => {
    const recipeList =[]
    let i=0;
     
    //láy dữ liệu về từ firebase
    try {
        snapshot.forEach(function(child){
            recipeList.push(child.val())
            i++;
              //forEach không hỗ trợ break nên dùng throw exception để break
    })
    }
    catch{
        //
    }
    
     // đựa dữ liệu vào thẻ html
    let htmls = recipeList.map(recipe => {
        return `
        <div class="col l-4 m-4 c-12 mg-t mg-r mg-l mg-b" >
                <a class="recipe-container" href="/congthuc/cong-thuc.html?id=${recipe.recipeID}">
                    <div class="recipe-img">
                        <img src="${recipe.recipeImage}" alt="">
                    </div>
                    <div class="recipe-detail">
                            ${recipe.recipeName}
                        <div class="recipe-description">
                            ${recipe.recipeShortDescription}
                        </div>
                    </div>
                </a>
            </div>
        `
    })
    $('.list-recipe').innerHTML = htmls.join('');
});
