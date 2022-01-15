import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref,  get, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const app = initializeApp(config);
const database = getDatabase(app);
const myRef = ref(database);
const auth = getAuth();
var historyList= []
var incomingList = []

$(document).ready(function(){
    $('.tab-content-item').hide();
    $('.tab-content-item:first-child').fadeIn();
    $('.nav-tabs li').click(function(){
        //active nav tabs
        $('.nav-tabs li').removeClass('active')
        $(this).addClass('active');
        // show tab-content item
        let id_tab_content = $(this).children('a').attr('href');
        
        $('.tab-content-item').hide();
        $(id_tab_content).fadeIn();
        return false;
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
      getData(user.uid)
  }
  else 
    window.location.href = window.location.origin +'/user/login.html'
})
  

function getData(uid){
    get(myRef)
    .then(snapshot=>{
        
        snapshot.child("User").child(uid).child("userOrder").forEach(function(item){
            var a = item.val()
            if (a.statusOrder > 1)
                incomingList.push(a)
            else
                historyList.push(a)
        })
        loadUI(historyList, $('#lichsu'), 0)
        loadUI(incomingList,$('#dangden'), 1)
    })
    .then(()=>{
        preloaderFadeOutInit()
    })
}

function loadUI(orderList, element, type) {
    let value, btn
    if (type===0){
        value = "Đặt lại"
        btn = "btnDatLai"
    }
    else {
        value = "Hủy đơn"
        btn = "btnHuyDon"
    }
    var orderHTML = orderList.map(order => {
        return `
        <div class="donhang" id="${order.idOrder}">
            <div class="dong-dau">
                <div class="dong-dau-left">
                    <i class="fas fa-truck"></i>
                    <p>${statusStatment(order.statusOrder)}</p>
                </div>
                <div class="dong-dau-right">
                    <p>Ngày đặt hàng: ${order.dateOrder}</p>
                </div>
            </div>

            <div class="dong-hai">
                <div class="dong-hai-left">
                    <img src='${order.imgOrder}'>
                </div>
                <div class="dong-hai-center">
                    <p class="diachi">${order.addOrder}</p>
                    <p>Số lượng: 6 | Phương thức thanh toán: ${order.paymentOrder}</p>
                    <p>Mã đơn hàng: ${order.idOrder}</p>
                </div>
                <div class="dong-hai-right">
                    <p>${numberWithCommas(order.totalOrder)} đ</p>
                    <input type="button" value="${value}" id="${btn+order.idOrder}">
                </div>
            </div>

        </div>
        `
    })
    element.html(orderHTML.join(''))

    orderList.map(order =>{
        $(`#btnDatLai${order.idOrder}`).click(()=>{
            updateCart(order.itemOrder)
        })

        $(`#btnHuyDon${order.idOrder}`).click(()=>{
            cancelOrder(order.idOrder)
        })

        $(`#${order.idOrder}`).click(()=>{
            let htmlItemOrder = Object.values(order.itemOrder).map(item=>{ 
                return `
                <div class="dong-san-pham">
                    <p class="ten-sp">${item.name}</p>
                    <p class="soluong-sp">${item.quantity}</p>
                    <p class="gia-sp">${numberWithCommas(item.price)} đ</p>
                </div>
                `
            })
            $('#customerName').text(order.customerName)
            $('#customerPhone').text(order.customerPhone)
            $('#customerAdd').text(order.addOrder)
            $('#sum').text(numberWithCommas(order.priceOrder)+' đ')
            $('#fee').text(numberWithCommas(order.shippingFeeOrder)+' đ')
            $('#discount').text('-'+numberWithCommas(order.discountOrder)+' đ')
            $('#total').text(numberWithCommas(order.totalOrder)+' đ')
            $('#paymentMethod').text(`Thanh toán bằng ${order.paymentOrder}`)
            $('.modal-sanpham').html(htmlItemOrder)
            if (type===0){
                $('#btnModal').val('Đặt lại')
                $('#btnModal').click(()=>{
                    updateCart(order.itemOrder)
                })
            }
            else{
                $('#btnModal').val('Hủy đơn')
                $('#btnModal').click(()=>{
                    cancelOrder(order.idOrder)
                })
            }
            $('.modal').css('visibility','visible')

        })
    })
}

function statusStatment(status){
    switch (status) {
        case 0:
            return "Đã hủy"
        case 1:
            return "Đã giao hàng thành công"
        case 2:
            return "Đặt hàng thành công"
        case 3:
            return "Đang chuẩn bị"
        case 4:
            return "Đang vận chuyển"
    }
}

$('.close').click(()=>{
    $('.modal').css('visibility','collapse')
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateCart(item){
    var confirmUpdate = dialog({
        title : "Đặt lại đơn hàng", 
        message : "Bạn muốn đặt lại đơn hàng này?", 
        type : "info", 
        choice : "twoButton"
    });
    $('.btn_confirm').click(()=>{
        let updateLocation = {}
        updateLocation[`User/${auth.currentUser.uid}/userCart`] = item
        update(ref(database), updateLocation)
        .then(()=>{
            window.location.href = window.location.origin +'/user/giohang.html'
        })
        })
}

function cancelOrder(orderId){
    var confirmDel = dialog({
        title :  'Hủy đơn hàng', 
        message : 'Bạn muốn hủy đơn hàng này?', 
        type : "error", 
        choice : "twoButton"
    });
    $('.btn_confirm').click(()=>{
        let updateLocation = {}
        updateLocation[`User/${auth.currentUser.uid}/userOrder/${orderId}/statusOrder`]=0;
        update(ref(database), updateLocation)
        .then(()=>{
            window.location.reload();
        })
})
}