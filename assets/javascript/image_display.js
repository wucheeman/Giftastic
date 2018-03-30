// Builds image display html so it can be sent to the
// render function in app.js

    const makeImageDisplay = (htmlArray) => {
      // takes array of html-wrapped images and converts to html ready for display

      // TODO make this DRY!
      const rowPairs = [];
      let gifs = [htmlArray[0], htmlArray[1], htmlArray[2]];
      rowPairs.push(makeRowPair(gifs));
      gifs = [htmlArray[3], htmlArray[4], htmlArray[5]];
      rowPairs.push(makeRowPair(gifs));
      gifs = [htmlArray[6], htmlArray[7], htmlArray[8]];
      rowPairs.push(makeRowPair(gifs));
      // TODO: update script to handle case of a show row
      gifs = [htmlArray[9]];
      rowPairs.push(makeRowPair(gifs));
      return rowPairs
    }

    const makeRowPair = (gifs) => {
      // pairs together a rating row and an image row
      console.log("in makeRowPair");
      const ratingRow = makeRatingRow();
      const imageRow = makeImageRow(gifs);
      return ratingRow + imageRow;
    }

    const makeImageRow = (gifs) => {
      // takes an array of gifs and converts to a bootstrap row of images
      const newRow = `
        <div class="row">
            <div class="col-sm-4 bg-primary">
              ${gifs[0]}
            </div>
            <div class="col-sm-4 bg-primary">
              ${gifs[1]}
            </div>
            <div class="col-sm-4 bg-primary">
              ${gifs[2]}
            </div>
          </div>
        `
      return newRow;
    }

    const makeRatingRow = () => {
      // displays ratings
      // TODO: fill in with actual ratings
      const ratingRow = `
      <div class="row">
        <div class="col-sm-4 mt-3 bg-warning">
          <p>Rating:</p>
        </div>
        <div class="col-sm-4 mt-3 bg-warning">
          <p>Rating:</p>
        </div>
        <div class="col-sm-4 mt-3 bg-warning">
          <p>Rating:</p>
        </div>
      </div>
      `
      return ratingRow;
    }

