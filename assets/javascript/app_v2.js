// APP.JS

// GLOBAL VARIABLES
//===============================================================

let activities;

// GLOBAL OBJECTS
//===============================================================

// FUNCTIONS
// ==============================================================

const addButton = (newActivity) => {
  // adds a new button based on user's input
  // normalizes input t whitespace
  // does not add empty strings or repeats
  console.log("in addButton()");
  newActivity = cleanInput(newActivity);
  if (checkForDupsOrEmptyString(newActivity)) {
    console.log('ok to make a button');
    activities.push(newActivity);
    console.log(activities);
    // clear text input
    $('#button-input').val('');
    // initializeDisplay();
    var imgElements = makeButtons();
    render(imgElements, "#button-land", 'empty');
    alert('new button has been added');
  }
  else {
    // TODO: give warning in page, not in alert
    alert("Not a new activity!");
  }
}

const checkForDupsOrEmptyString = (newActivity) => {
  let userInputIsGood = true;
  // checks for duplicates or empty strng and returns false if one is found
  if (activities.includes(newActivity) || newActivity === "") {
    userInputIsGood = false;
  }
  return userInputIsGood;
}

const cleanInput = (newActivity) => {
  // cleans and normalizes input for new buttons
  console.log("in cleanInput()");
  return newActivity.trim().toLowerCase();

}

const clickHandler = (e) => {
  console.log("in clickHandler");
  // TODO: refactor to use switch (future?)
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
  else if (e.target.className === 'add-activity') {
    e.defaultPrevented;
    var newActivity = $("#button-input").val();
    console.log('newActivity is: ' + newActivity);
    addButton(newActivity);
  }
  else {
    console.log('not supposed to get here in clickHandler');

  }
}

const initializeGlobals = () => {
  activities = ['sleeping', 'studying', 'eating', 'drinking', 'walking', 'running', 'swimming', 'flying', 'driving', 'listening', 'thinking', 'sneezing', 'coughing', 'disagreeing', 'diving', 'sking', 'sledding', 'climbing'];
}

const initializeDisplay = () => {
  // lays out buttons using the activities array
  // TODO: in v2, adds form for additional buttons
  var imgElements = makeButtons();
  render(imgElements, "#button-land");
}

const main = () => {
  // initializes globals and display
  // enables app by calling $(document).on("click", clickHandler); to start processing
  console.log('in main()');
  // initializeGlobals();
  // initializeDisplay();
  $(document).on("click", clickHandler);
}

const makeButtons = () => {
  var imgElements = 0;
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

const makeRatingElement = (rating) => {
  return `<p>Rating: ${rating}</p>`;
}

const processResponse = (response) => {
  // takes API response object and makes URLs for display on page
  console.log("in processResponse()");
  let imgElements = [];
  let ratingsElements = [];
  for (var i = 0; i < 10; i++) {
    console.log("making URLs");
    const stillURL = response.data[i].images.fixed_height_still.url;
    console.log('stillURL is ' + stillURL);
    const animatedURL = response.data[i].images.fixed_height.url;
    console.log("animatedURL is " + animatedURL);
    const newImageHtml = makeImageElement(stillURL, animatedURL);
    console.log("newImageHtml is " + newImageHtml);
    imgElements.push(newImageHtml);
    const rating = response.data[i].rating;
    console.log('rating is: ' + rating);
    const newRatingElement = makeRatingElement(rating);
    console.log("new rating element is " + newRatingElement);
    ratingsElements.push(newRatingElement);
  }
  // add ratingsElements to display; requires work in image_display.js
  imgElements = makeImageDisplay(imgElements, ratingsElements);
  console.log("before calling render, imgElements is" + imgElements);
  render(imgElements, "#gify-land", 'empty');
}

const render = (imgElements, location, action) => {
  // updates screen at location with contents of imgElements after taking
  // the action, if one is specified;
  console.log("in render");
  // TODO: change this so it can do something besides empty?
  // TODO: use different argument type?
  if (action) {
    console.log("render has an action to take");
    $(location).empty();
  }
  for (i = 0; i < imgElements.length; i++) {
    $(location).append(imgElements[i]);
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

// $(document).ready(function() {
  console.log('Started');
  initializeGlobals();
  initializeDisplay();
  main();
// });


