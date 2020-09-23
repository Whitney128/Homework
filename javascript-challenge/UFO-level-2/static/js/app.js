// from data.js
var tableData = data;
console.log(tableData);

var tbody = d3.select("tbody");
//form.on("submit", runEnter);

tableData.forEach(function(ufosighting) {
	console.log(ufosighting);
	var row = tbody.append("tr");

	Object.entries(ufosighting).forEach(function([key, value]) {
		console.log(key, value);
		var cell = row.append("td")
		cell.text(value);
	});
});

var button = d3.select("#button");
button.on("click", runEnter);
// YOUR CODE HERE!
