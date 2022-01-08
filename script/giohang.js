// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref,  get} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const app = initializeApp(config);
const database = getDatabase(app);
const myRef = ref(database);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
if (user) {
    getData(user.uid)
}
})

function getData(uid){
    get(myRef)
    .then(snapshot=>{
        var cartList = []
        snapshot.child("User").child(uid).child("userCart").forEach(function(item){
            var a = item.val()
            a.img = snapshot.child('NguyenLieu').child(String(item.val().id)).child("productImg").val()
            cartList.push(a)
        })
        var htmls = cartList.map(product => {
            let total = product.quantity* product.price
            return `
            <table>
            <tr class="id${product.id}">
            <td class="cart-info-row">
                <div class="cart-info">
                    <img class="prod-img" src="${product.img}"/>
                    <div>
                        <p>${product.name}</p>
                        <p id="productPrice">Price: <span id="productPrice_value${product.id}">${product.price}</span>đ</p>
                    </div>
                </div>
            </td>
            <td class="qty">
                <table>
                    <tr class="id${product.id}">
                        <td><img class="icon" src="/assets/img/icon-minus.svg" onclick="minusQty(${product.id})"/></td>
                        <td><input id="productQty${product.id}" style="border: none;" value="${product.quantity}" name="proQty"/></td>
                        <td><img class="icon" src="/assets/img/icon-plus.svg" onclick="addQty(${product.id})"/></td>
                    </tr>
                </table>
            </td>
            <td id="totalCost${product.id}"> ${total} VNĐ</td>
            <td>
                <img class="icon" src="/assets/img/icon-cancel-cart.svg"/>
            </td>
        </tr>
        </table>`
        })

        // tính tổng tiền, khuyến mãi, phí vẫn chuyện , tổng thành toán

        htmls.push(`
        <div class="total-price">
            <table>
                <tr>
                    <td>Tổng tiền hàng</td>
                    <td>50.000 đ</td>
                </tr>
                <tr>
                    <td>Khuyến mãi</td>
                    <td>-5.000 đ</td>
                </tr>
                <tr>
                    <td>Phí vận chuyển</td>
                    <td>10.000 đ</td>
                </tr>
                <tr>
                    <td>Tổng thanh toán</td>
                    <td>55.000 đ</td>
                </tr>
            </table>
        </div>
        <button>Thanh toán</button>`)
        console.log(htmls)
        $('.product').html(htmls.join(''))
    })
}



