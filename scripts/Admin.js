
let divTable;
let AllFavorites=[];
let AllUsers=[];
let count=0;

let AllUsersWithFavoritesSongs=[];


function initTable(){
}


function initInformation(){
    const api = `https://localhost:7087/api/Users/getAllUsers`;
    ajaxCall("GET", api, "", successGetAllUsers, errorGetAllUsers);

    const api = `https://localhost:7087/api/Users/getAllUsers`;
    ajaxCall("GET", api, "", successGetAllUsers, errorGetAllUsers);

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

  

function artistsInformation(){
    clearDivTable('Artists Information');






}

function songsInformation(){
    clearDivTable('Songs Information');




}


