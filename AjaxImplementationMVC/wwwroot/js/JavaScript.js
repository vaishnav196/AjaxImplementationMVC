$(document).ready(function () {
    showProducts();
});

$("#btn").click(function () {
    $("#mymodal").modal('show')
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
                obj += "</tr>";
            })
            $("#tdata").html(obj);
        },

        Error: function () {
            alert("Something Errored happend")
        }
    })
}