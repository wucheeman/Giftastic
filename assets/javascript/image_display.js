// Builds image display html so it can be sent to the
// render function in app.js

    const makeImageDisplay = (htmlArray) => {
      // takes array of html-wrapped images and converts to html ready for display
      console.log("in makeImageDisplay");
      const rowPairs = [];
      for (i = 0; i < htmlArray.length; i+=3) {
        gifs = htmlArray.slice(i, i + 3);
        console.log("output of loop is: " + gifs);
        rowPairs.push(makeRowPair(gifs));
      }
      return rowPairs;
    }

    const makeRowPair = (gifs) => {
      // pairs together a rating row and an image row
      // TODO (future) brittle; refactor when time permits
      console.log("in makeRowPair");
      if (gifs.length === 3) {
        console.log("making regular length row pair");
        const ratingRow = makeRatingRow();
        const imageRow = makeImageRow(gifs);
        return ratingRow + imageRow;
      }
      else if (gifs.length === 1) {
        console.log("making short row pair");
        const ratingRow = makeShortRatingRow();
        const imageRow = makeShortImageRow(gifs);
        return ratingRow + imageRow;
      }
      else {
        console.log("makeRowPair has unsupported gif array length");
      }
    }

    const makeImageRow = (gifs) => {
      // takes an array of gifs and converts to a bootstrap row of images
      const newRow = `
          <div class="row">
            <div class="col-sm-4 mb-3">
              ${gifs[0]}
            </div>
            <div class="col-sm-4 mb-3>
              ${gifs[1]}
            </div>
            <div class="col-sm-4 mb-3">
              ${gifs[2]}
            </div>
          </div>
        `
      return newRow;
    }

    const makeShortImageRow = (gifs) => {
      // takes an array of gifs and converts to a bootstrap row of images
      const newRow = `
          <div class="row">
            <div class="col-sm-4 mb-3">
              ${gifs[0]}
            </div>
            <div class="col-sm-4 mb-3">
            </div>
            <div class="col-sm-4 mb-3">
            </div>
          </div>
        `
      return newRow;
    }

    const makeRatingRow = () => {
      // displays ratings
      // TODO: fill in with actual ratings
      console.log("in makeRatingRow()");
      const ratingRow = `
      <div class="row">
        <div class="col-sm-4 mt-3">
          <p>Rating:</p>
        </div>
        <div class="col-sm-4 mt-3">
          <p>Rating:</p>
        </div>
        <div class="col-sm-4 mt-3">
          <p>Rating:</p>
        </div>
      </div>
      `
      console.log('rating row is ' + ratingRow);
      return ratingRow;
    }

    const makeShortRatingRow = () => {
      // displays ratings
      // TODO: fill in with actual ratings
      const ratingRow = `
      <div class="row">
        <div class="col-sm-4 mt-3">
          <p>Rating:</p>
        </div>
        <div class="col-sm-4 mt-3">
        </div>
        <div class="col-sm-4 mt-3">
        </div>
      </div>
      `
      return ratingRow;
    }
