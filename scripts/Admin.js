




let divTable;

////Users Global Variables
let AllFavorites=[];
let AllUsers=[];
let AllUsersWithFavoritesSongs=[];


////Songs Global Variables
let SongsAddedToFavorites=[];
let AllSongs=[];
let SongsNameWithCount=[];
let count=0;


////Artists Global Variables
let AllArtists=[];
let ArtistsAndCounts=[];
let FullDetailsArtists=[];




///---------------General Section--------------------


async function initInformation(){
    const apiUsers = `https://localhost:7087/api/Users/getAllUsers`;
    ajaxCall("GET", apiUsers, "", successGetAllUsers, errorGetAllUsers);

    const apiSongs = `https://localhost:7087/api/Song/GetAllSongs`;
    ajaxCall("GET", apiSongs, "", successGetAllSongs, errorGetAllSongs);

    const apiSongsFavorites = `https://localhost:7087/api/Song/getSongsCountInFavorite`;
    ajaxCall("GET", apiSongsFavorites, "", successGetSongsFavorites, errorGetSongsFavorites);

    const apiArtists = `https://localhost:7087/api/Song/GetAllArtists`;
    ajaxCall("GET", apiArtists, "", successGetAllArtists, errorGetAllArtists);

    const apiArtistsCount = `https://localhost:7087/api/Artists/getArtistCountInFavorite`;
    ajaxCall("GET", apiArtistsCount, "", successGetAllArtistsCount, errorGetAllArtistsCount);

    await wait(3000);
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loader(){
document.body.innerHTML="";
document.body.innerHTML=`<div id="loader">
<img src="../images/logo.png" alt="Spotify Admin Loading">
</div>`;
showLoader();
await initInformation();
hideLoader();



}


function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.body.innerHTML=`<header>
    <nav id="Homeheader" class="header navbar">
        <div class="menu-icon" onclick="toggleMenu()">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div class="logo"><img src="../images/logo.png"></div>

        <ul id="ul" class="menu menu-items">
            <li><a href="Home.html">Home</a></li>

        </ul>
    </nav>
</header>
<div style="text-align: center; color:white"><h1>Admin Interface</h1></div>

<div class="container">
    <ul class="selection-list">
      <li id="users-infoID" class="users-info"><i class="icon fas fa-user"></i>Users Information</li>
      <li id="songs-infoID" class="songs-info"><i class="icon fas fa-music"></i>Songs Information</li>
      <li id="artist-infoID"  class="artist-info"><i class="icon fas fa-microphone-alt"></i>Artists Information</li>
    </ul>
  </div>
<div id="WrapDiv"></div>`;


}




  async function initAdmin(){
    await loader();
    init();
    defineOnClicks();
}
    
function clearDivTable(Title){
        let WrapDiv=document.getElementById('WrapDiv');
        WrapDiv.innerHTML="";
        let divTableContainer=document.createElement('div');
        divTableContainer.id='containerToTableCheck';
        divTableContainer.classList.add('containerToTable');
        divTableContainer.innerHTML=`<h1>${Title}</h1>`;
        divTableContainer.innerHTML+=`<div id="userDataTableContainer"></div>`;
        WrapDiv.appendChild(divTableContainer);
        
}

function defineOnClicks(){
    let liUsers=document.getElementById('users-infoID');
    console.log(liUsers);
    liUsers.onclick= usersInformation;
    let liSongs=document.getElementById('songs-infoID');
    liSongs.onclick= songsInformation;
    let liArtists=document.getElementById('artist-infoID');
    liArtists.onclick= artistsInformation;
}



///----------------Song Section--------------------

function songsInformation(){
    clearDivTable('Songs Information');
    BuildObjectSongsWithCount();
    const table = $('<table>').addClass('display').appendTo('#userDataTableContainer');
    table.DataTable({
      data: SongsAddedToFavorites,
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'Song Name', data: 'SongName' },
        { title: 'Artist', data: 'artist' },
        { title: 'Count In Favorites', data: 'count' },
      ],
      "paging": false, // Disable pagination (you can enable it if needed)
      "searching": true // Enable searching
    });





}

function BuildObjectSongsWithCount(){
    console.log(SongsNameWithCount);
    SongsAddedToFavorites=[];
    for(let eachSong of SongsNameWithCount ){
        for(let song of AllSongs){
            if(eachSong.songName==song.songName && eachSong.artist==song.artist){
                let songWithCount=createSongWithCount(song.id,song.artist,song.songName,song.lyrics,eachSong.occurrenceInFav);
                SongsAddedToFavorites.push(songWithCount);
            }
        }

    }
    console.log(SongsAddedToFavorites);
}

function successGetSongsFavorites(songsWithCount){
    SongsNameWithCount=songsWithCount;
}

function errorGetSongsFavorites(err){
console.log(err);
}

 function successGetAllSongs(data){
    AllSongs=data;

}

function errorGetAllSongs(err){
    console.log(err);
}


///----------------Users Section--------------------


function usersInformation(){
    clearDivTable('Users Information');
    // Create the DataTable and insert it into the specific div
    const table = $('<table>').addClass('display').appendTo('#userDataTableContainer');
    table.DataTable({
      data: AllUsersWithFavoritesSongs,
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'UserName', data: 'username' },
        { title: 'Email', data: 'email' },
        { title: 'Registration Date', data: 'registrationDate' },
        { title: 'Favorite Songs', data: 'Favorites' },
      ],
      "paging": false, // Disable pagination (you can enable it if needed)
      "searching": true // Enable searching
    });
    
}

  function successGetAllUsers(data){
    for(user of data){
       const api = `https://localhost:7087/api/Users/userFavoriteSongs?idUser=${user.id}`;
        ajaxCall("GET", api, "", successGetFavoriteSongs, errorGetFavoriteSongs);
    }
    AllUsers=data;
    console.log(AllUsersWithFavoritesSongs);
}

 function successGetFavoriteSongs(DicFavSongs){
    console.log(DicFavSongs);
    let ListOfSongs=null;
    let ListOfNameSongs=[];
    let CorrectUser;
    for(let user of AllUsers){
        if(ListOfSongs!=null){
            break;
        }
        else{
            ListOfSongs= DicFavSongs[user.id];
            CorrectUser=user;
            console.log(CorrectUser);
        }
    }
    for(let song of ListOfSongs){
        ListOfNameSongs.push(song.songName);
    }
    let UserFavorite= createUserWithFavorites(CorrectUser.id,CorrectUser.email,CorrectUser.username,CorrectUser.registrationdate,ListOfNameSongs);
    AllUsersWithFavoritesSongs.push(UserFavorite);
    console.log(AllUsersWithFavoritesSongs);

}



function errorGetFavoriteSongs(err){
    console.log(err);

}

function errorGetAllUsers(err){
    console.log(err);

}


  ///----------------Artists Section--------------------


function artistsInformation(){
    clearDivTable('Artists Information');
    BuildObjectArtistsWithCount();
    const table = $('<table>').addClass('display').appendTo('#userDataTableContainer');
    table.DataTable({
      data: FullDetailsArtists,
      columns: [
        { title: 'Artist Name', data: 'artistName' },
        { title: 'Count In Favorites', data: 'count' },
      ],
      "paging": false, // Disable pagination (you can enable it if needed)
      "searching": true // Enable searching
    });




}

function BuildObjectArtistsWithCount(){
    FullDetailsArtists=[];
    for(let eachArtist of ArtistsAndCounts ){
        for(let artist of AllArtists){
            if(eachArtist.artistName==artist){
                let artistWithCount = createArtistWithCount(artist,eachArtist.occurrenceInFav)
                FullDetailsArtists.push(artistWithCount);
            }
        }

    }
    console.log(FullDetailsArtists);
}

function successGetAllArtists(data){
    AllArtists=data;
}

function errorGetAllArtists(err){
    console.log(err);
}

function successGetAllArtistsCount(data){
    ArtistsAndCounts=data;
    console.log(ArtistsAndCounts);
}

function errorGetAllArtistsCount(err){
    console.log(err);
}

