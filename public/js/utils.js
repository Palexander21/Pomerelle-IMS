$(document).ready(function () {

    $('.date-updated').html('Updated ' + new Date().toISOString().split('T')[0]);
    $('#inputPhone').inputmask({"mask": "(999)-999-9999"})
});
