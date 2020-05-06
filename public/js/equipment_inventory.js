$(document).ready(function () {
    let table = $.fn.createTable('#equipmentDataTable', {saveState: true}, 4);
    $('#createBtn').on('click', function (e) {
        e.preventDefault();
        let data = $('#equipmentForm').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        $.ajax({
            url: '/api/v3/equipment/',
            data: data,
            type: 'POST',
            success: function (res) {
                table.row.add([
                    data.type,
                    data.last_used,
                    data.last_tune,
                    data.size,
                    data.number,
                ]).draw(false);
                $('#createModal').modal('hide');
                $('#completedMsg').html(res.msg);
                $('#completedModal').modal('show');
            },
            error: function (res) {
                console.error(res);
                $('#errmsg').html(res.statusText)
            }
        })
    });
    $('#update').on('click', function () {
        let selected = $.fn.get_selected();
        $.ajax({
            url: `/api/v3/equipment/${selected}`,
            type: 'GET',
            success: function (res) {
                $('#update_type').val(res.type);
                $('#update_last_used').val(res.last_used);
                $('#update_last_tune').val(res.last_tune);
                $('#update_size').val(res.size);
                $('#update_number').val(res.number);
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
        let selected = $.fn.get_selected();
        let tds = $.fn.get_tds();
        $.ajax({
            url: `/api/v3/equipment/${selected}`,
            data: data,
            type: 'PUT',
            success: function (res) {
                console.log(res)
                tds[0].textContent = `${res.equipment.type}`;
                tds[1].textContent = `${res.equipment.last_used}`;
                tds[2].textContent = `${res.equipment.last_tune}`;
                tds[3].textContent = `${res.equipment.size}`;
                tds[4].textContent = `${res.equipment.number}`;
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
    $('#ticketDel').on('click', ( function () {
        let selected = $.fn.get_selected();
        $('#delMsg').html(`Are you sure you want to delete <strong>${selected}</strong>?`);
    })) ;
    $('#deleteBtn').on('click', function (e) {
        e.preventDefault();
        let selected = $.fn.get_selected();
        $.ajax({
            url: `/api/v3/equipment/${selected}`,
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