// Your JavaScript (your_script.js)
const apiKey = '35a874403974c410da6243eed29981c4';

function init() {

    renderHeader() 
    renderRightHeader()
}

function toggleMenu() {
    const menuItems = document.getElementById('ul');
    menuItems.classList.toggle('show-menu');
}

function getSongImage(songName) {
    const clientId = "06ed096e179541bbbc6fab42caafca10";
    const clientSecret = "f7094c042025414c994d4e5620a03222";
    const auth = btoa(`${clientId}:${clientSecret}`);

    // Step 1: Get the access token from Spotify API
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    })
        .then(response => response.json())
        .then(tokenResponse => {
            const access_token = tokenResponse.access_token;

            // Step 2: Search for the track (song)
            fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
                .then(response => response.json())
                .then(searchResponse => {
                    const tracks = searchResponse.tracks;

                    if (!tracks || !tracks.items || tracks.items.length === 0) {
                        console.error("Song not found or no image available.");
                        return;
                    }

                    const trackId = tracks.items[0].id;

                    // Step 3: Get track (song) details
                    fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${access_token}`,
                        },
                    })
                        .then(response => response.json())
                        .then(trackDetails => {
                            if (!trackDetails || !trackDetails.album || !trackDetails.album.images || trackDetails.album.images.length === 0) {
                                console.error("Song not found or no image available.");
                                return;
                            }

                            let img = document.getElementById("img");
                            img.src = trackDetails.album.images[0].url;
                            console.log(trackDetails.album.images[0].url);
                        })
                        .catch(error => {
                            console.error("Error fetching track details:", error);
                        });
                })
                .catch(error => {
                    console.error("Error fetching track data:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching Spotify access token:", error);
        });
}



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
            a7.textContent = "Admin";
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
    const userIcon = "👤";
    let DivHeader = document.getElementById("Homeheader")
    let DivUser = document.createElement('div');
    DivUser.className = "user";
    let pUser = document.createElement('p');
    pUser.className = "email";
    pUser.innerHTML = userIcon + JSON.parse(localStorage.getItem('logged user')).email;
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
