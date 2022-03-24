function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index] != undefined ? values[index].replace(/^["']/, '').replace(/["']$/, '') : values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
}

fetch('./assets/data/hiking.csv')
  .then(response => response.text())
  .then(data => {
    let result = csvToArray(data, delimiter = ";");

    for (let i in result) {
        let item = result[i]

        if (i > 0) {
            $(".panel-copy").first().clone().appendTo("#wrapper");
        }

        let currentTile = $(".panel-copy").last()
        currentTile.find(".hiking-title").text(item.name)
        currentTile.find(".hiking-description").text(item.description);

        currentTile.find(".hiking-image").attr("src", item.imgUrl);

        currentTile.find(".hiking-date").text(item.date);
        currentTile.find(".hiking-distance").text(item.distance);
        currentTile.find(".hiking-duration").text(item.duration);
        currentTile.find(".hiking-place").text(item.place);
        currentTile.find(".hiking-time").text(item.appointmentPlace);
        currentTile.find(".hiking-departure").text(item.appointmentHour);

        currentTile.find(".hiking-form-link").attr("href", item.formUrl);
        currentTile.find(".hiking-details-link").attr("href", item.hikingUrl);
    }
});