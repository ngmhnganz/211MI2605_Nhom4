import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(config)
const database = getDatabase(app);
const bannerList= [
    {
        bannerImg: "./assets/img/1.jpg",
        bannerLink:""
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
//? xử lý chuyển banner
function loadCurrentBanner() {
    //Todo đang bị bug glitch khi chuyển banner
    $('.banner-img img').fadeOut(300, function(){
        $('.banner-img img').attr('src',bannerList[currentBannerIndex].bannerImg)
    })
    .fadeIn(300)
  
}
loadCurrentBanner();

document.querySelectorAll('.banner-btn').forEach(function(btn, index) {
    btn.onclick = function(){
        currentBannerIndex=index
        loadCurrentBanner();
    }
})


var productRef = ref(database, 'NguyenLieu');
// hàm lấy giá trị
get(productRef)
.then(snapshot=>{
    const productList =[]
    let i=0;
    //láy dữ liệu về từ firebase
    try {
        // bỏ từng child vào mảng
        snapshot.forEach(function(child){
            productList.push(child.val())
            i++;
            if (i>7) throw 'break';  //forEach không hỗ trợ break nên dùng throw exception để break
    })
    }
    catch{
        //
    }
    i=0;
    var htmls = productList.map(product => {
        return `
        <div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b">
             <a href="./sanpham/san-pham.html?id=${product.productID}" class="product-container">
                 <div class="product-img">
                     <img src="${product.productImg}" alt="">
                 </div>
                 <div class="product-detail">
                     <p>${product.productName}</p>
                     <div class="product-info">
                         <p>${numberWithCommas(product.productPrice)+" đ"}</p>
                         <i class="fas fa-plus-circle"></i>
                     </div>
                 </div>
             </a>
         </div>`
    })
    $('.product').html( htmls.join(''))
})
.then(()=>{
    var monngonRef = ref(database, 'NguyenLieu');
    get(monngonRef)
    .then(snapshot=>{
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
    
        
       // dựa dữ liệu vào thẻ html
        let htmls = monngonList.map(product => {
            return `
            <div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b" data-aos="fade-up"  data-aos-offset="100">
                <a href="./sanpham/san-pham.html?id=${product.productID}" class="product-container" style="box-shadow: 0px 0px 10px 0px rgb(131 131 131 / 18%);">
                        <div class="product-img">
                            <img src="${product.productImg}" alt="">
                        </div>
                        <div class="product-detail">
                            <p>${product.productName}</p>
                            <div class="product-info"> 
                                <p>${ numberWithCommas(product.productPrice)+" đ" }</p>
                                <i class="fas fa-plus-circle"></i>
                            </div>
                        </div>
                </a>
               
            </div>
            `
        })
        $('.mon-ngon-cua-ngay-product').html(htmls.join(''));
    })
})
.then(()=>{
    var recipeRef = ref(database, 'CongThuc');
    get(recipeRef)
    .then(snapshot=>{
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
        $('#mon-ngon-thumb').attr('src',recipeList[1].recipeImage)
        $('.mon-ngon-title').text(recipeList[1].recipeName)
        $('.mon-ngon-description').text(recipeList[1].recipeShortDescription)
        
         // đựa dữ liệu vào thẻ html
         i=0;
        let htmls = recipeList.map(recipe => {
            return `
            <div class="col l-4 m-4 c-12 mg-t mg-r mg-l mg-b" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="${i=i+100}" data-aos-offset="200" >
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
        $('.thuc-don-hom-nay-recipe').html(htmls.join(''))
    })
})
.then(()=>{
    AOS.init();
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// Initialize Firebase

