import { createSong,createUser,createArtist } from './Models';
import { ajaxCall } from './ajaxCalls';


function SubmitLogin() {
    let email = $("#email").val()
    let password = $("#password").val()
   // const api = `https://proj.ruppin.ac.il/cgroup23/test2/tar1/api/User/logIn?email=${email}`
    ajaxCall("POST", api, JSON.stringify(password), successSubmitLogin, errorSubmitLogin);
    return false;
}

function successSubmitLogin(data) {
    localStorage.setItem("User", JSON.stringify(data));
    swal("Loged In Successfuly", "Great Job", "success");
    window.location.href = "index.html"
}

function errorSubmitLogin(err) {
    swal("Account doesnt exsist", "try again", "error");
}


$(document).ready(function () {
    $('#formLogin').submit(SubmitLogin);
})
