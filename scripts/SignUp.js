
function SubmitSignUp() {
        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var registrationDate = new Date().toUTCString();
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Registration Date:", registrationDate);
        let user = createUser(0, email, password, registrationDate);
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
          //  const api = `https://proj.ruppin.ac.il/cgroup23/test2/tar1/api/User/logIn?email=${email}`
            ajaxCall("POST", api, JSON.stringify(password), successSubmitLogin, errorSubmitLogin);
            return false;
        }

        function successSubmitLogin(data) {
            localStorage.setItem("User", JSON.stringify(data));
            swal("Sign Up Succeed", "Great Job", "success");
            window.location.href = "index.html"
        }

        function errorSubmitLogin(err) {
            swal("Something wrong", "try again", "error");
        }


        $(document).ready(function () {
            $('#formSignUp').submit(SubmitSignUp);
        })


    