function show(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState ==4 && this.status ==200){
            console.log(this)
            myFunction(this);
            
        }
    };
    xhttp.open("GET", "data/sinhvien.xml", true);
    xhttp.send();
}

function myFunction(xml){
    var i;
    console.log(xml)
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("sinhvien");
    
    var thanhvien = "";
    /* list 5 thành viên*/
    var delay = 0;
    for (i=0; i<x.length; i++){
        delay = 500*i;
        thanhvien += `<a data-aos="fade-down" data-aos-easing="linear"
        data-aos-duration="400" data-aos-delay='` +`${delay}'`+ "href=' " +  x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + "'>" + 
                    " <div class='team_member'> <div class='team_img'> <img src=' " + 
                    x[i].getElementsByTagName("photoTron")[0].childNodes[0].nodeValue + " 'alt='Team_image'></div> <h3> " +
                    x[i].getElementsByTagName("hoTen")[0].childNodes[0].nodeValue + "</h3> <p class='role'> " +
                    x[i].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + "</p> <p style='text-align:justify'>" +
                    x[i].getElementsByTagName("gioiThieu")[0].childNodes[0].nodeValue + "</p> </div> </a> ";
    }
    document.getElementById("team").innerHTML = thanhvien;

    /*anh thư*/

    anhthu = "<div class='col l-6 m-6 c-12 img mg-t mg-r mg-l mg-b hinh-thanhvien' data-aos='fade-down'> <img src='" +
            x[0].getElementsByTagName("photoVuong")[0].childNodes[0].nodeValue + 
            " '> </div><div class='col l-6 m-6 c-12 mg-t mg-r mg-l mg-b noidung-thanhvien' data-aos='fade-down' data-aos-duration='500'> <div class='ten-thanhvien'>" +
            x[0].getElementsByTagName("hoTen")[0].childNodes[0].nodeValue + 
            "</div> <div class='thongtin-thanhvien'> <p>MSSV:" + 
            x[0].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + 
            "</p> <p>Lớp: " +  x[0].getElementsByTagName("lop")[0].childNodes[0].nodeValue + 
            "</p> <p> Ngày sinh: " + x[0].getElementsByTagName("ngaySinh")[0].childNodes[0].nodeValue +
            "</p><p>Số điện thoại: " + x[0].getElementsByTagName("sdt")[0].childNodes[0].nodeValue +
            "</p> <p>Email: " + x[0].getElementsByTagName("email")[0].childNodes[0].nodeValue +
            "</p> <p> Sở thích: " + x[0].getElementsByTagName("soThich")[0].childNodes[0].nodeValue +
            "</p> <p>Câu châm ngôn: " + x[0].getElementsByTagName("cauChamNgon")[0].childNodes[0].nodeValue +
            "</p> </div> <div class='lienhe-thanhvien'>Thông tin liên hệ: <a href='" + 
            x[0].getElementsByTagName("fb")[0].childNodes[0].nodeValue + "'><i class='fab fa-facebook-f fa-lg'></i></a></div> </div>" ;
    
    document.getElementById("anhthu").innerHTML = anhthu;

    /*minh ngân */

    minhngan = "<div class='col l-6 m-6 c-12 img mg-t mg-r mg-l mg-b hinh-thanhvien' data-aos='fade-down'> <img src='" +
    x[1].getElementsByTagName("photoVuong")[0].childNodes[0].nodeValue + 
    " '> </div><div class='col l-6 m-6 c-12 mg-t mg-r mg-l mg-b noidung-thanhvien' data-aos='fade-down' data-aos-duration='500'> <div class='ten-thanhvien'>" +
    x[1].getElementsByTagName("hoTen")[0].childNodes[0].nodeValue + 
    "</div> <div class='thongtin-thanhvien'> <p>MSSV:" + 
    x[1].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + 
    "</p> <p>Lớp: " +  x[1].getElementsByTagName("lop")[0].childNodes[0].nodeValue + 
    "</p> <p> Ngày sinh: " + x[1].getElementsByTagName("ngaySinh")[0].childNodes[0].nodeValue +
    "</p><p>Số điện thoại: " + x[1].getElementsByTagName("sdt")[0].childNodes[0].nodeValue +
    "</p> <p>Email: " + x[1].getElementsByTagName("email")[0].childNodes[0].nodeValue +
    "</p> <p> Sở thích: " + x[1].getElementsByTagName("soThich")[0].childNodes[0].nodeValue +
    "</p> <p>Câu châm ngôn: " + x[1].getElementsByTagName("cauChamNgon")[0].childNodes[0].nodeValue +
    "</p> </div> <div class='lienhe-thanhvien'>Thông tin liên hệ: <a href='" + 
    x[1].getElementsByTagName("fb")[0].childNodes[0].nodeValue + "'><i class='fab fa-facebook-f fa-lg'></i></a></div> </div>" ;

    document.getElementById("minhngan").innerHTML = minhngan;

    /*kim xuân */

    kimxuan = "<div class='col l-6 m-6 c-12 img mg-t mg-r mg-l mg-b hinh-thanhvien' data-aos='fade-down'> <img src='" +
    x[2].getElementsByTagName("photoVuong")[0].childNodes[0].nodeValue + 
    " '> </div><div class='col l-6 m-6 c-12 mg-t mg-r mg-l mg-b noidung-thanhvien' data-aos='fade-down' data-aos-duration='500'> <div class='ten-thanhvien'>" +
    x[2].getElementsByTagName("hoTen")[0].childNodes[0].nodeValue + 
    "</div> <div class='thongtin-thanhvien'> <p>MSSV:" + 
    x[2].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + 
    "</p> <p>Lớp: " +  x[2].getElementsByTagName("lop")[0].childNodes[0].nodeValue + 
    "</p> <p> Ngày sinh: " + x[2].getElementsByTagName("ngaySinh")[0].childNodes[0].nodeValue +
    "</p><p>Số điện thoại: " + x[2].getElementsByTagName("sdt")[0].childNodes[0].nodeValue +
    "</p> <p>Email: " + x[2].getElementsByTagName("email")[0].childNodes[0].nodeValue +
    "</p> <p> Sở thích: " + x[2].getElementsByTagName("soThich")[0].childNodes[0].nodeValue +
    "</p> <p>Câu châm ngôn: " + x[2].getElementsByTagName("cauChamNgon")[0].childNodes[0].nodeValue +
    "</p> </div> <div class='lienhe-thanhvien'>Thông tin liên hệ: <a href='" + 
    x[2].getElementsByTagName("fb")[0].childNodes[0].nodeValue + "'><i class='fab fa-facebook-f fa-lg'></i></a></div> </div>" ;

    document.getElementById("kimxuan").innerHTML = kimxuan;
    
    /*anh thi */
    anhthi = "<div class='col l-6 m-6 c-12 img mg-t mg-r mg-l mg-b hinh-thanhvien' data-aos='fade-down'> <img src='" +
    x[3].getElementsByTagName("photoVuong")[0].childNodes[0].nodeValue + 
    " '> </div><div class='col l-6 m-6 c-12 mg-t mg-r mg-l mg-b noidung-thanhvien' data-aos='fade-down' data-aos-duration='500'> <div class='ten-thanhvien'>" +
    x[3].getElementsByTagName("hoTen")[0].childNodes[0].nodeValue + 
    "</div> <div class='thongtin-thanhvien'> <p>MSSV:" + 
    x[3].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + 
    "</p> <p>Lớp: " +  x[3].getElementsByTagName("lop")[0].childNodes[0].nodeValue + 
    "</p> <p> Ngày sinh: " + x[3].getElementsByTagName("ngaySinh")[0].childNodes[0].nodeValue +
    "</p><p>Số điện thoại: " + x[3].getElementsByTagName("sdt")[0].childNodes[0].nodeValue +
    "</p> <p>Email: " + x[3].getElementsByTagName("email")[0].childNodes[0].nodeValue +
    "</p> <p> Sở thích: " + x[3].getElementsByTagName("soThich")[0].childNodes[0].nodeValue +
    "</p> <p>Câu châm ngôn: " + x[3].getElementsByTagName("cauChamNgon")[0].childNodes[0].nodeValue +
    "</p> </div> <div class='lienhe-thanhvien'>Thông tin liên hệ: <a href='" + 
    x[3].getElementsByTagName("fb")[0].childNodes[0].nodeValue + "'><i class='fab fa-facebook-f fa-lg'></i></a></div> </div>" ;

    document.getElementById("anhthi").innerHTML = anhthi;

    /*anh phương */
    anhphuong = "<div class='col l-6 m-6 c-12 img mg-t mg-r mg-l mg-b hinh-thanhvien' data-aos='fade-down'> <img src='" +
    x[4].getElementsByTagName("photoVuong")[0].childNodes[0].nodeValue + 
    " '> </div><div class='col l-6 m-6 c-12 mg-t mg-r mg-l mg-b noidung-thanhvien' data-aos='fade-down' data-aos-duration='500'> <div class='ten-thanhvien'>" +
    x[4].getElementsByTagName("hoTen")[0].childNodes[0].nodeValue + 
    "</div> <div class='thongtin-thanhvien'> <p>MSSV:" + 
    x[4].getElementsByTagName("mssv")[0].childNodes[0].nodeValue + 
    "</p> <p>Lớp: " +  x[4].getElementsByTagName("lop")[0].childNodes[0].nodeValue + 
    "</p> <p> Ngày sinh: " + x[4].getElementsByTagName("ngaySinh")[0].childNodes[0].nodeValue +
    "</p><p>Số điện thoại: " + x[4].getElementsByTagName("sdt")[0].childNodes[0].nodeValue +
    "</p> <p>Email: " + x[4].getElementsByTagName("email")[0].childNodes[0].nodeValue +
    "</p> <p> Sở thích: " + x[4].getElementsByTagName("soThich")[0].childNodes[0].nodeValue +
    "</p> <p>Câu châm ngôn: " + x[4].getElementsByTagName("cauChamNgon")[0].childNodes[0].nodeValue +
    "</p> </div> <div class='lienhe-thanhvien'>Thông tin liên hệ: <a href='" + 
    x[4].getElementsByTagName("fb")[0].childNodes[0].nodeValue + "'><i class='fab fa-facebook-f fa-lg'></i></a></div> </div>" ;

    document.getElementById("anhphuong").innerHTML = anhphuong;
}


     
