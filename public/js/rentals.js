$(document).ready(function () {

    let socket = io({transports: ['websocket'], upgrade: false});
    $('#rentalForm').submit(function (e) {
        let values = $(this).serializeArray();
        e.preventDefault();
        $('#rentalModalCenter').modal('hide');
        socket.emit('new-rental', {values});
    });

    socket.on('update-rentals', data => {
        console.log(data);
        let dict = {};
        data.forEach(item => {
            dict[item.name] = item.value;
        });
        let name = dict.firstName + ' ' + dict.lastName;
        $('#rentalsReceived').append(
            `<button type="button" class="btn btn-info btn-lg btn-block">${name}</button>`
        )
    });

    socket.on('page-connect', () => {
        $('#rentalsReceived').empty();
    });
});
