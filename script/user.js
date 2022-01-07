import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get, set} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(config)
const auth = getAuth();
const database = getDatabase(app);
const databaseRef = ref(database);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        $('#user-name').text(user.displayName)
        $('#user-email').text(user.email)
        $('#Name').val(user.displayName)
        $('#email').val(user.email)
        if (user.phoneNumber && user.phoneNumber!=null)
            $('#phone').val(user.phoneNumber)
        get_user_info(user.uid);
    }
  })

function get_user_info(id){
    get(child(databaseRef, `User/${id}`))
    .then((snapshot)=>{
        let mUser = snapshot.val()
        if (mUser.userAddress && mUser.userAddress!= null)
            $('#address').val(mUser.userAddress)
        if (mUser.userGender && mUser.userGender != null)
            if (mUser.userGender==="Nữ")
                $('#nu').attr('checked', true)
            else
                $('#nam').attr('checked', true)
        if (mUser.userBirthday && mUser.userBirthday!=null){
            var date = mUser.userBirthday.split('/')
            console.log(date)
            $('#date').val(date[0])
            $('#month').val(parseInt(date[1]))
            $('#year').val(date[2])
        } 
        if (mUser.userPoint && mUser.userPoint!= null){
            $('#diem').text(mUser.userPoint)
        }
        if (mUser.userLikeRecipe && mUser.userLikeRecipe!=null){
            let recipeList = Object.values(mUser.userLikeRecipe);
            console.log(recipeList)
            let html = recipeList.map(recipe=>{
                return `
                <div class="col l-4 m-4 c-12 mg-t mg-r mg-l mg-b">
                <a  href="../congthuc/cong-thuc.html?id=${recipe.id}">
                    <div class="recipe-container">
                        <div class="recipe-img">
                            <img src="${recipe.thumb}" alt="">
                        </div>
                        <div class="recipe-detail">
                            <div class="recipe-name">
                                <p>${recipe.name}</p>
                                <i class="fas fa-heart fa-lg"></i>
                            </div>
                            <div class="recipe-ration">
                                Thời gian ${recipe.time} phút
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `
            })
            $('#likeRecipe').html(html.join(" "))
        }
    })
}


$('#btnSave').click(function(){})
//xử lý tabs
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
//xử lý khi nhấn vào icon chỉnh sửa
// document.getElementById("edit_name").addEventListener("click", function() {
//     $("#Name").removeAttr("readonly");
//     document.getElementById("Name").focus();
// });

// document.getElementById("edit_birthday").addEventListener("click", function() {
//     $("#birthday").removeAttr("readonly");
//     document.getElementById("birthday").focus();
// });

// document.getElementById("edit_email").addEventListener("click", function() {
//     $("#email").removeAttr("readonly");
//     document.getElementById("email").focus();
// });

// document.getElementById("edit_phone").addEventListener("click", function() {
//     $("#phone").removeAttr("readonly");
//     document.getElementById("phone").focus();
// });

// document.getElementById("edit_address").addEventListener("click", function() {
//     $("#address").removeAttr("readonly");
//     document.getElementById("address").focus();
// });




// xử lý upload hình lên, chưa đc
$(document).ready(function(){
    $("img").click(function(){
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
});


const Name = document.getElementById('Name');
const birthday = document.getElementById('birthday');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');

// xử lý nút lưu
document.getElementById("btnSave").addEventListener("click", function() {
    alert("Bạn đã lưu thành công!")
});

function checkInputs(){
    const birthdayValue = birthday.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

// xử lý khi rời khỏi input name
document.getElementById("Name").addEventListener('blur', function(){
    const NameValue = Name.value.trim();
    if(NameValue === '') {
		setErrorFor(Name, 'Tên người dùng không được để trống');
	} else {
		setSuccessFor(Name);
	}
})

//xử lý kiểm tra số điện thoại
document.getElementById("phone").addEventListener('change', function(){
    var vnf_regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const phoneValue = phone.value.trim().replace('+84','0');
    console.log(phoneValue)

    if(phoneValue !== ''){
        if(vnf_regex.test(phoneValue) == false){
            setErrorFor(phone,"Số điện thoại của bạn không đúng định dạng!");
        }
        else{
            setSuccessFor(phone);
        }
    }
    else{
        setErrorFor(phone,"Số điện thoại không được để trống");
    }
})

