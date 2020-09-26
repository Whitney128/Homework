d3.json("../../data/samples.json").then((data) => {
  console.log(data);
	var trace1 = {
		x: data.otu_ids,
		y: data.sample_values,
		type: "bar-plot",
		name: "barchart",
		boxpoints: "all"
	};

	var data = [trace1];

	var layout = {
		title: "barchart",
		xaxis: { title: "otu_ids"},
		yaxis: { title: "sample_values"}
	};

	Plotly.newplot("bar-plot", data, layout);
});

d3.json("data/samples.json").then((data) => {
	var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest"
      };

      var DataBubble = [
      {
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        mode: "markers",
        marker: {
          color: data.otu_ids,
          size: data.sample_values,
          }
      }
    ];

    Plotly.plot("bubble", DataBubble, LayoutBubble);

});
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'sampledata') {
//       data = sampledata;
//   }
//   else if (dataset == 'none') {
//       data = none;
 
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("bar-plot", "values", [newdata]);
// }


// //init();


  
