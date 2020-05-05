$(document).ready(function () {
    let opts = {
        animate: true,
        verticalMargin: 5,
        float: true,
    }
    let grid = GridStack.init(opts);
    $.fn.saveState = function() {
        let items = [];

        $('.grid-stack-item.ui-draggable').each(function () {
            let $this = $(this);
            items.push({
                x: $this.attr('data-gs-x'),
                y: $this.attr('data-gs-y'),
                w: $this.attr('data-gs-width'),
                h: $this.attr('data-gs-height'),
                content: $('.grid-stack-item-content', $this).html()
            });
        });

        let data = JSON.stringify(items);
        localStorage.setItem('layout', data);
        // $.ajax({
        //     url: 'api/v3/admin/configure/kitchen',
        //     data: data,
        //     method: 'POST',
        //     success: function (res) {
        //
        //
        //     },
        //     error: function (res) {
        //
        //     }
        // })

    }
})