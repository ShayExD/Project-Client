

const createUser = (id, email, password, username, registrationDate) => ({ id, email, password, username, registrationDate});

//const createArtist = (id, artist, SongName, text) => ({ id, artist, SongName, text});

const createSong = (id, artist, SongName, text) => ({ id, artist, SongName, text});

//שיר עם כמה שמופיע במועדפים
const createSongWithCount = (id, artist, SongName, text, count ) => ({ id, artist, SongName, text,count});

//יוזר והשירים הפייבוריטים שלו
const createUserWithFavorites = (id, email, username, registrationDate,Favorites) => ({ id, email, username, registrationDate,Favorites});

const createArtistWithCount = (artistName,count) => ({ artistName,count});

function renderHeader() {
    let check = JSON.parse(localStorage.getItem('logged user'))
    console.log(check)
    const ul = document.getElementById("ul");
    if (check != null) {
        if (check.email != "admin@gmail.com") {
            const li4 = document.createElement('li');
            const a4 = document.createElement('a');
            a4.textContent = "Library";
            a4.href = "Library.html";
            li4.appendChild(a4);
            ul.appendChild(li4);

            const li5 = document.createElement('li');
            const a5 = document.createElement('a');
            a5.textContent = "Favorites";
            a5.href = "Favorites.html";
            li5.appendChild(a5);
            ul.appendChild(li5);

            const li6 = document.createElement('li');
            const a6 = document.createElement('a');
            a6.textContent = "Artists";
            a6.href = "Artists.html";
            li6.appendChild(a6);
            ul.appendChild(li6);
        }
        else {
            const li4 = document.createElement('li');
            const a4 = document.createElement('a');
            a4.textContent = "Library";
            a4.href = "Library.html";
            li4.appendChild(a4);
            ul.appendChild(li4);

            const li5 = document.createElement('li');
            const a5 = document.createElement('a');
            a5.textContent = "Favorites";
            a5.href = "Favorites.html";
            li5.appendChild(a5);
            ul.appendChild(li5);

            const li6 = document.createElement('li');
            const a6 = document.createElement('a');
            a6.textContent = "Artists";
            a6.href = "Artists.html";
            li6.appendChild(a6);
            ul.appendChild(li6);


            const li7 = document.createElement('li');
            const a7 = document.createElement('a');
            a7.textContent = "Interface Admin";
            a7.href = "Admin.html";
            li7.appendChild(a7);
            ul.appendChild(li7);
        }
    }
    else {
        const ul = document.getElementById("ul");
        const li1 = document.createElement('li');
        const a1 = document.createElement('a');
        a1.textContent = "Login";
        a1.href = "Login.html";
        li1.appendChild(a1);
        ul.appendChild(li1);

        const li2 = document.createElement('li');
        const a2 = document.createElement('a');
        a2.textContent = "Sign Up";
        a2.href = "SignUp.html";
        li2.appendChild(a2);
        ul.appendChild(li2);


        const li3 = document.createElement('li');
        const a3 = document.createElement('a');
        a3.textContent = "Library";
        a3.href = "Library.html";
        li3.appendChild(a3);
        ul.appendChild(li3);

        const li4 = document.createElement('li');
        const a4 = document.createElement('a');
        a4.textContent = "Artists";
        a4.href = "Artists.html";
        li4.appendChild(a4);
        ul.appendChild(li4);


    }
}

function renderRightHeader() {
    ///-User at right side-///
    let DivHeader = document.getElementById("Homeheader")
    let DivUser = document.createElement('div');
    DivUser.className = "user";
    let pUser = document.createElement('p');
    pUser.className = "email";
    pUser.innerHTML = "User Name: " + JSON.parse(localStorage.getItem('logged user')).username;
    DivUser.appendChild(pUser);
    let aLogout = document.createElement('a');
    aLogout.className = "AllButtons";
    aLogout.textContent = "logout";
    aLogout.href = "Home.html";
    aLogout.onclick = function () {
        localStorage.setItem('logged user', null);
    }
    DivUser.appendChild(aLogout);
    DivHeader.appendChild(DivUser);

}



