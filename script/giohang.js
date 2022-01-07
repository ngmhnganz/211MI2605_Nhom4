// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, get, query, orderByChild, equalTo} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
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
            return `
            <table>
            <tr class="id${product.id}">
            <td class="cart-info-row">
                <div class="cart-info">
                    <img class="prod-img" src="${product.img}"/>
                    <div>
                        <p>${product.name}</p>
                        <p id="productPrice">Price: <span id="productPrice_value">${product.price}</span>đ</p>
                    </div>
                </div>
            </td>
            <td class="qty">
                <table>
                    <tr class="id${product.id}">
                        <td><img id="minusQty" class="icon" src="/assets/img/icon-minus.svg" onclick="minusQty()"/></td>
                        <td><input id="productQty" style="border: none;" value="1" name="proQty" onchange="calculateTotal()"/></td>
                        <td><img id="addQty" class="icon" src="/assets/img/icon-plus.svg" onclick="addQty()"/></td>
                    </tr>
                </table>
            </td>
            <td id="totalCost">50.000 đ</td>
            <td>
                <img class="icon" src="/assets/img/icon-cancel-cart.svg"/>
            </td>
        </tr>
        </table>`
        })
        console.log(htmls)
        $('.product').html(htmls.join(''))
    })
}



// onValue(productRef, (snapshot) => {
//     const productList =[]
//     let i=0;
//     //láy dữ liệu về từ firebase
//     try {
//         // bỏ từng child vào mảng
//         snapshot.forEach(function(child){
//             productList.push(child.val())
//             i++;
//             if (i>7) throw 'break';  //forEach không hỗ trợ break nên dùng throw exception để break
//     })
//     }
//     catch{
//         //
//     }
//      //đưa dữ liệu vào thẻ html
//     htmls = productList.map(product => {
//         return `
//         <table>
//         <tr class="${product.productID}">
//         <td class="cart-info-row">
//             <div class="cart-info">
//                 <img class="prod-img" src="${product.productImg}"/>
//                 <div>
//                     <p>${product.productName}</p>
//                     <p id="productPrice">Price: <span id="productPrice_value">${product.productPrice}</span>đ</p>
//                 </div>
//             </div>
//         </td>
//         <td class="qty">
//             <table>
//                 <tr class="${product.productID}">
//                     <td><img id="minusQty" class="icon" src="/assets/img/icon-minus.svg" onclick="minusQty()"/></td>
//                     <td><input id="productQty" style="border: none;" value="1" name="proQty" onchange="calculateTotal()"/></td>
//                     <td><img id="addQty" class="icon" src="/assets/img/icon-plus.svg" onclick="addQty()"/></td>
//                 </tr>
//             </table>
//         </td>
//         <td id="totalCost">50.000 đ</td>
//         <td>
//             <img class="icon" src="/assets/img/icon-cancel-cart.svg"/>
//         </td>
//     </tr>
//     </table>`
//     })
//     $('.product').innerHTML = htmls.join('');
// });


