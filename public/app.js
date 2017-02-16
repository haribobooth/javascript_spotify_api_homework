var appendElements = function(){
  for(var i = 0; i < (arguments.length-1); i++){
    var child = arguments[i];
    var parent = arguments[i + 1];
    parent.appendChild(child)
  }
};

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open('GET', url);
  request.onload = callback;
  request.send();
};

var updateSearch = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var genreData  = JSON.parse(jsonString);
  var albumData = genreData.albums.items;
  var searchAlbums = [];
  var searchField = document.querySelector('#search-query');
  var searchString = searchField.value.toLowerCase();

  for(var album of albumData){
    // if(searchString.length > 0 &&
    //   (album.name.toLowerCase().substring(0, searchString.length) === searchString ||
    //    album.artists[0].name.toLowerCase().substring(0, searchString.length) === searchString) &&
    //    !(searchAlbums.includes(album))){
      searchAlbums.push(album);
    // }
  }

  populateResultsList(searchAlbums);
};

var populateResultsList = function(items){
  var previousElements = document.querySelectorAll('#albums li');
  var resultsList = document.querySelector('#albums');

  previousElements.forEach(function(element){
    resultsList.removeChild(element);
  });


  items.forEach(function(album){
    addAlbum(resultsList, album);
  });
};

var addAlbum = function(list, album){
  var li = document.createElement('li');
  var albumName = document.createElement('h1');
  var artistName = document.createElement('h2');
  var link = document.createElement('a');

  albumName.innerText = album.name;
  artistName.innerText = album.artists[0].name;
  link.href = "https://play.spotify.com/album/" + album.id;
  link.innerText = "Play album";

  appendElements(albumName, li);
  appendElements(artistName, li);
  appendElements(link, li);
  appendElements(li, list);
}

var updateSearchResults = function(){
  var url = "https://api.spotify.com/v1/search?q="+this.value+"&type=album";
  makeRequest(url, updateSearch);
};

var app = function(){
  var searchField = document.querySelector('#search-query');
  searchField.onkeyup = updateSearchResults;
};

// albums.items.name

window.onload = app;
