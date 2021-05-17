$(document).ready(function () {
    var url = 'https://relaismaddalena.com/secure_booking';
    /*var iconUser = "<span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-user fa-stack-1x fa-inverse'></i></span>";
    var iconReservation = "<span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-calendar fa-stack-1x fa-inverse'></i></span>";
    var iconLastReservation = "<span class='fa-stack'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-hotel fa-stack-1x fa-inverse'></i></span>";*/
    var iconUser = "<i class='fa fa-key'></i>";
    var iconReservation = "";
    var iconLastReservation = "";
    var ElinaForm = "<form style='' action='" + url + "/Users/Log-in' id='loginForm' method='post' novalidate='novalidate'><p>Sign in to manage your account</p></div><div><label for='username'>Email address:</label><input autocomplete='off' class='inputFields form-control' data-val='true' data-val-required='This field is required.' id='Username' name='Username' placeholder='Please type your email address' type='text' value=''></div><div><label for='password'>Password:</label><input autocomplete='off' class='inputFields form-control' data-val='true' data-val-required='This field is required.' id='Password' name='Password' placeholder='Please type your password' type='password'></div><span class='loginError field-validation-error' style='display: none;'></span><div><div class='fieldElina bookButtonElina'><input id='loginButton' class='btn btn-primary pSubmit' type='submit' value='Submit'></div></div></form>";
    var placeholder = $("#elinaLoginFE");

    $.ajax({
        type: "GET",
        url: url + '/Users/LoginStatus',
        dataType: "jsonp",
        callback: "callback",
        success: function (response) {
            if (response.Success == true) {
                placeholder.append("<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + iconUser + " Welcome, " + response.Data.title + " " + response.Data.firstname + "<span class='caret'></span></a><ul class='dropdown-menu'><li class='navbar-text navbar-left'><a href='" + url + "/GuestLounge/Dashboard/Index'>" + iconReservation + "Your Lounge </a></li><li class='navbar-text navbar-left'><a href='" + url + "/GuestLounge/Bookings/Index'>" + iconReservation + "Your Bookings </a></li></ul></ul>");
                placeholder.show();
            } else {
                placeholder.append("<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + iconUser + "Login <span class='caret'></span></a><ul class='dropdown-menu'>" + ElinaForm + "</ul></li>");
                placeholder.show();
            }
        }
    });
});