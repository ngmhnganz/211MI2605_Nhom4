import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get, update} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

const app = initializeApp(config);
const database = getDatabase(app);
const databaseRef = ref(database);
const auth = getAuth();
const params = new URLSearchParams(window.location.search)
const recipeID =Object.fromEntries(params.entries()).id

onAuthStateChanged(auth, (user) => {
    if (user) {
        checkLiked(user.uid)
        $('#btnThemVaoGio').click(()=>{
            let cartItem;
            let updateCart={}
            var checkboxes = $('.cac-nguyen-lieu').children().children('input:checkbox:checked')
            for (let i = 0; i < checkboxes.length; i++) {
                cartItem = {
                    id : checkboxes[i].id,
                    price : checkboxes[i].value,
                    name : checkboxes[i].name,
                    quantity : 1
                }
                updateCart[`User/${auth.currentUser.uid}/userCart/id${checkboxes[i].id}`] = cartItem; 
            }
            update(ref(database), updateCart)
            .then(()=>{
                toast({
                    title: "Thêm sản phẩm thành công",
                    message: "Đã thêm sản phẩm vào giỏ hàng thành công",
                    type: "success",
                    duration: 5000
                  });
            })
            .catch(error=>{
                toast({
                    title: "Đã có lỗi xảy ra",
                    message: "Vui lòng tải trang và thử lại",
                    type: "error",
                    duration: 5000
                  });
            })
        })
    }
    else{
        $('#btnThemVaoGio').click(()=>{
            dialog({
                title: "Bạn cần đăng nhập",
                message: "Để thực hiện, bạn cần đăng nhập. Hãy tạo tài khoản để hưởng nhiều ưu đãi từ Trứng nhé",
                type: "info"
            })
        })
    }
    
})

function checkLiked(uid) {
    get(child(databaseRef,`User/${uid}/userLikeRecipe/${recipeID}`))
    .then((snapshot)=>{
        if(snapshot.val()!=null){
            $('#icHeart').attr('class','fas fa-heart')
            $('#chkLike').prop('checked',true)
        }
    })
}

get(child(databaseRef,`CongThuc/${recipeID}`))
.then((snapshot) => {
    return snapshot.val()
})
.then(recipe => {
    document.title = 'Công thức '+recipe.recipeName
    $('#recipeDescrip').text(recipe.recipeShortDescription)
    $('#title-name').text( recipe.recipeName.toUpperCase())
    $('#recipeRation').text(recipe.recipeRation+' người')
    $('#recipeTime').text(recipe.recipeTime+ ' phút')
    $('#recipeLevel').text(recipe.recipeLevel)
    $('#recipeImg').attr('src',recipe.recipeImage)
    loadDescription(recipe.recipeDescription)
    loadIngredientList(Object.values(recipe.recipeIngredient))
    return recipe.recipeID
})
.then(id=>{
    get(child(databaseRef,`CongThuc`))
    .then((snapshot)=>{
        let recipeList =[] 
        let i =0
        try {
            snapshot.forEach(function(child){
                if (child.recipeID !=id) {
                    if (i>2) throw 'break';
                    recipeList.push(child.val())
                    i++;
                }})
        }
        catch{
            console.log(recipeList)
            return recipeList
        }
        console.log(recipeList)
        return recipeList
    })
    .then(recipeList=>{
        let delay =0;
        let htmls = recipeList.map(recipe=>{
            return`
            <div class="col l-4 m-4 c-12 mg-t mg-r mg-l mg-b"  data-aos="fade-down"  data-aos-delay="${delay=delay+100}" >
                <a class="recipe-container" href="/congthuc/cong-thuc.html?id=${recipe.recipeID}">
                    <div class="recipe-img">
                        <img src="${recipe.recipeImage}" alt="">
                    </div>
                    <div class="recipe-detail">
                            ${recipe.recipeName}
                        <div class="recipe-description">
                            ${recipe.recipeShortDescription}
                        </div>
                    </div>
                </a>
            </div>
            `
        })
        $('.danh-sach-recipe-khac').html(htmls.join(''))
        AOS.init()
    })
})
.then(()=>{
    preloaderFadeOutInit()
})

function loadIngredientList(ingredientList){
    let html = ingredientList.map(ingredient => {
        return `
        <div class="checkbox">  
            <input type="checkbox" name="${ingredient.name}" id="${ingredient.id}" value="${ingredient.price}">  
            <div class="box">  
                <div>${ingredient.name}</div>  
            </div>  
        </div>  `
     })
     $('.cac-nguyen-lieu').html(html)

    ingredientList.map(ingredient=> {
        $(`#${ingredient.id}`).change(()=>{
            if (!$(`#${ingredient.id}`).is(':checked') && $('#chooseAll').is(':checked')){
                $('#chooseAll').prop('checked', false)
            }
        })
    }) 
}

$('#chooseAll').change(()=>{
    var checkboxes = $('.cac-nguyen-lieu').children().children('input:checkbox')
    var checked =  $('#chooseAll').is(':checked') 
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checked
     }
})

$('#chkLike').change(()=>{
    let icon = $('#chkLike').is(':checked') ? 'fas fa-heart' : 'far fa-heart'
    $('#icHeart').attr('class',icon)
    if ($('#chkLike').is(':checked')){
        let likeItem = {
            id : recipeID,
            name: $('#title-name').text()[0].toUpperCase()+ $('#title-name').text().toLowerCase().slice(1),
            thumb: $('#recipeImg').attr('src'),
            des : $('#recipeDescrip').text(),
            time : $('#recipeTime').text().slice(0,$('#recipeTime').text().length-5)
        }
        let updateItem = {}
        updateItem[`User/${auth.currentUser.uid}/userLikeRecipe/${recipeID}`] = likeItem
        update(ref(database), updateItem)
    }
    else{
        let updateItem = {}
        updateItem[`User/${auth.currentUser.uid}/userLikeRecipe/${recipeID}`] = null
        update(ref(database), updateItem)
    }
})

function loadDescription(description){
    var steps = description.split('#')
    var html =''
    for (let i =0; i< steps.length;i+=2){
        html += ` <p class="khung-content"  style="margin-bottom:20px"><b>${steps[i]}</b> ${steps[i+1]}</p>`
    }
    $('#recipeStep').html(html) 
}

