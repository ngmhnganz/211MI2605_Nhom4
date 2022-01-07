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
                        <td><input id="productQty${product.id}" style="border: none;" value="${product.quantity}" name="proQty" onchange="calculateTotal(${product.id})"/></td>
                        <td><img class="icon" src="/assets/img/icon-plus.svg" onclick="addQty(${product.id})"/></td>
                    </tr>
                </table>
            </td>
            <td id="totalCost"${product.id}></td>
            <td>
                <img class="icon" src="/assets/img/icon-cancel-cart.svg"/>
            </td>
        </tr>
        </table>`
        })
        console.log(cartList)
        $('.product').html(htmls.join(''))
    })
}


