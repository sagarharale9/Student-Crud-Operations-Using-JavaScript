  $("#myTable").on("click", ".editBtn", function () {

  var row = $(this).closest("tr"); // get the row that contains the clicked button

  var sname = row.find(".name").text(); // get the name value

  var gender = row.find(".gender").text();

  var course = row.find(".course").text(); // get the course value

  var hobbies = row.find(".hobbies").text(); // get the hobbies value

  row.html(
      "<td>" + row.find("td:first").text() + "</td>" +

      "<td><input class='form-control' type='text' value='" + sname + "'></td>" +

      "<td class='gender'>" + "<div class='form-check'>" + "<input class='form-check-input' type='radio' name='gender' id='maleRadio' value='male' " + (gender == 'male' ? 'checked' : '') + ">" + "<label class='form-check-label' for='maleRadio'>Male</label>" + "</div>" + "<div class='form-check'>" + "<input class='form-check-input' type='radio' name='gender' id='femaleRadio' value='female' " + (gender == 'female' ? 'checked' : '') + ">" + "<label class='form-check-label' for='femaleRadio'>Female</label>" + "</div>" + "</td>" +

      "<td><select class='form-select'><option value='BCA' " + (course == 'BCA' ? 'selected' : '') + ">BCA</option><option value='B.Sc' " + (course == 'B.Sc' ? 'selected' : '') + ">B.Sc</option><option value='B.Tech' " + (course == 'B.Tech' ? 'selected' : '') + ">B.Tech</option><option value='B.Com' " + (course == 'B.Com' ? 'selected' : '') + ">B.Com</option></select></td>" +

      "<td><input class='form-control' type='text' value='" + hobbies + "'></td>" +

      "<td>" +

      '<img src="right.png" width="40px" height="40px" alt="right"class="rgtbtn" id="right">' +

      '<img src="wrong.png" width="25px" height="25px" alt="wrong" class="wrgbtn" id="wrong">' +

      "</td>"

  );

});