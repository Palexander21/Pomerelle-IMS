$(document).ready(function () {
    let table = $(".data-table").dataTable();

    $('.data-table tbody')
        .on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            let $row = $(this).closest("tr"),
                $tds = $row.find("td");

            $.each($tds, function() {
                console.log($(this).text() + " ");
            });
        })
        .on( 'mouseenter', 'tr', function () {
            $(this).toggleClass('highlighted');
        })
        .on( 'mouseleave', 'tr', function () {
            $(this).toggleClass('highlighted');
        });

    $('#employeeAdd')
        .on('click', () => {
            window.location.href = "/register";
        })
});