$(document).ready(function () {

    $('.date-updated').html('Updated ' + new Date().toISOString().split('T')[0]);
    $('#inputPhone').inputmask({"mask": "(999)-999-9999"});

    $('#logout-btn').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/v3/users/logout',
            success: (data) => {
                console.log(data);
                window.location.href = '/';
            },
            error: (data) => {
                console.error(data);
            }
        })
    })
});
