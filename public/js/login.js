$(document).ready(function () {

    $('#login-btn').on('click', function (e) {
        e.preventDefault();
        let username = $('#inputUsername').val();
        let password = $('#inputPassword').val();
        $.ajax({
            url: '/api/v3/users/login',
            data: {
                username: username,
                password: password
            },
            type: 'post',
            success: function () {
                window.location.href = '/';
            },
            error: function (data) {
                $('#warning').html(data.responseJSON.msg)
            }
        })
    })

});