/*export * from './Module.js';*/

const createUser = (id, email, password, registrationDate) => ({ id, email, password, registrationDate});

//const createArtist = (id, artist, SongName, text) => ({ id, artist, SongName, text});

const createSong = (id, artist, SongName, text) => ({ id, artist, SongName, text});


export * from './Module.js';