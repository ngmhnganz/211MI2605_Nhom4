$('#menu-bar').click(function(){
    // if ($('#menu-section').hasClass('open-menu')){
    //     $('#menu-section').removeClass('open-menu')
    //     $('#menu-bar').removeClass('hide')
    // } 
    // else{
    //     $('#menu-section').addClass('open-menu')
    //     $('#menu-bar').addClass('hide')
    // }
    if ($('#menu-section').hasClass('open-menu')){
        $('#menu-section').removeClass('open-menu')
        $('#menu-bar').removeClass('hide')
        $('#close_menu_id').addClass('hide')
    } 
    else{
        $('#menu-section').addClass('open-menu')
        $('#menu-bar').addClass('hide')
        $('#close_menu_id').removeClass('hide')
    }
})

$('.close_menu').click(function(){
    $('#menu-section').removeClass('open-menu')
    $('#menu-bar').removeClass('hide')
    $('#close_menu_id').addClass('hide')
})

switch(window.location.pathname){
    case '/admin/index.html':{
        $('#menu-product').addClass('current-menu')
        $('#container-title').text('ĐĂNG NHẬP')
        break;
    }
    case '/admin/product-list.html':{
        $('#menu-product').addClass('current-menu')
        $('#container-title').text('CẬP NHẬT SẢN PHẨM')
        break;
    }
    case '/admin/update-order.html':{
        $('#menu-order').addClass('current-menu')
        $('#container-title').text('CẬP NHẬT ĐƠN HÀNG')
        break;
    }
    case '/admin/manage-role.html':{
        $('#menu-manage').addClass('current-menu')
        $('#container-title').text('PHÂN QUYỀN')
        break;
    }
    case '/admin/create-role.html':{
        $('#menu-manage').addClass('current-menu')
        $('#container-title').text('TẠO CHỨC VỤ')
        break;
    }
    case '/admin/update-product.html':{
        $('#menu-product').addClass('current-menu')
        $('#container-title').text('TẠO SẢN PHẨM')
        break;
    }
    case '/admin/addStaff.html':{
        $('#menu-manage').addClass('current-menu')
        $('#container-title').text('THÊM NHÂN VIÊN')
        break;
    }
}


