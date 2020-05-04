$(document).ready(function () {
    let table = $.fn.createTable('#ticketDataTable', {saveState: true}, 0);
    $('#createBtn').on('click', function (e) {
        e.preventDefault();
        let data = $('#ticketForm').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        $.ajax({
            url: '/api/v3/tickets',
            data: data,
            type: 'POST',
            success: function (res) {
                table.row.add([
                    data.ticket,
                    data.price,
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
    $('#ticketUpdate').on('click', function () {
        let selected = $.fn.get_selected();
        $.ajax({
            url: `/api/v3/tickets/${selected}`,
            type: 'GET',
            success: function (res) {
                $('#update_ticket').val(res.ticket);
                $('#update_price').val(res.price.toFixed(2));
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
            url: `/api/v3/tickets/${selected}`,
            data: data,
            type: 'PUT',
            success: function (res) {
                console.log(res)
                tds[0].textContent = `${res.ticket.ticket}`;
                tds[1].textContent = `${res.ticket.price.toFixed(2)}`;
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
            url: `/api/v3/tickets/${selected}`,
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