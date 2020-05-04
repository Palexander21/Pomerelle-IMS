$(document).ready(function () {
    let table = $.fn.createTable("#employeeDataTable", {stateSave: true}, 1);
    let _id;
    $('#employeeDel').on('click', ( function () {
        let selected = $.fn.get_selected();
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
    $('#employeeUpdate').on('click', function () {
        let selected = $.fn.get_selected();
        $.ajax({
            url: `/api/v3/users/user/${selected}`,
            type: 'GET',
            success: function (res) {
                $('#update_firstName').val(res.firstName);
                $('#update_lastName').val(res.lastName);
                $('#update_username').val(res.username);
                $('#update_position').val(res.position);
                $('#update_type').val(res.role);
                $('#update_startDate').val(res.startDate);
                _id = res._id;
            },
            error: function (res) {
                console.error(res);
                $('#errmsg-update').html(res.msg)
            }
        })
    });
    $('#updateBtn').on('click', function (e) {
        e.preventDefault();
        let data = $('#updateForm').serializeArray().reduce(function (obj, item) {
            let name = item.name.replace('update_', '');
            obj[name] = item.value;
            return obj;
        }, {});
        let tds = $.fn.get_tds();
        $.ajax({
            url: `/api/v3/users/update/${_id}`,
            data: data,
            type: 'PUT',
            success: function (res) {
                console.log(res.user);
                tds[0].textContent = `${res.user.firstName} ${res.user.lastName}`;
                tds[1].textContent = `${res.user.username}`;
                tds[2].textContent = `${res.user.startDate}`;
                tds[3].textContent = `${res.user.position}`;
                $('#updateModal').modal('hide');
                $('#completedMsg').html(res.msg);
                $('#completedModal').modal('show');
                $('#updateForm').each(function (){
                    this.reset();
                })
            },
            error: function (res) {
                console.error(res);
                $('#errmsg-update').html(res.msg);
            }
        })
    });
    $('#deleteBtn').on('click', function (e) {
        e.preventDefault();
        let selected = $.fn.get_selected();
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
                $('#err').html(res.msg);

            }
        })

    })
})