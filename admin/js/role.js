        function show(){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
            if(this.readyState ==4 && this.status ==200){
                console.log(this)
                myFunction(this);
            }
            };
            xhttp.open("GET", "nhanvien.xml", true);
            xhttp.send();
            }
            function myFunction(xml){
            var i;
            console.log(xml)
            var xmlDoc = xml.responseXML;
            var x = xmlDoc.getElementsByTagName("nhanvien");
            var nhanvien = "";
            nhanvien="<tr><th class='col c-1'> Mã NV </th><th class='col c-2'> Tên nhân viên </th><th class='col c-3' > Tài khoản </th><th class='col c-2'> Chức vụ </th><th class='col c-2'> Nơi làm việc </th> <th></th><th></th> </tr>"
            for (i=0; i<x.length; i++){
            nhanvien += "<tr id='data'><td class='col c-1'onClick='red(id)' >"+
                            x[i].getElementsByTagName("MaNV")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-2'style='text-align: left;'>"+
                            x[i].getElementsByTagName("HoTen")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-3' style='text-align: left;'> "+
                            x[i].getElementsByTagName("TK")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-2'>"+
                            x[i].getElementsByTagName("ChucVu")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-2'>"+
                            x[i].getElementsByTagName("Noilv")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-1'> <button class='btn Change'> Sửa</button></td><td class='col c-1'> <button class='btn Delete'> Xóa</button></td></tr>"
        }
        document.getElementById("tblRole").innerHTML = nhanvien;
    }
    $(document).ready(function(){
        $("#tblRole").on('click','.Delete',function(){
            $(this).closest('tr').remove();
          });
    });