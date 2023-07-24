// Your JavaScript (your_script.js)
const apiKey = '35a874403974c410da6243eed29981c4';

function init() {


}

//function toggleMenu() {
//    const menuItems = document.getElementById('ul');
//    menuItems.classList.toggle('show-menu');
//}

//function getSongImage(songName) {
//    const clientId = "06ed096e179541bbbc6fab42caafca10";
//    const clientSecret = "f7094c042025414c994d4e5620a03222";
//    const auth = btoa(`${clientId}:${clientSecret}`);

//    // Step 1: Get the access token from Spotify API
//    fetch("https://accounts.spotify.com/api/token", {
//        method: "POST",
//        headers: {
//            "Authorization": `Basic ${auth}`,
//            "Content-Type": "application/x-www-form-urlencoded",
//        },
//        body: "grant_type=client_credentials",
//    })
//        .then(response => response.json())
//        .then(tokenResponse => {
//            const access_token = tokenResponse.access_token;

//            // Step 2: Search for the track (song)
//            fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
//                method: "GET",
//                headers: {
//                    "Authorization": `Bearer ${access_token}`,
//                },
//            })
//                .then(response => response.json())
//                .then(searchResponse => {
//                    const tracks = searchResponse.tracks;

//                    if (!tracks || !tracks.items || tracks.items.length === 0) {
//                        console.error("Song not found or no image available.");
//                        return;
//                    }

//                    const trackId = tracks.items[0].id;

//                    // Step 3: Get track (song) details
//                    fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
//                        method: "GET",
//                        headers: {
//                            "Authorization": `Bearer ${access_token}`,
//                        },
//                    })
//                        .then(response => response.json())
//                        .then(trackDetails => {
//                            if (!trackDetails || !trackDetails.album || !trackDetails.album.images || trackDetails.album.images.length === 0) {
//                                console.error("Song not found or no image available.");
//                                return;
//                            }

//                            let img = document.getElementById("img");
//                            img.src = trackDetails.album.images[0].url;
//                            console.log(trackDetails.album.images[0].url);
//                        })
//                        .catch(error => {
//                            console.error("Error fetching track details:", error);
//                        });
//                })
//                .catch(error => {
//                    console.error("Error fetching track data:", error);
//                });
//        })
//        .catch(error => {
//            console.error("Error fetching Spotify access token:", error);
//        });
//}


//let SongName;
//let ArtistName;
//function renderSendToYouTube(SongName, ArtistName) {
//    SongName = "fever aerosmith" + " " + ArtistName;

//    const ApiKey = 'AIzaSyDkTyAGAo5-OEvE8-kLh6ryO9aFq-y2We4';
//    const api = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(SongName)}&type=video&key=${ApiKey}`
//    ajaxCall("GET", api, "", successrenderSendToYouTube, errorrenderSendToYouTube);
//    return false;
//}

//function successrenderSendToYouTube(data) {

//    const songInfo = [];
//    for (const item of data.items) {
//        if (item.id.kind === 'youtube#video') {

//                const videoTitle = item.snippet.title;
//                const artistName = videoTitle.split(' - ')[0];
//                const videoId = item.id.videoId;
//                const videoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

//            songInfo.push({ title: videoTitle, thumbnail: videoThumbnail, url: videoUrl, artist: artistName });
//            }

//    }
//    console.log(songInfo);
//    //console.log(songInfo[0].thumbnail);
//    /*  window.open(songInfo[0].url, "_blank");*/

//}





//function errorrenderSendToYouTube(err) {
//    alert("problem");
//}




//function getSongUrl(songName, apiKey) {
//    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(songName)}&type=video&key=${apiKey}`;

//    return fetch(url)
//        .then(response => response.json())
//        .then(data => {
//            const songUrls = [];
//            data.items.forEach(item => {
//                if (item.id.kind === 'youtube#video') {
//                    const videoId = item.id.videoId;
//                    songUrls.push(`https://www.youtube.com/watch?v=${videoId}`);
//                }
//            });
//            return songUrls;
//        });
//}

function renderTextToLyrics() {
    let text = document.getElementById("TextIn").value;
    if (text != "") {
        const api = `https://juliensimon-song-lyrics.hf.space/run/predict`
        const objectToSend = {
            data: [text]
        }
        ajaxCall("POST", api, JSON.stringify(objectToSend), successrenderTextToLyrics, errorrenderTextToLyrics);
        return false;
    }
    else {
        let p = document.getElementById("OutPut");
        p.innerHTML = "";
    }

}

function successrenderTextToLyrics(data) {
    let p = document.getElementById("OutPut");
    console.log(data.data[0]);
    p.innerHTML = data.data[0]
}


function errorrenderTextToLyrics(err) {
    alert("problem");
}


