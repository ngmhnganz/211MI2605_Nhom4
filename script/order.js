import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref,  get, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const app = initializeApp(config);
const database = getDatabase(app);
const myRef = ref(database);
const auth = getAuth();

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
})
  

function getData(uid){
    get(myRef)
    .then(snapshot=>{
        var historyList= []
        var incomingList = []
        snapshot.child("User").child(uid).child("userOrder").forEach(function(item){
            var a = item.val()
            if (a.statusOrder > 1)
                incomingList.push(a)
            else
                historyList.push(a)
        })
        loadUI(historyList, $('#lichsu'))
        loadUI(incomingList,$('#dangden'))
    })
}

function loadUI(orderList, element) {
    var orderHTML = orderList.map(order => {
        return `
        <div class="donhang">
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
                    <p>${order.totalOrder} đ</p>
                    <input type="button" value="Đặt lại" id="btnDatLai">
                </div>
            </div>

        </div>
        `
    })
    element.html(orderHTML.join(''))
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
// Xử lý nút close trên modal
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
