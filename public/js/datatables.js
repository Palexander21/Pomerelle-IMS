$(document).ready(function () {
    let table;
    let selected;
    let tds;
    table = $(".data-table").DataTable();
    $('.data-table tbody')
        .on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
                $('#employeeDel, #employeeUpdate')
                    .addClass('disabled')
                    .attr('disabled', true);
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#employeeDel, #employeeUpdate')
                    .removeClass('disabled')
                    .attr('disabled', false);
            }
            let $row = $(this).closest("tr"),
                $tds = $row.find("td");
            selected = $tds[1].textContent;
            tds = $tds;
            console.log($tds);
            console.log(selected);

        })
        .on( 'mouseenter', 'tr', function () {
            $(this).toggleClass('highlighted');
        })
        .on( 'mouseleave', 'tr', function () {
            $(this).toggleClass('highlighted');
        });
    $.fn.get_table = function () {
        return table;
    }
    $.fn.get_selected = function () {
        return selected;
    }
    $.fn.get_tds = function () {
        return tds;
    }
});