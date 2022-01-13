import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get, query, orderByChild, equalTo, limitToFirst, set} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
const app = initializeApp(config);
const database = getDatabase(app);
const databaseRef = ref(database);
const auth = getAuth();

const params = new URLSearchParams(window.location.search)
const sanphamID =Object.fromEntries(params.entries()).id
var id = parseInt(sanphamID);
onAuthStateChanged(auth, (user) => {
    if (user) {
    }
    
    })
    
api(databaseRef)
function api(ref) {
    get(child(ref, `NguyenLieu/${id}`))
    .then((snapshot)=>{
        var sanpham = snapshot.val();
        return sanpham
    })
    .then(sanpham => {
        $('#sanpham-name').text(sanpham.productName)
        $('#sanpham-price').text(sanpham.productPrice)
        $('#sanpham-type').text(sanpham.productType)
        $('#sanpham-img').attr('src', sanpham.productImg)
        $('#m_sanpham-descrip').text(sanpham.productDescription)

        let htmlDetail =[]

        if (sanpham.productType==="Combo") htmlDetail.push(`<div id="combo-border">Combo bao gồm:</div> `)
        let des = sanpham.productDetail.split('#')
        for (let index = 0; index < des.length; index+=2) {
            htmlDetail.push(`
            <div class="sanpham-detail"> <span class="detail_title">${des[index]}</span> <span class="detail_content">${des[index+1]}</span></div>
            `)
            
        }
        $('#detail-container').html(htmlDetail.join(""))
        $('#m_sanpham-detail').html(htmlDetail.join(''))
        if (sanpham.productType==="Combo"){
            $('.detail_title').addClass('flex1')
            $('.detail_content').addClass('flex1')
        } else{
            $('.detail_title').addClass('flex1')
            $('.detail_content').addClass('flex2')
        }
        return sanpham.productType
    })
    .then(type => {
        get(query(child(ref, 'NguyenLieu'), ...[orderByChild('productType'), equalTo(type), limitToFirst(4)]))
        .then((snapshot)=> {
            var productList = []
            snapshot.forEach(function(child){
                productList.push(child.val())
            })
            return productList
        })
        .then(productList => {
            var htmls = productList.map(product => {
                return `<div class="col l-3 m-6 c-12 mg-t mg-r mg-l mg-b">
                <a href="./san-pham.html?id=${product.productID}" class="product-container">
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
            $('.suggest-products').html(htmls.join(''));        
        })
    })
}

$('#btnOrder').click(function(){
    set(child(databaseRef,`User/${auth.currentUser.uid}/userCart/id${id}`), {
        name: $('#sanpham-name').text(),
        price: parseFloat($('#sanpham-price').text() ),
        quantity : parseFloat($('#sanpham-amount').text()),
        id: id
      })
      .then(()=>{
        toast({
            title: "Đặt hành thành công!",
            message: "Bạn đã thêm thành công sản phẩm "+ $('#sanpham-name').text(),
            type: "success",
            duration: 5000
          });
      })
      .catch(error=> {
        toast({
            title: "Có lỗi xảy ra",
            message: "Đã có lỗi xảy ra, bạn hãy tải lại trang và thử lại nhé",
            type: "error",
            duration: 5000
          });
      });
})
