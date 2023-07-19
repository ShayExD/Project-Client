const apiKey = '35a874403974c410da6243eed29981c4';


function initArtist(){
    renderHeader();
    let check = JSON.parse(localStorage.getItem('logged user'))
    console.log(check)
    const ul = document.getElementById("ul");
    if (check != null) {
        if (check.email != "") {
            renderRightHeader();
        }
    }
        const api = `https://localhost:7087/api/Song/GetAllArtists`
        ajaxCall("GET", api, "", successrenderAllartists, errorrenderAllartists);
        return false;

}

function successrenderAllartists(ListOfArtists){
    console.log(ListOfArtists);
    cardContainer.innerHTML = "";
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
            const cardContainer = document.getElementById('cardContainer');
                const card = document.createElement('div');
                card.classList.add('card');

                const nameElement = document.createElement('h3');
                nameElement.textContent = response.artist.name;
                card.appendChild(nameElement);


                const lyricsBox = document.createElement('button');
                lyricsBox.textContent = "click for Data";
                lyricsBox.classList.add('AllButtons');
                lyricsBox.onclick = function () {
                    window.open("ArtistData.html", "_blank");
                    localStorage.setItem("artist", JSON.stringify(response.artist));
                }

                card.appendChild(lyricsBox);


                cardContainer.appendChild(card);
            
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

  
