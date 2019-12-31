// window.addEventListener('load', function () {
//     FastClick.attach(document.body);
// }, false);
$('.tooltip').tooltipster({animationDuration: [250, 100], delay: [50, 100], distance: 0, interactive: true});
$('.tooltip-alt').tooltipster({animationDuration: [250, 100], delay: [50, 100], distance: 5, trigger: 'click'});
$.extend($.featherlight.defaults, {openSpeed: 200, closeSpeed: 200, closeOnClick: 'anywhere'});
$(document).on('keyup', '.faux-link', function (e) {
    if (e.which == 13 || e.which == 32)
        $(this).click();
});
$('.js-accordion').accordion();
var $root = $('html, body');
// $('a').click(function () {
//     var href = $.attr(this, 'href');
//     $root.animate({scrollTop: $(href).offset().top}, 600, function () {
//         window.location.hash = href;
//     });
//     return false;
// });
(function (el) {
    el.forEach(function (e) {
        var style = e.currentStyle || window.getComputedStyle(e, false),
            bi = style.backgroundImage.slice(4, -1).replace(/["|']/g, "");
        var img = new Image();
        img.onload = function () {
            e.classList.add('float-up');
        };
        img.src = bi;
    });
})(document.querySelectorAll('.title-area'));