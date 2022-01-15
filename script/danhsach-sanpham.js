import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, get, child, query, orderByChild, equalTo} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const params = new URLSearchParams(window.location.search)
var queryType =Object.fromEntries(params.entries()).type
var sort = Object.fromEntries(params.entries()).sort
var search = Object.fromEntries(params.entries()).search
var tiltleDes, type, hinhBanner
switch (queryType) {
    case "NguyenLieu" : {
        document.title = 'Danh sách nguyên liệu'
        type = "Nguyên liệu"
        tiltleDes ="Một chiếc bánh ngon chỉ có thể đến từ  những nguyên liệu tươi, sạch và an toàn. "
        hinhBanner = "../assets/img/BannerNVL.png"
        break;
    }
    case "DungCu" : {
        document.title = 'Danh sách dụng cụ'
        type = "Dụng cụ"
        tiltleDes ="Đã làm bánh thì không thể thiếu những dụng cụ chất lượng"
        hinhBanner = "../assets/img/BannerDC.png"
        break;
    }
    case "Combo" : {
        document.title = 'Danh sách combo'
        type = "Combo"
        tiltleDes ="Combo - một phần không thể thiếu cho những người bận rộn nhưng vẫn muốn ăn ngon"
        hinhBanner = "../assets/img/BannerCombo.jpg"
        break;
    }
    case undefined: {
        document.title = 'Danh sách sản phẩm'
        type = "Sản phẩm"
        tiltleDes ="Đầy đủ - Tiện lợi - Chất lượng"
        hinhBanner = "../assets/img/banner-product.jpg"
        break;
    }
}

$('#titleName').html(type)
$('#titleDescription').html(tiltleDes)
$('#hinh_banner').attr('src', hinhBanner)
const app = initializeApp(config)
const database = getDatabase(app);
const databaseRef = ref(database);

api(databaseRef)
function api(ref) {
    var location
    if (type === "Sản phẩm") {
        location = child(ref, 'NguyenLieu')
    } else {
        location = query(child(ref, 'NguyenLieu') , ...[orderByChild('productType'), equalTo(type)]);
    }
    get(location)
    .then((snapshot)=>{
        var productList = []
        snapshot.forEach(function(child){
            if (search!=null){
                if (child.val().productName.toLowerCase().includes(search.toLocaleLowerCase()))
                    productList.push(child.val())
            }
            else
                productList.push(child.val())
        })
        return productList
    })
    .then(productList => {
        switch(sort){
            case "ascending":
                productList.sort((a,b)=>{
                    return a.productPrice - b.productPrice
                })
                loadUI(productList)
                break;
            case "descending":
                productList.sort((a,b)=>{
                    return b.productPrice - a.productPrice
                })
                loadUI(productList)
                break;
            default :
                loadUI(productList)
                break;
        }
    })
}

function loadUI(productList) {
    var htmls = productList.map(product => {
        return `
        <div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b product-container">
            <a href="./san-pham.html?id=${product.productID}">
                <div class="product-img">
                    <img src="${product.productImg}" alt="">
                </div>
                <div class="product-name">
                    <p>${product.productName}</p>
                </div>
                <div class="product-price">
                        <p>${numberWithCommas( product.productPrice)} đ</p>
                </div>
            </a>
        </div>`
    })
    $('.product').html(htmls.join(''))
}

document.getElementById("btnSapXep").onclick =  function open() {
    var x = document.getElementById("container-An");
    if (x.style.display == "none") 
    {
        x.style.display = "block";
    } else 
    {
        x.style.display = "none";
    }
}

document.getElementById("ascending").onclick = function ascending(){
        switch(sort){
            case "ascending":
                break;
            case "descending":
                let queryString = window.location.search
                queryString = queryString.replace('descending', 'ascending')
                window.location.search =queryString
                break;
            default:
                window.location.search += "&sort=ascending";
                break;
        }
}

document.getElementById("descending").onclick = function descending(){
    switch(sort){
        case "descending":
            break;
        case "ascending":
            let queryString = window.location.search
            queryString = queryString.replace('ascending', 'descending')
            window.location.search =queryString
            break;
        default:
            window.location.search += "&sort=descending";
            break;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}