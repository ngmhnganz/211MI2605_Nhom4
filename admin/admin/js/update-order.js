function show(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState ==4 && this.status ==200){
            console.log(this)
            myFunction(this);
            
        }
    };
    xhttp.open("GET", "./data/donhang.xml", true);
    xhttp.send();
}

function myFunction(xml){
    var i;
    console.log(xml)
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("donhang");
    
    var donhang = "";
    
    for (i=0; i<x.length; i++){
        
        donhang += "<div class='tung-dong'><div class='ma'> " + x[i].getElementsByTagName("ma")[0].childNodes[0].nodeValue +
        "</div><div class='ngay'>" + x[i].getElementsByTagName("ngayDat")[0].childNodes[0].nodeValue + 
        "</div><div class='kh'>" + x[i].getElementsByTagName("khachHang")[0].childNodes[0].nodeValue +
        "</div><div class='giaohang'><p>" + x[i].getElementsByTagName("giaoHang")[0].childNodes[0].nodeValue + 
        "</p></div><div class='thanhtoan'><p>" + x[i].getElementsByTagName("thanhToan")[0].childNodes[0].nodeValue +
        "</p></div><div class='cod'><p>" + x[i].getElementsByTagName("cod")[0].childNodes[0].nodeValue +
        "</p></div><div class='tongtien'>" + x[i].getElementsByTagName("tongTien")[0].childNodes[0].nodeValue +
        "</div></div>" ;
    }

    document.getElementById("don-hang").innerHTML = donhang;
}