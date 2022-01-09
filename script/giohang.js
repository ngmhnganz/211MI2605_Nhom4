// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref,  get, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
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
       
        let sumTotal = []
        var productHtml = cartList.map(product => {
            let total = product.quantity* product.price
            sumTotal.push(total)
            return `
            <table id="${product.id}">
            <tr>
            <td class="cart-info-row">
                <div class="cart-info">
                    <img class="prod-img" src="${product.img}"/>
                    <div>
                        <p class='productName'>${product.name}</p>
                        <p>Price: <span class="productPrice" id="productPrice_value${product.id}">${ numberWithCommas(product.price) }</span>đ</p>
                    </div>
                </div>
            </td>
            <td class="qty">
                <table>
                    <tr class="id${product.id}">
                        <td><img class="icon" src="/assets/img/icon-minus.svg" onclick="minusQty(${product.id})"/></td>
                        <td><input class="productQty" type="number" id="productQty${product.id}" style="border: none;" value="${product.quantity}" name="proQty" onchange="calculateTotal(${product.id})"/></td>
                        <td><img class="icon" src="/assets/img/icon-plus.svg" onclick="addQty(${product.id})"/></td>
                    </tr>
                </table>
            </td>
            <td class="totalCost_payment" id="totalCost${product.id}">${numberWithCommas(total)} VNĐ</td>
            <td>
                <img id="delete${product.id}" class="icon" src="/assets/img/icon-cancel-cart.svg"/>
            </td>
        </tr>
        </table>`
        })
        $('.product').html(productHtml.join(''))
        
        let sum = sumTotal.reduce((a,b)=>a+b,0)
        let discount = 5000
        let shippingFee = 10000
        var totalHtml =`
        <div class="checkout-tilte">
        Thông tin thanh toán
        </div>
        <table>
        <tr>
            <td>Tổng tiền hàng</td>
            <td id="checkout_sum">${numberWithCommas(sum)} đ</td>
        </tr>
        <tr>
            <td>Khuyến mãi</td>
            <td>-${numberWithCommas(discount)} đ</td>
        </tr>
        <tr>
            <td>Phí vận chuyển</td>
            <td >${numberWithCommas(shippingFee) } đ</td>
        </tr>
        <tr>
            <td>Tổng thanh toán</td>
            <td id="checkout_total_payment">${ numberWithCommas(sum-discount+shippingFee)} đ</td>
        </tr>
        </table>
`
        $('.total-price').html(totalHtml)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$('#btnPayment').click(()=>{
    var currentdate = new Date(); 
    console.log(currentdate.getTime())
    var itemList = $('.product').children()
    var nameList = $('.productName')
    var priceList = $('.productPrice')
    var qtyList = $('.productQty')
    var cartItem ={}
    var cart ={}
    for (let i = 0; i < itemList.length; i++) {
        cartItem = {
            'id': itemList[i].id,
            'name': nameList[i].innerHTML,
            'price':priceList[i].innerHTML.split(',').join(''),
            'quantity':qtyList[i].value
        }
        let itemID = 'id'+ itemList[i].id;
        cart[itemID] = cartItem
    }
    console.log(cart)
    let sum =$('#checkout_sum').text()
    sum = sum.slice(0,sum.length-2)
    sum = sum.split(',').join('')
    
    let dis = 5000
    let fee = 10000
    let total = parseFloat(sum)+fee-dis
    var orderItem = {
        'addOrder': $('#customerAdd').val(),
        'customerName' : $('#customerName').val(),
        'customerPhone': $('#customerPhone').val(),
        'dateLongOrder' : currentdate.getTime(),
        'dateOrder':currentdate.getDate()+'/'+(currentdate.getMonth()+1)+'/'+currentdate.getFullYear(),
        'discountOrder':5000,
        'idOrder': auth.currentUser.uid+currentdate.getTime(),
        'imgOrder':$('.prod-img')[0].getAttribute('src'),
        'itemOrder': cart,
        'paymetnOrder':'Tiền mặt',
        'priceOrder': parseFloat(sum),
        'rewardOrder': total/100,
        'shippingFeeOrder':fee,
        "statusOrder":1,
        'totalOrder':total
    }
    let updateOrder ={}
    updateOrder[`User/${auth.currentUser.uid}/userOrder/${auth.currentUser.uid+currentdate.getTime()}`] = orderItem;
    update(ref(database),updateOrder)
})

$('#btnSaveCart').click(()=>{
    let updateCart = {}
    var itemList = $('.product').children()
    var nameList = $('.productName')
    var priceList = $('.productPrice')
    var qtyList = $('.productQty')
    var cartItem ={}
    for (let i = 0; i < itemList.length; i++) {
        cartItem = {
            'id': itemList[i].id,
            'name': nameList[i].innerHTML,
            'price':priceList[i].innerHTML.split(',').join(''),
            'quantity':qtyList[i].value
        }
        updateCart[`User/${auth.currentUser.uid}/userCart/id${itemList[i].id}`] = cartItem;
        
        console.log(cartItem)
    }
    update(ref(database), updateCart)
    .then(()=>{
        $('#btnSaveCart').addClass('hide')
        toast({
            title: "Cập nhật giỏ hàng thành công",
            message: "Bạn đã cập nhật thành công",
            type: "success",
            duration: 5000
          });
    })
    .catch(()=>{
        toast({
            title: "Đã có lỗi xảy",
            message: "Cập nhật không thành công, bạn hãy tải lại trang nhé",
            type: "error",
            duration: 5000
          });
    })
})
