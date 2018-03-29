// APP.JS

// GLOBAL VARIABLES
//===============================================================

let activities;

// GLOBAL OBJECTS
//===============================================================

// FUNCTIONS
// ==============================================================
const clickHandler = (e) => {
  console.log("in clickHandler");
  console.log(e.target);
  console.log(e);
  if (e.target.className === 'activity') {
    console.log('found a button!');
    // call api and display the gifs
    console.log(e.target.id);
    search(e.target.id);
  }
  else if (e.target.className === 'gif'){
    // TODO: reduce verbosity during cleanup
    const element = $(e.target);
    console.log('in clickHandler: element = ' + element);
    toggleGif(element);
  }
  else {
    console.log('not supposed to get here in clickHandler');

  }
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
  for (var i = 0; i < activities.length; i++ ) {
    var button = `<button class="activity" id=${activities[i]}>${activities[i]}</button>`;
    buttons.push(button);
  }
  return buttons;
}

const makeImageElement = (stillURL, animatedURL) => {
  const newImageElement = `<img src="${stillURL}" data-still="${stillURL}" data-animate="${animatedURL}" data-state="still" class="gif">`
  return newImageElement;
}

const processResponse = (response) => {
  // takes API response object and makes URLs for display on page
  console.log("in processResponse()");
  const message = [];
  for (var i = 0; i < 10; i++) {
    console.log("making URLs");
    const stillURL = response.data[i].images.fixed_height_still.url;
    console.log('stillURL is ' + stillURL);
    const animatedURL = response.data[i].images.fixed_height.url;
    console.log("animatedURL is " + animatedURL);
    const newHTML = makeImageElement(stillURL, animatedURL);
    console.log("newHTML is " + newHTML);
    message.push(newHTML);
  }
  console.log("before calling render, message is" + message);
  render(message, "#gify-land", 'empty');
}

const render = (message, location, action) => {
  // updates screen at location with contents of message after taking
  // the action, if one is specified;
  console.log("in render");
  // TODO: change this so it can do something besides empty?
  // TODO: use different argument type?
  if (action) {
    console.log("render has an action to take");
    $(location).empty();
  }
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
      processResponse(response);
    });
}

// TODO
const toggleGif = (element) => {
  // toggles gif between static image and animated when gif is clicked
  console.log("in toggleGif");
  const STATE_STILL = "still";
  const STATE_ANIMATE = "animate";
        
  // $(".gif").on("click", function() {
  //   console.log("in ToggleGif's on-click");
    // const element = $(this);
    // console.log(element);
    const state = element.attr('data-state');
    console.log("state is now: " + state);
    console.log('the current image source is: ' + element.attr('src'));

    if (state === STATE_STILL) {
      console.log("toggling to animation");
      element.attr('src', element.attr('data-animate'));
      console.log('the image source has changed to be: ' + element.attr('src'));
      element.attr('data-state', STATE_ANIMATE);
      console.log("should be animated now");
    } else {
      console.log("toggling to still image");
      element.attr('src', element.attr('data-still'));
      console.log('the image source has changed to be: ' + element.attr('src'));
      element.attr('data-state', STATE_STILL);
    }
  // });
}

// GAME
//===============================================================

$(document).ready(function() {
  main();
});


