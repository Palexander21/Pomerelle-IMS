$(document).ready(function () {

    $('#inputPhone').inputmask({"mask": "(999)-999-9999"});
    $.ajax({
        url: '/api/v3/rentals/open/count',
        type: 'get',
        success: function (res) {
            $('#rental-count').html(`${res.data} New Rentals`);
        },
        error: function (res) {
            console.log(res.error);
        }
    });

    $.ajax({
        url: '/api/v3/rentals/returns/count',
        type: 'get',
        success: function (res) {
            $('#return-count').html(`${res.data} Waiting to Return`);
        },
        error: function (res) {
            console.log(res.error);
        }
    });


    $('#submit-btn').on('click', function (e) {
        e.preventDefault();
        let data = $('#rentalForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log(data);
        $.ajax({
            url: '/api/v3/rentals',
            data: data,
            type: 'post',
            success: function (res) {
                $('#rental-count').html(`${res.data} New Rentals`);
                $('.close').click();
                $('#rentalForm').each(function (){
                    this.reset();
                })
            },
            error: function (res) {
                console.log(res.error);
            }
        })
    })

});
