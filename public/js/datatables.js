$(document).ready(function () {
    let selected;
    let tds;
    $.fn.createTable = function(selector, opts, col_idx) {
        let table = $(selector).DataTable(opts);
        $(`${selector} tbody`)
            .on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('.update-btn, .delete-btn')
                        .addClass('disabled')
                        .attr('disabled', true);
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('.update-btn, .delete-btn')
                        .removeClass('disabled')
                        .attr('disabled', false);
                }
                let $row = $(this).closest("tr"),
                    $tds = $row.find("td");
                selected = $tds[col_idx].textContent;
                tds = $tds;
                console.log($tds);
                console.log(selected);

            })
            .on('mouseenter', 'tr', function () {
                $(this).toggleClass('highlighted');
            })
            .on('mouseleave', 'tr', function () {
                $(this).toggleClass('highlighted');
            });
        return table;
    }
    $.fn.get_selected = function () {
        return selected;
    }
    $.fn.get_tds = function () {
        return tds;
    }
});