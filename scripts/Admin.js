




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


function initTable(){
}

function initInformation(){
    const apiUsers = `https://localhost:7087/api/Users/getAllUsers`;
    ajaxCall("GET", apiUsers, "", successGetAllUsers, errorGetAllUsers);

    const apiSongs = `https://localhost:7087/api/Song/GetAllSongs`;
    ajaxCall("GET", apiSongs, "", successGetAllSongs, errorGetAllSongs);

    const apiSongsFavorites = `https://localhost:7087/api/Song/getSongsCountInFavorite`;
    ajaxCall("GET", apiSongsFavorites, "", successGetSongsFavorites, errorGetSongsFavorites);

    const apiArtists = `https://localhost:7087/api/Song/GetAllArtists`;
    ajaxCall("GET", apiArtists, "", successGetAllArtists, errorGetAllArtists);

    const apiArtistsCount = `https://localhost:7087/api/Song/getArtistCountInFavorite`;
    ajaxCall("GET", apiArtistsCount, "", successGetAllArtistsCount, errorGetAllArtistsCount);

}

function initAdmin(){
    init();
    initTable();
    initInformation();
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
    SongsAddedToFavorites=[];
    for(let eachSong of SongsNameWithCount ){
        for(let song of AllSongs){
            if(eachSong.songName==song.songName){
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
    console.log(data);
    AllUsers=data;
    console.log(AllUsersWithFavoritesSongs);

}

 function successGetFavoriteSongs(FavSongs){
    let ListOfNameSongs=[];
    for(let Song of FavSongs){
        ListOfNameSongs.push(Song.songName);
    }
    let UserFavorite= createUserWithFavorites(AllUsers[count].id,AllUsers[count].email,AllUsers[count].username,AllUsers[count].registrationdate,ListOfNameSongs);
    AllUsersWithFavoritesSongs.push(UserFavorite);
    count++;

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

