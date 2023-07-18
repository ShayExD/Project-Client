function initLibrary() { 
    renderSongs();   
}

function renderSongs() {
    const api = `https://localhost:7087/api/Song/GetAllSongs`
    ajaxCall("GET", api, "", successrenderSongs, errorrenderSongs);
    return false;
}

function successrenderSongs(data) {
    console.log(data);
    let result = document.getElementById("renderSearch");
    result="";
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
        document.getElementById("renderSearch").appendChild(cardDiv);
    }
}

function errorrenderSongs(err) {
    swal("Something wrong", "try again", "error");
}


function search() {

    var selectElement = document.getElementById("searchOptions");
    var selectedValue = selectElement.value;
    if(selectedValue=="artist"){
        renderSearchByArtist();

    }
    if(selectedValue=="all"){
        renderSongs();
    }
    

}


function renderSearchByArtist()
{
    let searchBar = document.getElementById("searchBar");
    let inputInSearchBar = searchBar.value;
    alert(inputInSearchBar);
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
    
        cardContainer.appendChild(card);
    }


    
}

function errorrenderSearchByArtist(err) {
    swal("Something wrong", "try again", "error");
}