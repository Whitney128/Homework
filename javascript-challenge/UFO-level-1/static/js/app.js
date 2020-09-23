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

//search bar
var button = d3.select("#button");
button.on("click", runEnter);

function runEnter() {

	//d3.event.preventDefault();
	tbody.html('');

	var inputelement = d3.select("#datetime");
	var inputvalue = inputelement.property("value");
	console.log(inputvalue);
	//console.log(ufosighting);

	filteredData = tableData.filter(ufosighting => ufosighting.datetime === inputvalue);
	console.log(filteredData);

	filteredData.forEach(function(ufosighting) {
		console.log(ufosighting);
		var row = tbody.append("tr");

		Object.entries(ufosighting).forEach(function([key, value]) {
			console.log(key, value);
			var cell = row.append("td")
			cell.text(value);
		});
	});
};

// var tbody = d3.select("tbody");


// 	//tbody.selectall("tr").data(filteredData).enter().append("tr");
// 	filteredData.forEach(function(ufosighting) {
// 	console.log(ufosighting);
// 	var row = tbody.append("tr");

// 	Object.entries(ufosighting).forEach(function([key, value]) {
// 		console.log(key, value);
// 		var cell = row.append("td")
// 		cell.text(value);
// 	});
// });




// YOUR CODE HERE!
