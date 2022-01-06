        // var parser, xmlDoc;
        // var text="<nhanviens><nhanvien><MaNV> K19411629</MaNV><HoTen> Võ Nguyễn Anh Thi</HoTen> <TK> thivna19411c@uel.edu.vn</TK><ChucVu> Sinh Viên </ChucVu><Noilv> UEL </Noilv></nhanvien><nhanvien><MaNV> K19411632</MaNV><HoTen> Vũ Nguyễn Anh Thư</HoTen><TK>thuvna19411c@uel.edu.vn </TK><ChucVu> Sinh Viên </ChucVu><Noilv> UEL </Noilv></nhanvien><nhanvien><MaNV> K19411640</MaNV><HoTen> Huỳnh Kim Xuân </HoTen><TK> xuanhk19411c@uel.edu.vn</TK><ChucVu> Sinh Viên </ChucVu><Noilv> UEL </Noilv></nhanvien><nhanvien><MaNV> K19411615</MaNV><HoTen> Nguyễn Minh Ngân </HoTen><TK>ngannm19411c@uel.edu.vn </TK><ChucVu> Sinh Viên </ChucVu><Noilv> UEL </Noilv></nhanvien><nhanvien><MaNV> K19411626</MaNV><HoTen> Trần Thị Anh Phương </HoTen><TK>phuongtta19411c@uel.edu.vn</TK><ChucVu> Sinh Viên </ChucVu><Noilv> UEL </Noilv></nhanvien></nhanviens>";
        // parser= new DOMParser();
        // xmlDoc=parser.parseFromString(text,"text/xml");
        // function show(){
        // var x,i,table;
        // table="<tr><th class='col c-1'> Mã NV </th><th class='col c-2'> Tên nhân viên </th><th class='col c-3' > Tài khoản </th><th class='col c-2'> Chức vụ </th><th class='col c-2'> Nơi làm việc </th><td class='col c-1'> <button class='btn' id='Change'> Sửa</button></td><td class='col c-1'> <button class='btn' id='Delete'> Xóa</button></td></tr>"
        // x=xmlDoc.getElementsByTagName("nhanvien")
        // for(i = 0; i < x.legth; i++){
        //     table +="<tr><td class='col c-1' >"+
        //                 x[i].getElementsByTagName("MaNV")[0].childNodes[0].nodeValue+
        //                 "</td><td class='col c-2'>"+
        //                 x[i].getElementsByTagName("HoTen")[0].childNodes[0].nodeValue+
        //                 "</td><td class='col c-3'>"+
        //                 x[i].getElementsByTagName("TK")[0].childNodes[0].nodeValue+
        //                 "</td><td class='col c-2'>"+
        //                 x[i].getElementsByTagName("ChucVu")[0].childNodes[0].nodeValue+
        //                 "</td><td class='col c-2'>"+
        //                 x[i].getElementsByTagName("Noilv")[0].childNodes[0].nodeValue+
        //                 "</td></tr>"
        // }
        // document.getElementById("tblRole").innerHTML=table;
        // }
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
            nhanvien="<tr><th class='col c-1'> Mã NV </th><th class='col c-2'> Tên nhân viên </th><th class='col c-3' > Tài khoản </th><th class='col c-2'> Chức vụ </th><th class='col c-2'> Nơi làm việc </th></tr>"
            for (i=0; i<x.length; i++){
            nhanvien += "<tr><td class='col c-1' >"+
                            x[i].getElementsByTagName("MaNV")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-2'>"+
                            x[i].getElementsByTagName("HoTen")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-3'>"+
                            x[i].getElementsByTagName("TK")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-2'>"+
                            x[i].getElementsByTagName("ChucVu")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-2'>"+
                            x[i].getElementsByTagName("Noilv")[0].childNodes[0].nodeValue+
                            "</td><td class='col c-1'> <button class='btn' id='Change'> Sửa</button></td><td class='col c-1'> <button class='btn' id='Delete'> Xóa</button></td></tr>"
        }
        document.getElementById("tblRole").innerHTML = nhanvien;
    }