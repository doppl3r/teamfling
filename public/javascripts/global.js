$(document).ready(function() {
    fullscreen('body');
    //Listen to Window Resize
    var $resize = $(window).resize(function () { fullscreen(null); });
});

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUserDiv input').each(function(index, val) {
        if($(this).val() === '') { 
            errorCount++;
            console.log('error count -- ' + errorCount); 
        }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        //var roles = $('#addUserDiv input#inputRoles').
        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUserDiv input#inputUserName').val(),
            'password': $('#addUserDiv input#inputPassword').val(),
            'firstname': $('#addUserDiv input#inputFirstName').val(),
            'lastname': $('#addUserDiv input#inputLastName').val(),
            'role': $('#addUserDiv input#inputRole').val(),
            'description': $('#addUserDiv input#inputDescription').val()
        }

        console.log('new user -- ' + newUser.firstname);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/register',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUserDiv input').val('');
                $('#inputRole').prop('checked', false);

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function fullscreen(name) {
    $(name).addClass('fullscreen');
    $('.fullscreen').css({
        width: $(window).width(),
        height: $(document).height()
    });
}


