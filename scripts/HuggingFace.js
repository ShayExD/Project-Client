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