// APP.JS

// GLOBAL VARIABLES
//===============================================================

let activities;

// GLOBAL OBJECTS
//===============================================================

// FUNCTIONS
// ==============================================================
const clickHandler = (e) => {
  // if click on button, passes 'e' to getGifs
  // if on Gif, calls toggleGifs
  // else logs (for now) and does nothing
  console.log("in clickHandler");
  console.log(e.target);
  // maybe brittle?
  console.log(e);
  if (e.target.className === 'activity') {
    console.log('found a button!');
    // call api and display the gifs
    console.log(e.target.id);
    search(e.target.id);
  }
  else {
    console.log('not supposed to get here in clickHandler');

  }
}

// TODO
const displayStaticGifs = () => {
  // interates through array created by processResponse 10 static images and sends them to render
  console.log("in displayGifs()");
}

// TODO
const getGifs = (e) => {
  // receives event from click
  // checks to see if we already have the GiFs; if yes, call displayStaticGifs
  // if no, call search with e.target.id, then processResponse, then displayStaticGifs
  console.log("in getGifs");
}

const initializeGlobals = () => {
  activities = ['sleeping', 'studying', 'eating', 'drinking', 'walking', 'running', 'swimming', 'flying', 'driving', 'listening', 'thinking', 'sneezing', 'coughing', 'disagreeing', 'diving', 'studying', 'sking', 'sledding', 'climbing'];
}

const initializeDisplay = () => {
  // TODO: lays out buttons using the activities array
  // creates buttons using template syntax
  // buttons share class 'activity' and have id=array item name
  // buttons not associated with gifs yet
  // calls render to drive display (?)

  // TODO: make fully dynamic and putting up buttons for all activities
  var message = makeButtons();
  render(message, "#button-land");
}

const main = () => {
  // initializes globals and display
  // enables app by calling $(document).on("click", clickHandler); to start processing
  console.log('Started');
  initializeGlobals();
  initializeDisplay();
  $(document).on("click", clickHandler);
}

const makeButtons = () => {
  var message = 0;
  var buttons = [];
  for (var i = 0; i < 2; i++ ) {
    var button = `<button class="activity" id=${activities[i]}>${activities[i]}</button>`;
    buttons.push(button);
  }
  return buttons;
}

const processResponse = (response) => {
  // takes API response object and pulls off animated and static Gifs
  // puts them in a two-d array that can be accessed by functions building display
  // maybe an object is better?
  // dimension 1 has indexVal (which can be used as an ID), static image and animated image
  // dimension 2 has dimension 1 arrays in order of activities
  console.log("in processResponse()");
}

const render = (message, location) => {
  // updates screen at location with contents of message
  console.log("in render");
  for (i = 0; i < message.length; i++) {
    $(location).append(message[i]);
  }
}

function search(search) {
  console.log("in search");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2iJQK64mjf8ANz5A14Gtwn09rOBldGhG&q=" + search;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // TODO: call processResponse and pass it the response; move functionality below
      response.data.forEach(function(giphy) {
        $("#gify-land").append( // TODO: need to change this out
        `<img src="${giphy.images.original.url}">`
        )
      });
    });
}

// TODO
const toggleGif = () => {
  // toggles gif between static image and animated when gif is clicked
  console.log("in toggleGif");
}

// GAME
//===============================================================

$(document).ready(function() {
  main();
});


