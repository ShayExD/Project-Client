//import { createSong,createUser,createArtist } from './Models';
//import { ajaxCall } from './ajaxCalls';

function init() { 
    renderSongs();   
}

function renderSongs() {
    const api = `https://localhost:7087/api/Song/GetAllSongs`
    ajaxCall("GET", api, "", successrenderSongs, errorrenderSongs);
    return false;
}

function successrenderSongs(data) {
    console.log(data);
    for (let i = 0; i < 4; i++)
    {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('card-content');
        const titleElement = document.createElement('h3');
        titleElement.classList.add('card-title');
        titleElement.textContent = 'Song: ' + data[i].songName;
        const artistElement = document.createElement('p');
        artistElement.classList.add('card-artist');
        artistElement.textContent = 'Artist: '+data[i].artist;
        
        const idElement = document.createElement('p');
        idElement.classList.add('card-id');
        idElement.textContent = 'ID:' + data[i].id;

        const lyricsheader = document.createElement("h1");
        lyricsheader.classList.add('card-lyricsheader');
        lyricsheader.textContent = "lyrics:";
        const lyrics = document.createElement('textarea');
        lyrics.classList.add('card-lyrics');
        lyrics.rows = "10";
        lyrics.cols = "200";
        lyrics.textContent = data[i].lyrics;

        cardContentDiv.appendChild(idElement);
        cardContentDiv.appendChild(titleElement);
        cardContentDiv.appendChild(artistElement);      
        cardContentDiv.appendChild(lyricsheader);
        cardContentDiv.appendChild(lyrics);
        cardDiv.appendChild(cardContentDiv);
        document.getElementById("container").appendChild(cardDiv);
    }
}

function errorrenderSongs(err) {
    swal("Something wrong", "try again", "error");
}

function search() {
    const radioButtons = document.getElementsByName('o');
    let selectedGender;

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedGender = radioButtons[i].value;
            break;
        }
    }

    if (selectedGender == "artist")
    {
        renderSearchByArtist();
    }
}

function renderSearchByArtist()
{
    let x = document.getElementById("search");
    let text = x.value;
    alert(text);
    const api = `https://localhost:7087/api/Song/getSongsByArtist?artist=${text}`
    ajaxCall("GET", api, "", successrenderSearchByArtist, errorrenderSearchByArtist);
    return false;
}
function successrenderSearchByArtist(data) {
    console.log(data);
    let result = document.getElementById("renderSearch");
    result.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('card-content');
        const titleElement = document.createElement('h3');
        titleElement.classList.add('card-title');
        titleElement.textContent = 'Song: ' + data[i].songName;
        const artistElement = document.createElement('p');
        artistElement.classList.add('card-artist');
        artistElement.textContent = 'Artist: ' + data[i].artist;

        const idElement = document.createElement('p');
        idElement.classList.add('card-id');
        idElement.textContent = 'ID:' + data[i].id;

        const lyricsheader = document.createElement("h1");
        lyricsheader.classList.add('card-lyricsheader');
        lyricsheader.textContent = "lyrics:";
        const lyrics = document.createElement('textarea');
        lyrics.classList.add('card-lyrics');
        lyrics.rows = "10";
        lyrics.cols = "200";
        lyrics.textContent = data[i].lyrics;

        cardContentDiv.appendChild(idElement);
        cardContentDiv.appendChild(titleElement);
        cardContentDiv.appendChild(artistElement);
        cardContentDiv.appendChild(lyricsheader);
        cardContentDiv.appendChild(lyrics);
        cardDiv.appendChild(cardContentDiv);
        result.appendChild(cardDiv);
    }
}

function errorrenderSearchByArtist(err) {
    swal("Something wrong", "try again", "error");
}