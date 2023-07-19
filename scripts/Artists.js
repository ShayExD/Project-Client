function initArtist(){
        renderHeader();
        renderRightHeader();
        const api = `https://localhost:7087/api/Song/GetAllArtists`
        ajaxCall("GET", api, "", successrenderAllartists, errorrenderAllartists);
        return false;

}

function successrenderAllartists(ListOfArtists){
console.log(ListOfArtists);
}

function errorrenderAllartists(err){
    console.log(err);
    }

