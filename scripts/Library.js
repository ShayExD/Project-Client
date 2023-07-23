

function init() { 
    renderHeader()
    renderRightHeader();

}


function search() {

    var selectElement = document.getElementById("searchOptions");
    var selectedValue = selectElement.value;
    if (selectedValue == "all") {
        renderSearchAllSongs();
    }
    if (selectedValue == "artist") {
        renderSearchByArtist();

    }
    if (selectedValue =="songName"){
        renderSearchBySongsName();
    }
    if (selectedValue == "lyrics") {
        renderSearchByLyrics();
    }
    

}


function renderSearchByArtist()
{
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/getSongsByArtist?artist=${inputInSearchBar}`
    ajaxCall("GET", api, "", successrenderSearchByArtist, errorrenderSearchByArtist);
    return false;
}

function successrenderSearchByArtist(data) {
    console.log(data);
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++){

        const card = document.createElement('div');
        card.classList.add('card');
    
        const nameElement = document.createElement('h3');
        nameElement.textContent = data[i].songName;
        card.appendChild(nameElement);
    
        const idElement = document.createElement('p');
        idElement.textContent = `Song ID: ${data[i].id}`;
        card.appendChild(idElement);
    
        const artistElement = document.createElement('p');
        artistElement.textContent = `Artist: ${data[i].artist}`;
        card.appendChild(artistElement);
    
    

        const lyricsBox = document.createElement('button');
        lyricsBox.textContent = "click for lyrics";
        lyricsBox.classList.add('AllButtons');
        lyricsBox.onclick = function() {
             window.open("lyrics.html","_blank");
             localStorage.setItem("lyrics", JSON.stringify(data[i]));
        }

        card.appendChild(lyricsBox);

        let check = JSON.parse(localStorage.getItem('logged user'))
        console.log(check)

        if (check != null) {
            if (check.email != "") {
                const Favbtn = document.createElement('button');
                Favbtn.textContent = "Add To Favorite";
                Favbtn.classList.add('AllButtons');
                Favbtn.onclick = function () {
                    AddToFavorite(data[i].id)
                }
                card.appendChild(Favbtn);
            }
        }

        cardContainer.appendChild(card);
    }


    
}

function errorrenderSearchByArtist(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}

function renderSearchBySongsName() {
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/getSongsBySongName?songName=${inputInSearchBar}`
    ajaxCall("GET", api, "", successrenderSearchBySongsName, errorrrenderSearchBySongsName);
    return false;
}

function successrenderSearchBySongsName(data) {
    console.log(data);
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const card = document.createElement('div');
        card.classList.add('card');

        const nameElement = document.createElement('h3');
        nameElement.textContent = data[i].songName;
        card.appendChild(nameElement);

        const idElement = document.createElement('p');
        idElement.textContent = `Song ID: ${data[i].id}`;
        card.appendChild(idElement);

        const artistElement = document.createElement('p');
        artistElement.textContent = `Artist: ${data[i].artist}`;
        card.appendChild(artistElement);



        const lyricsBox = document.createElement('button');
        lyricsBox.textContent = "click for lyrics";
        lyricsBox.classList.add('AllButtons');
        lyricsBox.onclick = function () {
            window.open("lyrics.html", "_blank");
            localStorage.setItem("lyrics", JSON.stringify(data[i]));
        }

        card.appendChild(lyricsBox);

        let check = JSON.parse(localStorage.getItem('logged user'))
        console.log(check)

        if (check != null) {
            if (check.email != "") {
                const Favbtn = document.createElement('button');
                Favbtn.textContent = "Add To Favorite";
                Favbtn.classList.add('AllButtons');
                Favbtn.onclick = function () {
                    AddToFavorite(data[i].id)
                }
                card.appendChild(Favbtn);
            }
        }


        cardContainer.appendChild(card);
    }



}

function errorrrenderSearchBySongsName(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}


function renderSearchAllSongs() {
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/GetAllSongs`
    ajaxCall("GET", api, "", successrenderSearchAllSongs, errorrenderSearchAllSongs);
    return false;
}

function successrenderSearchAllSongs(data) {
    console.log(data);
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const card = document.createElement('div');
        card.classList.add('card');

        const nameElement = document.createElement('h3');
        nameElement.textContent = data[i].songName;
        card.appendChild(nameElement);

        const imgSong = document.createElement('img');
        imgSong.id=data[i].songName;
        console.log(data[i].songName);
        getSongImage(data[i].songName);
        card.appendChild(imgSong);

        const idElement = document.createElement('p');
        idElement.textContent = `Song ID: ${data[i].id}`;
        card.appendChild(idElement);

        const artistElement = document.createElement('p');
        artistElement.textContent = `Artist: ${data[i].artist}`;
        card.appendChild(artistElement);



        const lyricsBox = document.createElement('button');
        lyricsBox.textContent = "click for lyrics";
        lyricsBox.classList.add('AllButtons');
        lyricsBox.onclick = function () {
            window.open("lyrics.html", "_blank");
            localStorage.setItem("lyrics", JSON.stringify(data[i]));
        }

        card.appendChild(lyricsBox);

        let check = JSON.parse(localStorage.getItem('logged user'))

        if (check != null) {
            if (check.email != "") { 
            const Favbtn = document.createElement('button');
            Favbtn.textContent = "Add To Favorite";
            Favbtn.classList.add('AllButtons');
            Favbtn.onclick = function () {
                AddToFavorite(data[i].id)
            }
                card.appendChild(Favbtn);
            }
        }

        cardContainer.appendChild(card);
    }



}

function errorrenderSearchAllSongs(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}


function renderSearchByLyrics() {
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    alert(inputInSearchBar);
    const api = `https://localhost:7087/api/Song/getSongsByLyrics?lyrics=${inputInSearchBar}`
    ajaxCall("GET", api, "", successrenderSearchByLyrics, errorrrenderSearchByLyrics);
    return false;
}

function successrenderSearchByLyrics(data) {
    console.log(data);
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const card = document.createElement('div');
        card.classList.add('card');

        const nameElement = document.createElement('h3');
        nameElement.textContent = data[i].songName;
        card.appendChild(nameElement);

        const idElement = document.createElement('p');
        idElement.textContent = `Song ID: ${data[i].id}`;
        card.appendChild(idElement);

        const artistElement = document.createElement('p');
        artistElement.textContent = `Artist: ${data[i].artist}`;
        card.appendChild(artistElement);



        const lyricsBox = document.createElement('button');
        lyricsBox.textContent = "click for lyrics";
        lyricsBox.classList.add('AllButtons');
        lyricsBox.onclick = function () {
            window.open("lyrics.html", "_blank");
            localStorage.setItem("lyrics", JSON.stringify(data[i]));
        }

        card.appendChild(lyricsBox);

        let check = JSON.parse(localStorage.getItem('logged user'))
        console.log(check)

        if (check != null) {
            if (check.email != "") {
                const Favbtn = document.createElement('button');
                Favbtn.textContent = "Add To Favorite";
                Favbtn.classList.add('AllButtons');
                Favbtn.onclick = function () {
                    AddToFavorite(data[i].id,data[i].artist)
                }
                card.appendChild(Favbtn);
            }
        }

        cardContainer.appendChild(card);
    }



}

function errorrrenderSearchByLyrics(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}


function AddToFavorite(idSong,NameOfArtist) {
    let idUser = JSON.parse(localStorage.getItem('logged user')).id;
     const api = `https://localhost:7087/api/Users/addToFavorite?idUser=${idUser}&idSong=${idSong}`
    ajaxCall("POST", api, "", successAddToFavorite, errorAddToFavorite);
    return false;
}

function successAddToFavorite(data) {
    if (data == true) {
        swal("Song Added to Favorite", "", "success");
    }
    else {
        swal("Song already exist in Favorite", "", "success");
    }


}

function errorAddToFavorite(err) {
    swal("Something wrong", "try again", "error");
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

                            let img = document.getElementById(songImage);
                            if(trackDetails.album.images[0].url!=null){
                            img.src = trackDetails.album.images[0].url;
                            img.src = `${trackDetails.album.images[0].url}`;
                            console.log(trackDetails.album.images[0].url);
                            }
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

//function init() {
 //   getSongImage("Falling In Love")

//}



