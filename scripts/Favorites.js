
function init() {
    renderHeader();
    renderRightHeader();
    renderFavoriteSongs()
}

function renderFavoriteSongs() {
    let userId = JSON.parse(localStorage.getItem('logged user')).id;
    const api = `https://localhost:7087/api/Users/userFavoriteSongs?idUser=${userId}`
    ajaxCall("GET", api, "", successrenderFavoriteSongs, errorrenderFavoriteSongs);
    return false;
}

function successrenderFavoriteSongs(data) {
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
                Favbtn.textContent = "Delete From Favorite";
                Favbtn.classList.add('AllButtons');
                Favbtn.onclick = function () {
                    DeleteFromFavorite(data[i].id)
                }
                card.appendChild(Favbtn);
            }
        }

        cardContainer.appendChild(card);
    }



}

function errorrenderFavoriteSongs(err) {
    swal("Something wrong", "try again", "error");
}


function DeleteFromFavorite(idSong) {
    let idUser = JSON.parse(localStorage.getItem('logged user')).id;
    const api = `https://localhost:7087/api/Users/deleteSongFromFavorite?idUser=${idUser}&idSong=${idSong}`
    ajaxCall("POST", api, "", successDeleteFromFavorite, errorDeleteFromFavorite);
    return false;
}

function successDeleteFromFavorite(data) {
    if (data == true) {
        swal("Song Deleted From Favorite", "", "success");
        window.location.href ="Favorites.html"
    }
    else {
        swal("Song doesnt exist in Favorite", "", "success");
    }


}

function errorDeleteFromFavorite(err) {
    swal("Something wrong", "try again", "error");
}