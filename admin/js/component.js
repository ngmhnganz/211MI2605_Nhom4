$('#menu-bar').click(function(){
    if ($('#menu-section').hasClass('open-menu')){
        $('#menu-section').removeClass('open-menu')
        $('#menu-bar').removeClass('hide')
    } 
    else{
        $('#menu-section').addClass('open-menu')
        $('#menu-bar').addClass('hide')
    }
})

$('.close_menu').click(function(){
    $('#menu-section').removeClass('open-menu')
    $('#menu-bar').removeClass('hide')
})

switch(window.location.pathname){
    case '/admin/update-product.html':{
        $('#menu-product').addClass('current-menu')
        $('#container-title').text('CẬP NHẬT SẢN PHẨM')
        break;
    }
    case '/admin/update-order.html':{
        $('#menu-order').addClass('current-menu')
        $('#container-title').text('CẬP NHẬT ĐƠN HÀNH')
        break;
    }
    case '/admin/manage-role.html':{
        $('#menu-manage').addClass('current-menu')
        $('#container-title').text('PHÂN QUYỀN')
        break;
    }
}


