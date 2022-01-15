import { getAuth, onAuthStateChanged, updateProfile} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get, set, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(config)
const auth = getAuth();
const database = getDatabase(app);
const databaseRef = ref(database);

const Name = document.getElementById('Name');
const birthday = document.getElementById('birthday');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        $('#user-name').text(user.displayName)
        $('#user-email').text(user.email)
        $('#Name').val(user.displayName)
        $('#email').val(user.email)
        get_user_info(user.uid);
    }
    else{
        window.location.href = window.location.origin +'/user/login.html'
    }
  })

function get_user_info(id){
    get(child(databaseRef, `User/${id}`))
    .then((snapshot)=>{
        let mUser = snapshot.val()
        console.log(mUser)
        if (mUser.userAddress && mUser.userAddress!= null)
            $('#address').val(mUser.userAddress)
        if (mUser.userGender && mUser.userGender != null)
            if (mUser.userGender==="Nữ")
                $('#nu').attr('checked', true)
            else
                $('#nam').attr('checked', true)
        if (mUser.userBirthday && mUser.userBirthday!=null){
            var date = mUser.userBirthday.split('/')
            $('#date').val(date[0])
            $('#month').val(parseInt(date[1]))
            $('#year').val(date[2])
        } 

        if (mUser.userPhone && mUser.userPhone!= null){
            $('#phone').val(mUser.userPhone)
        }

        if (mUser.userPoint && mUser.userPoint != null && mUser.userPoint != 0){
            $('#diem').text(mUser.userPoint)
        }
        else $('#diem').text('Chưa có điểm')

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




// xử lý nút lưu
document.getElementById("btnSave").addEventListener("click", function() {
    let updates = {};
    if ($('#nu').is(":checked"))
        updates[`User/${auth.currentUser.uid}/userGender`] ="Nữ"
    else
        updates[`User/${auth.currentUser.uid}/userGender`] ="Nam"
    
    updates[`User/${auth.currentUser.uid}/userAddress`] = address.value.trim();
    updates[`User/${auth.currentUser.uid}/userPhone`] = phone.value.trim();

    let birthday = $('#date').val() +"/"+ $('#month').val() + "/" + $('#year').val()

    updates[`User/${auth.currentUser.uid}/userBirthday`] = birthday;
    update(ref(database), updates)
    .then(()=>{
        toast({
            title: "Cập nhật thành công",
            message: "Bạn đã cập nhật thông tin thành công",
            type: "success",
            duration: 5000
          });
    })

    if (checkValidatePhone() && Name.value.trim()!==""){
        updateProfile(auth.currentUser, {
            displayName: Name.value.trim(),
            photoURL : $('#avatar').attr('src')
        })
        .then(()=>{
            console.log(auth.currentUser)
        })
    }
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
document.getElementById("phone").addEventListener('blur', function(){
    var valid = checkValidatePhone()
})

function checkValidatePhone(){
    var vnf_regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const phoneValue = phone.value.trim().replace('+84','0');
    if(phoneValue !== ''){
        if(vnf_regex.test(phoneValue) == false){
            
            setErrorFor(phone,"Số điện thoại của bạn không đúng định dạng!");
            return false
        }
        else{
            setSuccessFor(phone);      
        }
    }
    else{
        setErrorFor(phone,"Số điện thoại không được để trống");
        return false  
    }
    return true
}

document.querySelector('#uploadFile').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var img = document.querySelector('#avatar');
        img.onload = () => {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }

        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
});