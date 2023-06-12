
$(document).ready(function () {
    $("#form").hide();
    $("#addbtn").click(function () {
        $("#form").show();
    });
    $("#btn2").click(function () {
        $("#form").hide();
    });

});

var jsonData = [];
$(document).ready(function () {

    $("#list").click(function () {
        $("#form,#addbtn").hide();
    });

    let ids = 1;
    $.ajax({
        url: "http://localhost:8080/getAllstudents",
        type: "GET",
        success: function (data) {
            if (data) {
                jsonData = data;
                for (var i = 0; i < jsonData.length; i++) {
                    var row = jsonData[i];
                    var newrow = '<tr data-id="' + row.id + '"><th "scope="row"">' + row.id + '</th><td>' + row.name +
                        '</td><td>' + row.gender + '</td><td>' + row.course + '</td><td>' + row.hobbies +
                        '</th><td>' + '<img src="edit.png" width="25px" height="25px" id="edit" class="editbtn" alt="edit">' +
                        "  " + '<img src="trash.jpg" width="25px" height="25px" alt="delete" class="delbtn" id="delete"><img src="right.png" width="40px" height="40px" alt="right"class="rgtbtn" id="right"><img src="wrong.png" width="25px" height="25px" alt="wrong" class="wrgbtn" id="wrong"></td></tr>';
                    $('#table').append(newrow);
                    $('#right,#wrong').hide();
                }
                id = jsonData[jsonData.length - 1].id + 1;
            }
        }
    })

    $("#btn1").click(function () {
        //Getting the Data from inputes
        let Name = $("#name").val();
        let Course = $("#course").val();
        let Hobbies = $("#hobby").val().split(",");
        let Gender = '';
        if (gender1.checked) {
            Gender = $("#gender1").val();
        } else if (gender2.checked) {
            Gender = $("#gender2").val();
        }

        const student = {
            "id": ids,
            "name": Name,
            "gender": Gender,
            "course": Course,
            "hobbies": Hobbies
        };
        // console.log(Name, Gender, Course, Hobbies);
        jsonData.push(student);
        let jdata = JSON.stringify(student);
        console.log(jdata);
        $.ajax({
            url: "http://localhost:8080/addStudent",
            type: "POST",
            crossDomain: {
                origin: "http://localhost:8080"
            },
            contentType: "application/json",
            data: JSON.stringify(student),
            success: function (data) {
                console.log('Student Data posted successfully:', data);
            },
            error: function (xhr, status, error) {
                console.error('Error posting Student data:', error, status, xhr);
            }
        });


        var addRow = '<tr data-id=" ' + ids + '"><th scope="row">' + ids +
            '</th><td class="name">' + Name + '</th><td class="gender">' +
            Gender + '</th><td class="course">' + Course +
            '</th><td class="hobby">' + Hobbies +
            '</th><td>' + '<img src="edit.png" width="25px" height="25px" id="edit" class="editbtn" alt="edit">' +
            "  " + '<img src="trash.jpg" width="25px" height="25px" alt="delete" class="delbtn" id="delete"><img src="right.png" width="40px" height="40px" alt="right"class="rgtbtn" id="right"><img src="wrong.png" width="25px" height="25px" alt="wrong" class="wrgbtn" id="wrong"></td></tr>';
        ids++;
        $('#table').append(addRow);
        $('#name').val();
        $('#gender1').val();
        $('#gender2').val();
        $('#course').val();
        $('#hobby').val();
        $('#right,#wrong').hide();
        //student added Model
        var message = document.createElement('div');
        // message.innerText = 'Student Record Added Successfully!'+"\n"+"Name : "+student.name+"\n"+"Course : "+student.course+"\n"+"Gender : "+student.gender+"\n"+"Hobbies : "+student.hobbies;
        message.innerText = 'Student Record Added Successfully!'
        message.style.backgroundColor = 'green';
        message.style.borderRadius = '10px';
        message.style.color = 'white';
        message.style.padding = '10px';
        message.style.position = 'absolute';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(message);

        // Remove the pop-up message after a few seconds
        setTimeout(function () {
            message.remove();
        }, 3000);
        //   });

    });


    $('body').on('click', '#edit', function () {
        var row = $(this).closest('tr');
        var btn = row.find('#edit,#delete');
        btn.hide();

        var row1 = $(this).closest('tr');
        var btn1 = row1.find('#right,#wrong');
        btn1.show();


        var col = row.find('td:not(:last-child)');
        var originalValues = [];
        col.each(function () {
            var cell = $(this);
            var value = cell.text();
            originalValues.push(value);
            console.log(originalValues);
            if (cell.index() === 2) {
                let values = originalValues[1];
                console.log(values);
                cell.html('<label><input type="radio" name="status-' + row.index() + '" value="Male"> Male</label><br><label><input type="radio" name="status-' + row.index() + '" value="Female"> Female</label>');
                cell.find('input[value="' + values + '"]').prop('checked', true); // set the checked radio button based on the original value
                cell.find('input[type="radio"]')
            } else if (cell.index() === 3) {
                cell.html('<select class="form-control"><option value="B.Tech">B.Tech</option><option value="B.Com">B.Com</option><option value="B.A">B.A</option><option value="BCA">BCA</option></select>');
                cell.find('select').val(value);
            } else {
                cell.html('<input type="text" class="form-control" value="' + value + '">');
            }
            row.data('original-values', originalValues);
        });

        $('body').on('click', '#right', function () {

            var row = $(this).closest('tr');
            var id = row.data('id');
            var col = row.find('td:not(:last-child)');
            var uValues = [];
            col.each(function () {
                var cell = $(this);
                if (cell.index() === 2) {
                    var nValue = cell.find('input[type="radio"]:checked').val();
                } else if (cell.index() === 3) {
                    var nValue = cell.find('select').val();
                } else {
                    var nValue = cell.find('input').val();
                }
                uValues.push(nValue);
                cell.text(nValue);
            });


            $.ajax({
                url: "http://localhost:8080/updateById",
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    id: id,
                    name: uValues[0],
                    gender: uValues[1],
                    course: uValues[2],
                    hobbies: typeof uValues[3] === 'string' ? uValues[3].split(',') : uValues[3]

                }),
                success: function (data) {
                    console.log('Student Data updated successfully:', data);
                },
                error: function (xhr, status, error) {
                    console.error('Error updating Student data:', error, status, xhr);
                }
            });

            var row1 = $(this).closest('tr');
            var btn1 = row1.find('#edit,#delete');
            btn1.show();
            var row1 = $(this).closest('tr');
            var btn1 = row1.find('#right,#wrong');
            btn1.hide();

        });
        $('body').on('click', '#wrong', function () {

            var row = $(this).closest('tr');
            var gender = row.find('td:eq(1)').text();
            var col1 = row.find('td:not(:last-child)');
            var val = row.data('original-values');

            col1.each(function (index) {
                var cell = $(this);
                var value = val[index];
                cell.html(value);
            });

            var row1 = $(this).closest('tr');
            var btn1 = row1.find('#edit,#delete');
            btn1.show();
            var row1 = $(this).closest('tr');
            var btn1 = row1.find('#right,#wrong');
            btn1.hide();

        });




    });

    $('body').on('click', '#delete', function () {

        var row = $(this).closest('tr');
        const cells = row.children('td');

        // Get the values from the cells

        const name = cells.eq(0).text();
        const gender = cells.eq(1).text();
        const course = cells.eq(2).text();
        // const course = row.find("select").val();
        const hobbies = cells.eq(3).text();


        // Populate the modal popup with the values
        $('#modal-name').text(name);
        $('#modal-gender').text(gender);
        $('#modal-course').text(course);
        $('#modal-hobbies').text(hobbies);
        //Get id of perticular row from table
        var studentId = $(this).closest('tr').data('id');
        // Show the modal popup
        $('#delete-modal').show();
        function deleteRecord(studentId) {
            $.ajax({
                url: "http://localhost:8080/deleteById/" + studentId,
                type: "DELETE",
                success: function (data) {
                    console.log('Student Data deleted successfully:', data);
                },
                error: function (xhr, status, error) {
                    console.error('Error deleting Student data:', error, status, xhr);
                }
            });
        }
        // Add click event listener to confirm button
        $('#confirm-delete').on('click', function () {
            // Remove the row from the table
            row.remove();
            deleteRecord(studentId);
            // Hide the modal popup
            $('#delete-modal').hide();
        });

        // Add click event listener to cancel button
        $('#cancel-delete').on('click', function () {
            row = $(this).closest('tr');
            $('#delete-modal').hide();

        });



    });
});
