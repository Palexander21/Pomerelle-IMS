$(document).ready(function () {

    $('.open-rentals').click( function (e) {
        let renter_data = rental_data.find(renter => renter.customer.license === e.target.id);
        $('#firstName').val(renter_data.customer.firstName);
        $('#lastName').val(renter_data.customer.lastName);
        $('#inputAddress').val(renter_data.customer.address);
        $('#inputPhone').val(renter_data.customer.phone);
        $('#inputCity').val(renter_data.customer.city);
        $('#inputState').val(renter_data.customer.state);
        $('#inputZip').val(renter_data.customer.zipcode);
        $('#inputLicense').val(renter_data.customer.license);
        $('#rentalDate').val(renter_data.customer.rentalDate);
        switch (renter_data.customer.skierType) {
            case 1:
                $('#skierType1').prop('checked', true);
                break;
            case 2:
                $('#skierType2').prop('checked', true);
                break;
            case 3:
                $('#skierType3').prop('checked', true);
                break;
        }
        $('#inputWeight').val(renter_data.customer.weight);
        $('#inputHeightFt').val(renter_data.customer.heightFt);
        $('#inputHeightIn').val(renter_data.customer.heightIn);
        $('#inputAge').val(renter_data.customer.age);
        $('#inputShoeSize').val(renter_data.customer.bootSize);
        $('#inputSex').val(renter_data.customer.gender);
        switch (renter_data.customer.skiSchool) {
            case 'Yes':
                $('#skiSchoolYes').prop('checked', true);
                break;
            case 'No':
                $('#skiSchoolNo').prop('checked', true);
                break;

        }
    });

    $('#inputBootNumber').on('focusout', () => {
        $.ajax({
            url: "/rentals/id-check",
            data: {
                'number': $('#inputBootNumber').val(),
            },
        }).done(data => {
            if (data !== 'success') {
                $('#inputBootNumber').addClass('invalid')
            }
            else
                $('#inputBootNumber').removeClass('invalid')
        })
    });

    $('#inputSkiNumber').on('focusout', () => {
        $.ajax({
            url: "/rentals/id-check",
            data: {
                'number': $('#inputSkiNumber').val(),
            },
        }).done(data => {
            if (data !== 'success') {
                $('#inputSkiNumber').addClass('invalid')
            }
            else
                $('#inputSkiNumber').removeClass('invalid')
        })
    });

    $('#inputPoleNumber').on('focusout', () => {
        if ($('#inputPoleNumber').val().length !== 0) {
            $.ajax({
                url: "/rentals/id-check",
                data: {
                    'number': $('#inputPoleNumber').val(),
                },
            }).done(data => {
                if (data !== 'success') {
                    $('#inputPoleNumber').addClass('invalid')
                } else
                    $('#inputPoleNumber').removeClass('invalid')
            })
        }
        else {
            $('#inputPoleNumber').removeClass('invalid')
        }
    });

});
