// let ajax_req = function(endpoint, options) {
//     options = options || {};
//     let data = options.data || {};
//     let method = options.method || 'GET';
//
//     return $.ajax({
//         url: endpoint,
//         data: data,
//         type: method,
//     })
// };

// let check_form = function() {
//     $('.form').on('submit', function (e) {
//         $('[required]').each(function () {
//             var self = $(this)
//             var checked = (self.is(':checkbox') || self.is(':radio'))
//                 ? self.is(':not(:checked)') && $('input[name=' + self.attr('name') + ']:checked').length === 0
//                 : false
//             if (self.val() === '' || checked) {
//                 self.siblings('.form-error').show()
//                 e.preventDefault()
//                 return false;
//             } else {
//                 self.siblings('.form-error').hide()
//             }
//         })
//     })
//
//     $('input, textarea', '.form').on('blur change', function () {
//         var self = $(this)
//         var checked = (self.is(':checkbox') || self.is(':radio'))
//             ? self.is(':not(:checked)') && $('input[name=' + self.attr('name') + ']:checked').length === 0
//             : false
//
//         if (self.val() === '' || checked) {
//             self.siblings('.form-error').show()
//             return false
//         } else {
//             self.siblings('.form-error').hide()
//         }
//     })
//     return true;
// };

$(document).ready(function () {

    $('.date-updated').html('Updated ' + new Date().toISOString().split('T')[0]);

    $('#logout-btn').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/v3/users/logout',
            success: function (data){
                console.log(data);
                window.location.href = '/';
            },
            error: function (data) {
                console.error(data);
            }
        })
    });

});
