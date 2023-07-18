
function SubmitLogin() {
    let email = $("#email").val()
    let password = $("#password").val()
   const api = `https://localhost:7087/api/Users/logIn?email=${email}`
    ajaxCall("POST", api, JSON.stringify(password), successSubmitLogin, errorSubmitLogin);
    return false;
}

function successSubmitLogin(data) {
    console.log("check");
    localStorage.setItem("User", JSON.stringify(data));
    swal("Loged In Successfuly", "Great Job", "success");
    window.location.href = "Home.html"
}

function errorSubmitLogin(err) {
    swal("Account doesnt exsist", "try again", "error");
}


$(document).ready(function () {
    $('#formLogin').submit(SubmitLogin);
})
