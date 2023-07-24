//import { createSong,createUser,createArtist } from './Models';
//import { ajaxCall } from './ajaxCalls';





function SubmitSignUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var registrationDate = new Date().toUTCString();
    let user = createUser(0, email, password, username, registrationDate);
     console.log(user);
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        const api = `https://localhost:7087/api/Users/SignUp`;
            ajaxCall("POST", api, JSON.stringify(user), successSubmitSignUp, errorSubmitSignUp);
            return false;
        }

function successSubmitSignUp(data) {
    console.log(data);
    if (data != null){
                localStorage.setItem("logged user", JSON.stringify(data));
                swal("Sign Up Succeed", "Great Job", "success");
                window.location.href = "Home.html"
            }
            if(data==null){
                swal("User Already Exist", "try another", "error");
            }
        }

        function errorSubmitSignUp(err) {
            swal("Something wrong", "try again", "error");
        }


        $(document).ready(function () {
            $('#formSignUp').submit(SubmitSignUp);
        })


    