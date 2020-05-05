$(document).ready(function () {
    let table = $.fn.createTable('#kitchenDataTable', {saveState: true}, 0);
    $('#createBtn').on('click', function (e) {
        e.preventDefault();
        let data = $('#kitchenForm').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        $.ajax({
            url: '/api/v3/pos/kitchen',
            data: data,
            type: 'POST',
            success: function (res) {
                table.row.add([
                    data.name,
                    data.quantity,
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
    $('#update').on('click', function () {
        let selected = $.fn.get_selected();
        $.ajax({
            url: `/api/v3/pos/kitchen/${selected}`,
            type: 'GET',
            success: function (res) {
                $('#update_name').val(res.name);
                $('#update_quantity').val(res.quantity);
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
            url: `/api/v3/pos/kitchen/${selected}`,
            data: data,
            type: 'PUT',
            success: function (res) {
                console.log(res)
                tds[0].textContent = `${res.item.name}`;
                tds[1].textContent = `${res.item.quantity}`;
                tds[2].textContent = `${res.item.price.toFixed(2)}`;
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
    $('#del').on('click', ( function () {
        let selected = $.fn.get_selected();
        $('#delMsg').html(`Are you sure you want to delete <strong>${selected}</strong>?`);
    })) ;
    $('#deleteBtn').on('click', function (e) {
        e.preventDefault();
        let selected = $.fn.get_selected();
        $.ajax({
            url: `/api/v3/pos/kitchen/${selected}`,
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