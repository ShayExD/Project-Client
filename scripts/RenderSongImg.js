

function renderSongImg() {

    let Song = JSON.parse(localStorage.getItem('lyrics'));
    SongName = Song.songName + " " + Song.artist;
    const ApiKey = 'AIzaSyDU8u0K0sYywLflfJenOOSWf1iIIrd68Z0';
    const api = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(SongName)}&type=video&key=${ApiKey}`
    ajaxCall("GET", api, "", successrenderSongImg, errorrenderSongImg);
    return false;
}

function successrenderSongImg(data) {

    const songInfo = [];
    for (const item of data.items) {
        if (item.id.kind === 'youtube#video') {

            const videoTitle = item.snippet.title;
            const artistName = videoTitle.split(' - ')[0];
            const videoId = item.id.videoId;
            const videoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            songInfo.push({ title: videoTitle, thumbnail: videoThumbnail, url: videoUrl, artist: artistName });
        }

    }
    console.log(songInfo);
    console.log(songInfo[0].thumbnail);
    let img = document.getElementById("SongImg");
    img.src = songInfo[0].thumbnail;
}



function errorrenderSongImg(err) {
    alert("problem");
}