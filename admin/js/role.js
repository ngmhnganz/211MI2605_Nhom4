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
    nhanvien += "<tr id='data'><td class='col c-1'>"+
                  x[i].getElementsByTagName("MaNV")[0].childNodes[0].nodeValue+
                  "</td><td class='col c-2'style='text-align: left;'>"+
                  x[i].getElementsByTagName("HoTen")[0].childNodes[0].nodeValue+
                  "</td><td class='col c-3' style='text-align: left;'> "+
                  x[i].getElementsByTagName("TK")[0].childNodes[0].nodeValue+
                  "</td><td class='col c-2'>"+
                  x[i].getElementsByTagName("ChucVu")[0].childNodes[0].nodeValue+
                  "</td><td class='col c-2'>"+
                  x[i].getElementsByTagName("Noilv")[0].childNodes[0].nodeValue+
                  "</td><td class='col c-2'> <i class='fas fa-edit'></i><i class='fas fa-user-minus'></i></td></tr>"
}
  document.getElementById("tblRole").innerHTML = nhanvien;
}
  $(document).ready(function(){
  $("#tblRole").on('click','i.fas.fa-user-minus',function(){
    $(this).closest('tr').remove().draw();
});
  $("#tblRole").on('mousedown.edit', "i.fas.fa-edit", function(e) {

$(this).removeClass().addClass("fas fa-save");
  var $row = $(this).closest("tr").off("mousedown");
  var $tds = $row.find("td").not(':first').not(':last');

  $.each($tds, function(i, el) {
  var txt = $(this).text();
  $(this).html("").append("<input type='text' value=\""+txt+"\">");
});

});

$("#tblRole").on('mousedown', "input", function(e) {
  e.stopPropagation();
});

$("#tblRole").on('mousedown.save', "i.fas.fa-save", function(e) {
  $(this).removeClass().addClass("fas fa-edit");
  var $row = $(this).closest("tr");
  var $tds = $row.find("td").not(':first').not(':last');
  $.each($tds, function(i, el) {
  var txt = $(this).find("input").val()
  $(this).html(txt);
});
});
});

