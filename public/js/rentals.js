$(document).ready(function () {

    let fill_form =  function (renter_data) {
         $('#firstName').val(renter_data.firstName);
        $('#lastName').val(renter_data.lastName);
        $('#inputAddress').val(renter_data.address);
        $('#inputCity').val(renter_data.city);
        $('#inputState').val(renter_data.state);
        $('#inputZip').val(renter_data.zipcode);
        $('#inputLicense').val(renter_data.license);
        $('#rentalDate').val(renter_data.rentalDate);
        switch (renter_data.skierType) {
            case '1':
                $('#skierType1').prop('checked', true);
                break;
            case '2':
                $('#skierType2').prop('checked', true);
                break;
            case '3':
                $('#skierType3').prop('checked', true);
                break;
        }
        $('#inputWeight').val(renter_data.weight);
        $('#inputHeightFt').val(renter_data.heightFt);
        $('#inputHeightIn').val(renter_data.heightIn);
        $('#inputAge').val(renter_data.age);
        $('#inputShoeSize').val(renter_data.bootSize);
        $('#inputSex').val(renter_data.gender);
        switch (renter_data.skiSchool) {
            case 'Yes':
                $('#skiSchoolYes').prop('checked', true);
                break;
            case 'No':
                $('#skiSchoolNo').prop('checked', true);
                break;

        }
    };

    let fetch_rentals = function() {
        $.ajax(
            '/rentals/open_rentals'
        ).done((data) => {
            $.each(data, (i, rental) => {
                let new_rental = $('#' + rental.license);
                if (!new_rental.length) {
                    let val = rental.firstName + ' ' + rental.lastName;
                    let btn = $('<input/>').attr({
                        type : 'button',
                        class: 'btn-block btn-info btn-lg open-rentals',
                        id: rental.license,
                        'data-toggle': 'modal',
                        'data-target': '#equipmentModal',
                        value : val,
                    });
                    $('#rentalsReceived')
                        .append(btn)
                        .on('click', new_rental, (e) => {
                            fill_form(rental)
                        });
                }
            });
            setTimeout(fetch_rentals, 5000);
        });
    };

    fetch_rentals();
});
