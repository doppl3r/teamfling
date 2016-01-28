$(document).ready(function() {
    fullscreen('body');
    //Listen to Window Resize
    var $resize = $(window).resize(function () { fullscreen(null); });

<<<<<<< HEAD
    $("#exploreInfo").click(function() {
      $("#exploreInfoParagraph").toggle();
=======
    $('#exploreInfo').click(function() {
        $('#exploreInfoParagraph').toggle();
>>>>>>> d0ff34091fc54931f921db832f172bf955624847
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


