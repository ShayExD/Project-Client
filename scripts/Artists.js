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
        const api = `https://proj.ruppin.ac.il/cgroup23/test2/tar1/api/Song/GetAllArtists`
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

				const img = document.createElement('img');
				img.id = response.artist.name;
				img.classList.add('artistImgs');
				card.appendChild(img);


				getArtistImage(response.artist.name)
                const nameElement = document.createElement('h3');
                nameElement.textContent = response.artist.name;
                card.appendChild(nameElement);


				const pListeners = document.createElement('p');
                pListeners.textContent = "Listeners: "+response.artist.stats.listeners;
                card.appendChild(pListeners);

				const pPlayCount = document.createElement('p');
                pPlayCount.textContent = "Play Count: "+response.artist.stats.playcount;
                card.appendChild(pPlayCount);

				const pGeneres = document.createElement('p');
				pGeneres.style.color="white";
				pGeneres.style.marginTop="5px";
				let pTagString="Tags : ";
				for(let tag of response.artist.tags.tag){
					pTagString += tag.name+" ,";
				}
				pTagString=pTagString.slice(0, -1);
                pGeneres.textContent = pTagString;
                card.appendChild(pGeneres);

				const LastFmLink = document.createElement('button');
                LastFmLink.textContent = "To Last.Fm";
				LastFmLink.id = "LastFmButton";
                LastFmLink.classList.add('AllButtons');
                LastFmLink.onclick = function () {
                    window.open(response.artist.url, "_blank");
					
                }
                card.appendChild(LastFmLink);


                const MoreInfo = document.createElement('button');
                MoreInfo.textContent = "More Info";
                MoreInfo.classList.add('AllButtons');
                MoreInfo.onclick = function () {
                    window.open("ArtistData.html", "_blank");
					localStorage.setItem("artist", JSON.stringify(response.artist));
					localStorage.setItem("artistImg", img.src);
                }
                card.appendChild(MoreInfo);
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

  
//////////////////////////////////////////

function getArtistImage(artistName) {
	const clientId = "06ed096e179541bbbc6fab42caafca10";
	const clientSecret = "f7094c042025414c994d4e5620a03222";

	const auth = btoa(`${clientId}:${clientSecret}`);
	// Step 1: Get the access token
	$.ajax({
		type: 'POST',
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': `Basic ${auth}`
		},
		data: {
			'grant_type': 'client_credentials'
		},
		success: function (tokenResponse) {
			const access_token = tokenResponse.access_token;

			// Step 2: Search for the artist
			$.ajax({
				type: 'GET',
				url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
				headers: {
					'Authorization': `Bearer ${access_token}`
				},
				success: function (searchResponse) {
					const artists = searchResponse.artists;

					if (!artists || !artists.items || artists.items.length === 0) {
						console.error('Artist not found or no image available.');
						return;
					}

					const artistId = artists.items[0].id;

					// Step 3: Get artist details
					$.ajax({
						type: 'GET',
						url: `https://api.spotify.com/v1/artists/${artistId}`,
						headers: {
							'Authorization': `Bearer ${access_token}`
						},
						success: function (artistDetails) {
							if (!artistDetails || !artistDetails.images || artistDetails.images.length === 0) {
								console.error('Artist not found or no image available.');
								return;
							}

							let img = document.getElementById(artistName);
							img.src = `${artistDetails.images[0].url}`;

						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.error('Error fetching artist details:', textStatus, errorThrown);
						}
					});
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.error('Error fetching artist data:', textStatus, errorThrown);
				}
			});
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('Error fetching Spotify access token:', textStatus, errorThrown);
		}
	});
}