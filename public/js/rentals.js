$(document).ready(function () {

    $('.open-rentals').click( function (e) {
        let renter_data = rental_data.find(renter => renter.customer.license === e.target.id);
        console.log(renter_data);
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

    $('#inputBootNumber').bind('input', () => {
        checkID($('#inputBootNumber').val());
    });


    function checkID(id) {
        $.ajax(
            {
                url: "id-check",
                data: {
                    'bootNumber': id,
                },
                onSuccess: function (msg) {
                    console.log(msg);
                }
            }
        )
    }
});
