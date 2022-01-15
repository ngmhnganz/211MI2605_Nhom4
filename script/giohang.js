// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref,  get, update, onValue} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const app = initializeApp(config);
const database = getDatabase(app);
const myRef = ref(database);
const auth = getAuth();
const vnf_regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

onAuthStateChanged(auth, (user) => {
if (user) {
    getData(user.uid)
    var cartRef = ref(database,  `User/${auth.currentUser.uid}/userCart`);
    onValue(cartRef,(snapshot)=>{
        if (snapshot.val()==null){
           
        }
    })
}
else{
    window.location.href = window.location.origin +'/user/login.html'
}

})

function getData(uid){
    get(myRef)
    .then(snapshot=>{
        let discount = 5000
        let shippingFee = 10000
        
        $('#customerAdd').val(snapshot.child('User').child(uid).child('userAdd').val())
        $('#customerName').val(auth.currentUser.displayName)
        $('#customerPhone').val(snapshot.child('User').child(uid).child('userPhone').val())

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

            return`
            <div id="${product.id}" class="product">
                        <div class="info-product">
                            <img class="img-product" src="${product.img}">
                            
                        </div>
                        <div class="cart-container">
                            <div class="ten-gia-product">
                                <p class="productName">${product.name}</p>
                                <p class="productPrice" id="productPrice_value${product.id}">${ numberWithCommas(product.price) } đ</p>
                            </div>
                            <div class="dieu-chinh-gia">
                                <img class="icon" id='minusQty${product.id}' src="/assets/img/icon-minus.svg">
                                <input class="productQty"  value="${product.quantity}" type="number" name="proQty"  id="productQty${product.id}" style="border: none;">
                                <img class="icon"  id="addQty${product.id}" src="/assets/img/icon-plus.svg">
                                <p class="totalCost_payment"  id="totalCost${product.id}">${numberWithCommas(total)} VNĐ</p>
                                <img class="icon" id="delete${product.id}" src="/assets/img/icon-cancel-cart.svg" >
                            </div>
                        </div>
                       

                        <div></div>
                    </div>`

        //     return `
        //     <table id="${product.id}">
        //     <tr>
        //     <td class="cart-info-row">
        //         <div class="cart-info">
        //             <img class="prod-img" src="${product.img}"/>
        //             <div>
        //                 <p class='productName'>${product.name}</p>
        //                 <p>Price: <span class="productPrice" id="productPrice_value${product.id}">${ numberWithCommas(product.price) }</span>đ</p>
        //             </div>
        //         </div>
        //     </td>
        //     <td class="qty">
        //         <table>
        //             <tr class="id${product.id}">
        //                 <td><img class="icon" id='minusQty${product.id}' src="/assets/img/icon-minus.svg" /></td>
        //                 <td><input class="productQty" type="number" id="productQty${product.id}" style="border: none;" value="${product.quantity}" name="proQty" onchange="calculateTotal(${product.id})"/></td>
        //                 <td><img class="icon" id="addQty${product.id}" src="/assets/img/icon-plus.svg"/></td>
        //             </tr>
        //         </table>
        //     </td>
        //     <td class="totalCost_payment" id="totalCost${product.id}">${numberWithCommas(total)} VNĐ</td>
        //     <td>
        //         <img id="delete${product.id}" class="icon" src="/assets/img/icon-cancel-cart.svg"/>
        //     </td>
        // </tr>
        // </table>`
        })
        $('.product-list').html(productHtml.join(''))

        cartList.map(product =>{
            $(`#delete${product.id}`).click(()=>{
                let confirm = dialog({
                    title: "Bạn muốn xóa sản phẩm",
                    message: `Bạn có muốn xóa sản phẩm ${product.name} khỏi giỏ hàng?` ,
                    type: "error",
                    choice: 'twoButton'
                })
                $('.btn_confirm').click(()=>{
                        $(`#${product.id}`).remove()
                        let item={}
                        item[`User/${auth.currentUser.uid}/userCart/id${product.id}`] = null;
                        update(ref(database),item)
                        calculateTotal(product.id,'del')
                })
            })

            $(`#addQty${product.id}`).click(()=>{
                var qty= parseFloat($("#productQty"+product.id).val());
                console.log(qty)
                $("#productQty"+product.id).val(qty+1);
                let item={}
                item[`User/${auth.currentUser.uid}/userCart/id${product.id}/quantity`] = qty+1;
                update(ref(database),item)
                calculateTotal(product.id)
            })

            $(`#minusQty${product.id}`).click(()=>{
                var qty= parseFloat($("#productQty"+product.id).val());
                if(qty<2){
            
                }
                else{
                    $("#productQty"+product.id).val(qty-1);
                    let item={}
                    item[`User/${auth.currentUser.uid}/userCart/id${product.id}/quantity`] = qty-1;
                    update(ref(database),item)
                    calculateTotal(product.id)
                }
            })
            $(`#productQty${product.id}`).change(()=>{
                calculateTotal(product.id)
            })
        })
        
        let sum = sumTotal.reduce((a,b)=>a+b,0)
       
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
    .then(()=>{
        preloaderFadeOutInit()
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateTotal(id, del){
    let discount = 5000
    let shippingFee = 10000
    if (del==null){
        var price = $("#productPrice_value"+id).text().split(',').join('');
        var qty=document.getElementById("productQty"+id).value;
        if (qty==="0"){
            document.getElementById("productQty"+id).value='1'
            qty="1"
        }
    
        var total = parseFloat(price) *  parseFloat(qty);
    
        $("#totalCost"+id).text(numberWithCommas(total)+ " VNĐ");
        
    }
    var sumTotal = $('.totalCost_payment').text().split(',').join('').split(' VNĐ')
    sumTotal[sumTotal.length-1]="0"

    var result = sumTotal.reduce( (a,b)=> parseFloat(a)+parseFloat(b));
    $('#checkout_sum').text(numberWithCommas(result)+" đ")
    $('#checkout_total_payment').text(numberWithCommas(result-discount+shippingFee)+" đ")
}

$('#btnPayment').click(()=>{
    createOrder()
})


$(document).on('keypress',function(e) {
    if (e.which==13)
        createOrder()
})
function createOrder() {
    if (checkValidate()) {
        var currentdate = new Date(); 
        var itemList = $('.product-list').children()
        if (itemList.length===0){
            toast({
                title: "Đã có lỗi xảy",
                message: "Bạn không thể thanh toán khi giỏ hàng trống",
                type: "error",
                duration: 5000
              });
        }
        else
        {
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
                'imgOrder':$('.img-product')[0].getAttribute('src'),
                'itemOrder': cart,
                'paymentOrder':'Tiền mặt',
                'priceOrder': parseFloat(sum),
                'rewardOrder': total/100,
                'shippingFeeOrder':fee,
                "statusOrder":2 ,
                'totalOrder':total
            }
            let updateOrder ={}
            updateOrder[`User/${auth.currentUser.uid}/userOrder/${auth.currentUser.uid+currentdate.getTime()}`] = orderItem;
            updateOrder[`User/${auth.currentUser.uid}/userCart`] = null;
            updateOrder[`DonHang/${auth.currentUser.uid+currentdate.getTime()}`] = orderItem;
            update(ref(database),updateOrder)
            .then(()=>{
                window.location.href = window.location.origin+'/user/order.html'
            })
        }
    }
}

function checkValidate(){
    var valid = true
    if ($('#customerName').val()==null || $('#customerName').val()===''){
        setErrorFor($('#customerName')[0],"Không được trống")
        valid = false 
    }
    if ($('#customerPhone').val()==null || $('#customerPhone').val()===''){
        setErrorFor($('#customerPhone')[0],"Không được trống")
        valid = false 
    }
    else {
        var phoneValue = $('#customerPhone').val().trim().replace('+84','0');
        if(vnf_regex.test(phoneValue) == false) 
        {
            setErrorFor($('#customerPhone')[0],"Số điện thoại không hợp lệ")
            valid = false
        }
    }

    if ($('#customerAdd').val()==null || $('#customerAdd').val()===''){
        setErrorFor($('#customerAdd')[0],"Không được trống")
        valid = false 
    }
    return valid
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}
