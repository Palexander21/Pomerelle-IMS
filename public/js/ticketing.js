$(document).ready(function () {
    let total = 0.00,
        tax_rate = 0.06;
    $('.item').on('click',function () {
        let val = $(this)[0].innerText
        $.ajax({
            url: `api/v3/tickets/${val}`,
            type: 'GET',
            success: function (data) {
                $('.line-items').append(`<li class="line-item" id="${val}" xmlns="http://www.w3.org/1999/html">
                                            <span class="item-span" onclick="$(this).removeItem(this)"> &times;</span>
                                            <span> ${val}</span>
                                            <input onchange="$(this).updateTotal()" class="item-price" value="${data.price.toFixed(2)}">
                                         </li>`)
                $.fn.updateTotal();
            },
            error: function (data) {
                console.error(data.responseJSON.message);
                $('.line-items').append(`<li class="line-item" id="${val}" xmlns="http://www.w3.org/1999/html">
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
        let subtotal = 0.00;
        $('.item-price').each(function () {
            subtotal += Number($(this).val());
            this.value = Number(this.value).toFixed(2)
        })
        let tax = subtotal * tax_rate;
        total = subtotal + tax;
        $('#subtotal').text(`Subtotal $${subtotal.toFixed(2)}`)
        $('#tax').text(`Tax (6%) $${tax.toFixed(2)}`)
        $('#total').text(`Total $${total.toFixed(2)}`)
    }

    $.fn.removeItem = function (element) {
        element.closest('li').remove();
        $.fn.updateTotal();
    }

})

