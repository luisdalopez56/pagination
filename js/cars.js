$(function() {

    $.post("pagination.php?page=1", function(data) {
        var htm = "";
        var resp = jQuery.parseJSON(data);
        if (resp['rec'].length > 0) {
            for (var i = 0; i < resp['rec'].length; i++) {
                var sid = resp['rec'][i]['id'];
                htm += '<tr id="row_num_' + sid + '">';
                htm += '<td>' + resp['rec'][i]['marca'] + '</td>';
                htm += '<td>' + resp['rec'][i]['modelo'] + '</td>';
                htm += '<td>' + resp['rec'][i]['pais'] + '</td>';

                // htm += '<td class="td-actions"><a class="btn btn-small btn-success" href="editStudent.php?student_id=' + sid + '"><i class="icon-large icon-edit"> </i></a><a class="btn btn-danger btn-small" onClick="getStudentId(' + sid + ')"   href="javascript:void(0)"><i class="btn-icon-only icon-remove"> </i></a></td>';
            }

        } else {
            htm += '<td></td>';
            htm += '<td colspan="3"> No record Found</td>';
            htm += '<td></td>';

        }
        jQuery("#target-content").html(htm);
        jQuery("#append-pagination").html(resp['pagination']);

    });

    // jQuery("#pagination li").live('click',function(e){
    $("#append-pagination").on("click", ".pagination a", function(e) {
        e.preventDefault();
        jQuery("#target-content").html('loading...');
        jQuery("#pagination li").removeClass('active');
        jQuery(this).addClass('active');
        // var pageNum = this.id;
        var pageNum = $(this).attr("data-page");

        $.post("pagination.php?page=" + pageNum, function(data) {
            var htm = "";
            var resp = jQuery.parseJSON(data);
            if (resp['rec'].length > 0) {
                for (var i = 0; i < resp['rec'].length; i++) {
                    var sid = resp['rec'][i]['id'];
                    htm += ' <tr id="row_num_' + sid + '">';
                    htm += '<td>' + resp['rec'][i]['marca'] + '</td>';
                    htm += '<td>' + resp['rec'][i]['modelo'] + '</td>';
                    htm += '<td>' + resp['rec'][i]['pais'] + '</td>';
                    // htm += '<td class="td-actions"><a class="btn btn-small btn-success" href="editStudent.php?student_id=' + sid + '"><i class="icon-large icon-edit"> </i></a><a class="btn btn-danger btn-small" onClick="getStudentId(' + sid + ')"   href="javascript:void(0)"><i class="btn-icon-only icon-remove"> </i></a></td>';
                }

            } else {
                htm += '<td></td>';
                htm += '<td colspan="3"> No record Found</td>';
                htm += '<td></td>';

            }
            jQuery("#target-content").html(htm);
            jQuery("#append-pagination").html(resp['pagination']);

        });


    });
});


function getStudentId(student_id) {
    var result = confirm("Want to delete record?");
    var student_id = "id=" + student_id;
    if (result) {

        $.post('include/process.php?action=deleteStudent', student_id, function(resp) {
            if (resp['status'] == true) {
                $("#row_num_" + student_id).html('');
                $("#success-msg").html(resp['msg']);
                $("#success-msg").show();
            } else {
                $("#error-msg").html(htm);
                $("#error-msg").show();
            }
        }, 'json');
    }
}