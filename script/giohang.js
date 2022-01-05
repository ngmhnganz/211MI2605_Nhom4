// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get, query, orderByChild, equalTo} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(config);
const database = getDatabase(app);

const params = new URLSearchParams(window.location.search)
const cartItemID =Object.fromEntries(params.entries()).id
var id = parseInt(cartItemID);

//? bind document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var cartItem;
// trỏ vào đường dẫn dữ lớp dữ liệu muốn lấy
var productRef = ref(database, 'NguyenLieu');
var htmls;
// hàm lấy giá trị
onValue(productRef, (snapshot) => {
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
     //đưa dữ liệu vào thẻ html
    htmls = productList.map(product => {
        return `
        <table>
        <tr class="${product.productID}">
        <td>
        <img class="prod-img" src="${product.productImg}"/>
        </td>
        <td class="cart-info-row">
            <div class="cart-info">

                <div>
                    <p>${product.productName}</p>
                    <p id="productPrice">Giá: <span id="productPrice_value">${product.productPrice}</span> đ</p>
                </div>
            </div>
        </td>
        <td class="qty">
            <table>
                <tr class="${product.productID}">
                    <td><img id="minusQty" class="icon" src="/assets/img/icon-minus.svg" onclick="minusQty();calculateTotal();"/></td>
                    <td><input id="productQty" style="border: none;" value="1" name="proQty" onchange="calculateTotal()"/></td>
                    <td><img id="addQty" class="icon" src="/assets/img/icon-plus.svg" onclick="addQty();calculateTotal();"/></td>
                </tr>
            </table>
        </td>
        <td id="totalCost"><span>${product.productPrice}</span> đ</td>
        <td style="border-top: 1px solid var(--sub-light-color);">
            <img class="icon" src="/assets/img/icon-cancel-cart.svg"/>
        </td>
    </tr>
    </table>`
    })
    $('.product').innerHTML = htmls.join('');
});


