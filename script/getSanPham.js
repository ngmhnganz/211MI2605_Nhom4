import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get, query, orderByChild, equalTo, limitToFirst, set} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const app = initializeApp(config);
const database = getDatabase(app);
const databaseRef = ref(database);

const params = new URLSearchParams(window.location.search)
const sanphamID =Object.fromEntries(params.entries()).id
var id = parseInt(sanphamID);

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
        $('#sanpham-detail').text(sanpham.productDescription)
        $('#m_sanpham-detail').text(sanpham.productDescription)
        $('#sanpham-img').attr('src', sanpham.productImg)
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
    var uid = localStorage.getItem('uid');
    set(child(databaseRef,`User/${uid}/userCart/id${id}`), {
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
      .error(()=> {
        toast({
            title: "Có lỗi xảy ra",
            message: "Đã có lỗi xảy ra, bạn hãy tải lại trang và thử lại nhé",
            type: "error",
            duration: 5000
          });
      });
})
