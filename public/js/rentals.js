$(document).ready(function () {
    console.log(rental_data);

    $('.open-rentals').click( function (e) {
        console.log(e.target.id);
        let renter_data = rental_data.find(renter => renter.license === e.target.id);
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
    })
});
