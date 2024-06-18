$(document).ready(function () {
    showProducts();
   
});

$("#btn").click(function () {
    $("#mymodal").modal('show');
    $("#savebtn").show();
    $("#updbtn").hide();
    $("#exampleModalLabel").text("Add New Products");
    $("#id").hide();
});

$("#close").click(function () {
    $("#mymodal").modal('hide');
    showProducts();
});

$("#savebtn").click(function () {
    var obj = $("#myform").serialize();
    $.ajax({
        url: '/Products/AddProduct',
        type: 'Post',
        dataType: 'json',
        contentType: 'Application/X-www-form-urlencoded; charset=utf-8;',
        data: obj,
        success: function () {
         
            alert("Product Added Succesfully");
            showProducts();
            $("#mymodal").modal('hide');
            clear();

           
        },

        Error: function () {
        alert("Something Errored happend")
        }

    });
});



function showProducts() {
    $.ajax({
        url: '/Products/ShowProducts',
        type: 'Post',
        dataType: 'json',
        contentType: 'Application/json;charset=utf-8;',
        success: function (result ,sta,xhr) {
            var obj = '';
            $.each(result, function (index, item) {
                obj += "<tr>";
                obj += "<td>"+item.pid+"</td>";
                obj += "<td>" + item.pname + "</td>";
                obj += "<td>" + item.pcat + "</td>";
                obj += "<td>" + item.price + "</td>";
                obj += "<td><a onclick='RemoveProducts(" + item.pid + ")' class='btn btn-danger btn-sm'>Delete</a> <a  onclick='EditProducts("+item.pid+")' class='btn btn-primary btn-sm mx-2'>Edit</a></td>";
                obj += "</tr>";
            })
            $("#tdata").html(obj);
        },

        Error: function () {
            alert("Something Errored happend")
        }
    })
}



function RemoveProducts(id) {

    if (confirm("Are you sure you Want to delete this record")) {
        $.ajax({
            url: '/Products/DeleteProducts?prodid=' + id,

            success: function () {

                alert("Product Delete Succesfully");
                showProducts();
            },

            Error: function () {
                alert("Something Errored happend");
            }
        })
    }
    else {
        alert("Record Not Deleted");
    }

  
}


function EditProducts(id) {
    $.ajax({
        url:'/Products/UpdateProducts?prodid=' + id,

        success: function (response) {

            $("#mymodal").modal('show');
            $("#Pid").val(response.pid);
            $("#Pname").val(response.pname);
            $("#Pcat").val(response.pcat);
            $("#Price").val(response.price);

            $("#savebtn").hide();
            $("#updbtn").show();
            $("#exampleModalLabel").text("Edit Products");
            $("#id").show();
            showProducts();
        },

        Error: function () {
            alert("Something Errored happend");
        }
    })
}



$("#updbtn").click(function () {
    var obj = $("#myform").serialize();
    $.ajax({
        url: '/Products/ModifyProducts',
        type: 'Post',
        dataType: 'json',
        contentType: 'Application/X-www-form-urlencoded; charset=utf-8;',
        data: obj,
        success: function () {

            alert("Product Updated Succesfully");
            showProducts();
            $("#mymodal").modal('hide');
            clear();


        },

        Error: function () {
            alert("Something Errored happend")
        }

    });
});




$("#srchbtn").click(function () {
    var search = $("#srch").val();
    $.ajax({
        url: '/Products/SearchProducts?searchp='+search,
        type: 'Post',
        dataType: 'json',
        contentType: 'Application/json;charset=utf-8;',
        success: function (result, sta, xhr) {
            var obj = '';
            $.each(result, function (index, item) {
                obj += "<tr>";
                obj += "<td>" + item.pid + "</td>";
                obj += "<td>" + item.pname + "</td>";
                obj += "<td>" + item.pcat + "</td>";
                obj += "<td>" + item.price + "</td>";
                obj += "<td><a onclick='RemoveProducts(" + item.pid + ")' class='btn btn-danger btn-sm'>Delete</a> <a  onclick='EditProducts(" + item.pid + ")' class='btn btn-primary btn-sm mx-2'>Edit</a></td>";
                obj += "</tr>";
            })
            $("#tdata").html(obj);
        },

        Error: function () {
            alert("Something Errored happend")
        }
    })

});



function clear() {
    $("#Pname").val('');
    $("#Pcat").val('');
    $("#Price").val('');
}
