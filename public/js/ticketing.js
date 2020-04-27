$(document).ready(function () {
    $('.item').on('click',function () {
        let val = $(this)[0].innerText
        $('.line-items').append(`<li class="line-item"><span class="item-span" onclick="removeItem(this)"> &times;</span> ${val} </li>`)
        // ajax request for prices
    })


})
function removeItem (element) {
    element.closest('li').remove()
}
