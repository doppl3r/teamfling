$(document).ready(function() {
    fullscreen('body');
    //Listen to Window Resize
    var $resize = $(window).resize(function () { fullscreen(null); });

    $('#exploreInfo').click(function() {
        $('#exploreInfoParagraph').toggle();
    });

    //TODO: NEED VALIDATION ON PROFILE, when update button is pushed USERNAME field cannot have a value of ''
});

function fullscreen(name) {
    $(name).addClass('fullscreen');
    $('.fullscreen').css({
        width: $(window).width(),
        height: $(document).height()
    });
}


