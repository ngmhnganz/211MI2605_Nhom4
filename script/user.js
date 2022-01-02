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

// xử lý nút lưu
const Name = document.getElementById('Name');
const birthday = document.getElementById('birthday');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');

document.getElementById("btnSave").addEventListener("click", function() {
    checkInputs();
});

function checkInputs(){
    const NameValue = Name.value.trim();
    const birthdayValue = birthday.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const addressValue = address.value.trim();

    if(NameValue === '') {
		setErrorFor(Name, 'Tên người dùng không được để trống');
	} else {
		setSuccessFor(Name);
	}
    
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

