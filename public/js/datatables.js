$(document).ready(function () {
    let table = $(".data-table").DataTable();
    $('.data-table tbody')
        .on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
                $('#deleteBtn').addClass('disabled');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#deleteBtn').removeClass('disabled');
            }
            let $row = $(this).closest("tr"),
                $tds = $row.find("td");

            // $.each($tds, function() {
            //     console.log($(this).text() + " ");
            // });
        })
        .on( 'mouseenter', 'tr', function () {
            $(this).toggleClass('highlighted');
        })
        .on( 'mouseleave', 'tr', function () {
            $(this).toggleClass('highlighted');
        });

    // $('#employeeAdd')
    //     .on('click', () => {
    //         window.location.href = "/admin/users/register";
    //     })


});