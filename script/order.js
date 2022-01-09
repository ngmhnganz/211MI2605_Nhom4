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

// Xử lý nút close trên modal
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
