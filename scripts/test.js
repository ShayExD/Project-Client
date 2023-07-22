// Your JavaScript (your_script.js)
const apiKey = '35a874403974c410da6243eed29981c4';

function getSongImage(songName) {
    const clientId = "06ed096e179541bbbc6fab42caafca10";
    const clientSecret = "f7094c042025414c994d4e5620a03222";
    const auth = btoa(`${clientId}:${clientSecret}`);

    // Step 1: Get the access token from Spotify API
    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    })
        .then(response => response.json())
        .then(tokenResponse => {
            const access_token = tokenResponse.access_token;

            // Step 2: Search for the track (song)
            fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            })
                .then(response => response.json())
                .then(searchResponse => {
                    const tracks = searchResponse.tracks;

                    if (!tracks || !tracks.items || tracks.items.length === 0) {
                        console.error("Song not found or no image available.");
                        return;
                    }

                    const trackId = tracks.items[0].id;

                    // Step 3: Get track (song) details
                    fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${access_token}`,
                        },
                    })
                        .then(response => response.json())
                        .then(trackDetails => {
                            if (!trackDetails || !trackDetails.album || !trackDetails.album.images || trackDetails.album.images.length === 0) {
                                console.error("Song not found or no image available.");
                                return;
                            }

                            let img = document.getElementById("img");
                            img.src = trackDetails.album.images[0].url;
                            console.log(trackDetails.album.images[0].url);
                        })
                        .catch(error => {
                            console.error("Error fetching track details:", error);
                        });
                })
                .catch(error => {
                    console.error("Error fetching track data:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching Spotify access token:", error);
        });
}

function init() {
    getSongImage("I'm Not Sleeping")

}