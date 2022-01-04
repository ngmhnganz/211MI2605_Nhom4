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
document.getElementById("phone").addEventListener('blur', function(){
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const phoneValue = phone.value.trim();

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

