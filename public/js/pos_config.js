$(document).ready(function () {
    let items,
        grid,
        page,
        opts = {
            animate: true,
            verticalMargin: 5,
            float: true,
            draggable: true,
            alwaysShowResizeHandle: true,
    }
    ;
    if (window.location.href.indexOf('tickets') !== -1)
        page = 'tickets';
    else if (window.location.href.indexOf('kitchen') !== -1)
        page = 'kitchen';
    else if (window.location.href.indexOf('kitchen') !== -1)
        page = 'rentals';

    $('#saveBtn').on('click', function () {
        items = []
        $('.grid-stack-item.ui-draggable').each(function () {
            let $this = $(this);
            items.push({
                x: $this.attr('data-gs-x'),
                y: $this.attr('data-gs-y'),
                w: $this.attr('data-gs-width'),
                h: $this.attr('data-gs-height'),
                id: $this.attr('id'),
            });
            console.log(items)
        });

        $.fn.saveConfig();
    })

    $.fn.saveConfig = function () {
        sessionStorage.setItem(`${page}-dashboard`, JSON.stringify(items));
        let data = {
            config: JSON.stringify(items),
            id: `${page}-dashboard`
        }
        $.ajax({
            url: '/api/v3/pos/configuration',
            data: data,
            method: 'POST',
            success: function (res) {
                $('.toast-body').html(res.msg)
                $('.toast').toast('show')
            }
        })
    }

    $.fn.loadConfig = function (config) {
        items = JSON.parse(config)
        items.forEach(el => {
            let id = `#${el.id}`
            $(id).attr('data-gs-x', el.x)
            $(id).attr('data-gs-y', el.y)
            $(id).attr('data-gs-width', el.w)
            $(id).attr('data-gs-height', el.h)
            $(id).attr('data-gs-x', el.x)
        })

        grid = GridStack.init(opts);
        $('.grid-stack').addTouch();
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
            $('.grid-stack').addTouch();
        }
    });
})

