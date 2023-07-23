

/////////-------------General Functions--------------////////////

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


function renderCards(data,flag){
    const cardContainer = document.getElementById('cardContainer');
    console.log(cardContainer);
    cardContainer.innerHTML = "";
    console.log("check");

    for (let i = 0; i < data.length; i++) {

        const card = document.createElement('div');
        card.classList.add('card');
        card.id='Id'+data[i].songName;

        const nameElement = document.createElement('h3');
        nameElement.textContent = data[i].songName;
        card.appendChild(nameElement);

        //const imgSong = document.createElement('img');
        //imgSong.id=data[i].songName;
        //console.log(data[i].songName);
        //getSongImage(data[i].songName);
        //card.appendChild(imgSong);

        const idElement = document.createElement('p');
        idElement.textContent = `Song ID: ${data[i].id}`;
        card.appendChild(idElement);

        const artistElement = document.createElement('p');
        artistElement.textContent = `Artist: ${data[i].artist}`;
        card.appendChild(artistElement);



        const lyricsBox = document.createElement('button');
        lyricsBox.textContent = "click for lyrics";
        lyricsBox.id='lyricButton';
        lyricsBox.classList.add('AllButtons');
        lyricsBox.onclick = function () {
            window.open("lyrics.html", "_blank");
            localStorage.setItem("lyrics", JSON.stringify(data[i]));
        }
        card.appendChild(lyricsBox);


        const youTubeBox = document.createElement("button");
        youTubeBox.classList.add('AllButtons');
        youTubeBox.id='YouTubeButton';
        const icon = document.createElement("i");
        icon.className = "fab fa-youtube";
        youTubeBox.onclick = function () {
            renderSendToYouTube(data[i].songName, data[i].artist)
        }
        const youTubeButtonText = document.createTextNode("YouTube");
        youTubeBox.appendChild(icon);
        youTubeBox.appendChild(youTubeButtonText);
        card.appendChild(youTubeBox);

        let UserFromLocal = JSON.parse(localStorage.getItem('logged user'))

        if (UserFromLocal != null) {
            if (UserFromLocal.email != "") { 
                if(!flag){
            const Favbtn = document.createElement('button');
            Favbtn.textContent = "Add To Favorite";
            Favbtn.id='FavoriteButton';
            Favbtn.classList.add('AllButtons');
            Favbtn.onclick = function () {
                AddToFavorite(data[i].id)
            }
                card.appendChild(Favbtn);
            }
            else{
                const Favbtn = document.createElement('button');
                Favbtn.textContent = "Delete From Favorite";
                Favbtn.id='FavoriteButton';
                Favbtn.classList.add('AllButtons');
                Favbtn.onclick = function () {
                    DeleteFromFavorite(data[i].id);
                }
                    card.appendChild(Favbtn);

            }
        }
        }

        cardContainer.appendChild(card);
    }
}


/////////-------------SearchByArtist Functions--------------////////////

function renderSearchByArtist()
{
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/getSongsByArtist?artist=${inputInSearchBar}`
    ajaxCall("GET", api, "", successrenderSearchByArtist, errorrenderSearchByArtist);
    return false;
}

function successrenderSearchByArtist(data) {
    renderCards(data);
}

function errorrenderSearchByArtist(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}



/////////-------------SearchBySongsName Functions--------------////////////



function renderSearchBySongsName() {
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/getSongsBySongName?songName=${inputInSearchBar}`
    ajaxCall("GET", api, "", successrenderSearchBySongsName, errorrrenderSearchBySongsName);
    return false;
}

function successrenderSearchBySongsName(data) {
    renderCards(data,false);

}

function errorrrenderSearchBySongsName(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}



/////////-------------SearchAllSongs Functions--------------////////////



function renderSearchAllSongs() {
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/GetAllSongs`
    ajaxCall("GET", api, "", successrenderSearchAllSongs, errorrenderSearchAllSongs);
    return false;
}

function successrenderSearchAllSongs(data) {
    renderCards(data,false);
}

function errorrenderSearchAllSongs(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}



/////////-------------SearchByLyrics Functions--------------////////////



function renderSearchByLyrics() {
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    const api = `https://localhost:7087/api/Song/getSongsByLyrics?lyrics=${inputInSearchBar}`
    ajaxCall("GET", api, "", successrenderSearchByLyrics, errorrrenderSearchByLyrics);
    return false;
}

function successrenderSearchByLyrics(data) {
    renderCards(data,false);
}

function errorrrenderSearchByLyrics(err) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = "";
    swal("Something wrong", "try again", "error");
}


/////////-------------AddToFavorite Functions--------------////////////



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








