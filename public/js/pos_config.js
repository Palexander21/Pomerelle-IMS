$(document).ready(function () {
    let items;
    let opts = {
        animate: true,
        verticalMargin: 5,
        float: true,
    }
    let grid = GridStack.init(opts);
    let page;
    if (window.location.href.indexOf('ticketing') !== -1)
        page = 'tickets';
    else if (window.location.href.indexOf('kitchen') !== -1)
        page = 'kitchen';
    else if (window.location.href.indexOf('kitchen') !== -1)
        page = 'rentals';
    $('.item').on('click',function () {
        let val = $(this)[0].innerText
        $.ajax({
            url: `api/v3/pos/${page}/${val}`,
            type: 'GET',
            success: function (data) {
                $('.line-items').append(`<li class="line-item" id="${val}">
                                            <span class="item-span" onclick="$(this).removeItem(this)"> &times;</span>
                                            <span> ${val}</span>
                                            <input onchange="$(this).updateTotal()" class="item-price" value="${data.price.toFixed(2)}">
                                         </li>`)
                $.fn.updateTotal();
            },
            error: function (data) {
                console.error(data.responseJSON.message);
                $('.line-items').append(`<li class="line-item" id="${val}">
                                            <span class="item-span" onclick="$(this).removeItem(this)"> &times;</span>
                                            <span> ${val}</span>
                                            <input onchange="$(this).updateTotal()" class="item-price" value="0.00">
                                         </li>`)
            }
        })
    })
    $('#cancel-btn').on('click', function () {
        $('.line-item').remove();
        $.fn.updateTotal();
    })
    $.fn.updateTotal = function () {
        let total = 0.00;
        $('.item-price').each(function () {
            total += Number($(this).val());
            this.value = Number(this.value).toFixed(2)
        })
        $('#total').text(`Total $${total.toFixed(2)}`)
        $.fn.saveSession();
    }

    $.fn.removeItem = function (element) {
        element.closest('li').remove();
        $.fn.updateTotal();
    }

    $.fn.saveSession = function () {
        sessionStorage.setItem('line-items', JSON.stringify($('.line-items')[0].innerHTML));
        console.debug("session saved")
    }

    $.fn.loadSession = function () {
        items = sessionStorage.getItem('line-items');
        items = JSON.parse(items)
        $('.line-items').append(items)
        $.fn.updateTotal();
    }

    if (sessionStorage.getItem('line-items'))
        $.fn.loadSession();
})

