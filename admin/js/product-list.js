function show(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if(this.readyState ==4 && this.status ==200){
        console.log(this)
        myFunction(this);
    }
    };
    xhttp.open("GET", "product.xml", true);
    xhttp.send();
    }
    function myFunction(xml){
    var i;
    console.log(xml)
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("product");
    var product = "";
    product="<tr><th class='col c-1'> Mã SP </th><th class='col c-2'> Tồn kho </th><th class='col c-3' > Tên sản phẩm </th><th class='col c-2'> Loại sản phẩm </th><th class='col c-2'> Giá </th> <th></th><th></th> </tr>"
    for (i=0; i<x.length; i++){
    product += "<tr id='data'><td class='col c-1'onClick='red(id)' >"+
                    x[i].getElementsByTagName("MaSP")[0].childNodes[0].nodeValue+
                    "</td><td class='col c-2'style='text-align: left;'>"+
                    x[i].getElementsByTagName("TonKho")[0].childNodes[0].nodeValue+
                    "</td><td class='col c-3' style='text-align: left;'> "+
                    x[i].getElementsByTagName("TenSP")[0].childNodes[0].nodeValue+
                    "</td><td class='col c-2'>"+
                    x[i].getElementsByTagName("LoaiSP")[0].childNodes[0].nodeValue+
                    "</td><td class='col c-2'>"+
                    x[i].getElementsByTagName("Gia")[0].childNodes[0].nodeValue+
                    "</td><td class='col c-1'> <button class='btn Change'> Sửa</button></td><td class='col c-1'> <button class='btn Delete'> Xóa</button></td></tr>"
}
document.getElementById("tblProduct").innerHTML = product;
}
$(document).ready(function(){
$("#tblProduct").on('click','.Delete',function(){
    $(this).closest('tr').remove();
  });
});