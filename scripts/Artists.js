const apiKey = '35a874403974c410da6243eed29981c4';


function initArtist(){
        renderHeader();
        renderRightHeader();
        const api = `https://localhost:7087/api/Song/GetAllArtists`
        ajaxCall("GET", api, "", successrenderAllartists, errorrenderAllartists);
        return false;

}

function successrenderAllartists(ListOfArtists){
console.log(ListOfArtists);
for (let name of ListOfArtists){
    let artist = name;
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/',
        method: 'GET',
        data: {
          method: 'artist.getinfo',
          artist: artist,
          api_key: apiKey,
          format: 'json'
        },
        success: function(response) {
          // Log the response data to the console
          console.log(response);
        },
        error: function(error) {
          // Handle the error
          console.error(error);
        }
      });
}


}

function errorrenderAllartists(err){
    console.log(err);
    }

  
