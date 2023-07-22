
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


							let img = document.getElementById("img");
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
	function init() {
		let a = "adele";
		getArtistImage(a);

    }
