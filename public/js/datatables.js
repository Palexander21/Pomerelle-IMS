$(document).ready(function () {
    let table = $(".data-table").DataTable();
    let selected;
    $('.data-table tbody')
        .on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
                $('#employeeDel')
                    .addClass('disabled')
                    .attr('disabled', true);
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#employeeDel')
                    .removeClass('disabled')
                    .attr('disabled', false);
            }
            let $row = $(this).closest("tr"),
                $tds = $row.find("td");
            selected = $tds[1].textContent;

        })
        .on( 'mouseenter', 'tr', function () {
            $(this).toggleClass('highlighted');
        })
        .on( 'mouseleave', 'tr', function () {
            $(this).toggleClass('highlighted');
        });

    $('#employeeDel').on('click', ( function () {
        $('#delMsg').html(`Are you sure you want to delete <strong>${selected}</strong>?`);
    })) ;

    $('#createBtn').on('click', function (e) {
        e.preventDefault();
        let data = $('#registerForm').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        $.ajax({
            url: '/api/v3/users/create',
            data: data,
            type: 'POST',
            success: function (res) {
                table.row.add([
                    `${data.firstName} ${data.lastName}`,
                    data.username,
                    data.startDate,
                    data.position
                ]).draw(false);
                $('#createModal').modal('hide');
                $('#completedMsg').html(res.msg);
                $('#completedModal').modal('show');
            },
            error: function (res) {
                console.error(res);
                $('#errmsg').html(res.responseJSON.msg)
            }
        })
    });
    $('#deleteBtn').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: `/api/v3/users/delete/${selected}`,
            type: 'DELETE',
            success: function (res) {
                $('#deleteModal').modal('hide');
                $('#completedMsg').html(res.msg);
                $('#completedModal').modal('show');
                table.row('.selected').remove().draw( false );
            },
            error: function (res) {
                console.error(res);
                $('#err').html(res.responseJSON.msg);

            }
        })

    })


});