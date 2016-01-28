$(document).ready(function() {
    fullscreen('body');
    //Listen to Window Resize
    var $resize = $(window).resize(function () { fullscreen(null); });

    $("#exploreInfo").click(function() {
      $("#exploreInfoParagraph").toggle();
    });
});

function fullscreen(name) {
    $(name).addClass('fullscreen');
    $('.fullscreen').css({
        width: $(window).width(),
        height: $(document).height()
    });
}


