$(document).ready(function () {
    let items;
    let opts = {
        animate: true,
        verticalMargin: 5,
        float: true,
        disableDrag: true,
        disableResize: true,
    }
    let page,
        grid
    ;
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
        sessionStorage.setItem(`${page}-line-items`, JSON.stringify($('.line-items')[0].innerHTML));
        console.debug("session saved")
    }
    $.fn.loadSession = function () {
        items = sessionStorage.getItem(`${page}-line-items`);
        items = JSON.parse(items)
        $('.line-items').append(items)
        $.fn.updateTotal();
    }
    let config_items;
    $.fn.loadConfig = function (config) {
        config_items = JSON.parse(config)
        config_items.forEach(el => {
            let id = `#${el.id}`
            $(id).attr('data-gs-x', el.x)
            $(id).attr('data-gs-y', el.y)
            $(id).attr('data-gs-width', el.w)
            $(id).attr('data-gs-height', el.h)
            $(id).attr('data-gs-x', el.x)
        })

        grid = GridStack.init(opts);
    }

    $.ajax({
        url: `/api/v3/pos/configuration/${page}-dashboard`,
        method: 'GET',
        success: function (res) {
            $.fn.loadConfig(res.config)
        },
        error: function (res) {
            $('.toast-body').html(res.responseJSON.msg)
            $('.toast').toast('show')
            grid = GridStack.init(opts);
        }
    });
    if (sessionStorage.getItem(`${page}-line-items`))
        $.fn.loadSession();
})

