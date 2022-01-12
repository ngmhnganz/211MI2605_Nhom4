// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const app = initializeApp(config);
const database = getDatabase(app);
const databaseRef = ref(database);
const params = new URLSearchParams(window.location.search)
const recipeID =Object.fromEntries(params.entries()).id

get(child(databaseRef,`CongThuc/${recipeID}`))
.then((snapshot) => {
    return snapshot.val()
})
.then(recipe => {
    $('#recipeDescrip').text(recipe.recipeShortDescription)
    $('#title-name').text( recipe.recipeName.toUpperCase())
    $('#recipeRation').text(recipe.recipeRation+' người')
    $('#recipeTime').text(recipe.recipeTime+ ' phút')
    $('#recipeLevel').text(recipe.recipeLevel)
    $('#recipeImg').attr('src',recipe.recipeImage)
    loadDescription(recipe.recipeDescription)
    loadIngredientList(Object.values(recipe.recipeIngredient))
})

function loadIngredientList(ingredientList){
    let html = ingredientList.map(ingredient => {
        return `
        <div class="tung-hang">
        <input type="checkbox" id="${ingredient.id}" name="${ingredient.id}" value="${ingredient.name}">
        <label>${ingredient.name}</label>
         </div>`
     })
     $('.cac-nguyen-lieu').html(html)
}

function loadDescription(description){
    var steps = description.split('#')
    console.log(steps)
    var html =''
    for (let i =0; i< steps.length;i+=2){
        html += ` <p class="khung-content"><b>${steps[i]}</b>: ${steps[i+1]}</p>`
    }
    $('#recipeStep').html(html) 
}
