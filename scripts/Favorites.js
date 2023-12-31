﻿
function initFavorite() {
    renderHeader();
    renderRightHeader();
    renderFavoriteSongs()
}

function renderFavoriteSongs() {
    let userId = JSON.parse(localStorage.getItem('logged user')).id;
    const api = `https://proj.ruppin.ac.il/cgroup23/test2/tar1/api/Users/userFavoriteSongs?idUser=${userId}`
    ajaxCall("GET", api, "", successrenderFavoriteSongs, errorrenderFavoriteSongs);
    return false;
}

function successrenderFavoriteSongs(data) {
    console.log(data);
    renderCards(data[JSON.parse(localStorage.getItem('logged user')).id],true);

}

function errorrenderFavoriteSongs(err) {
    swal("Something wrong", "try again", "error");
}


function DeleteFromFavorite(idSong) {

    let idUser = JSON.parse(localStorage.getItem('logged user')).id;
    const api = `https://proj.ruppin.ac.il/cgroup23/test2/tar1/api/Users/deleteSongFromFavorite?idUser=${idUser}&idSong=${idSong}`
    ajaxCall("DELETE", api, "", successDeleteFromFavorite, errorDeleteFromFavorite);
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