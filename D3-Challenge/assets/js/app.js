var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40); 

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

function xScale(data, chosenXAxis, chartWidth) {
    // Create scales.
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXAxis]) * .8,
            d3.max(data, d => d[chosenXAxis]) * 1.1])
        .range([0, chartWidth]);
    return xLinearScale;
    }

  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

function yScale(data, chosenYAxis, chartHeight) {
    // Create scales.
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYAxis]) * .8,
            d3.max(data, d => d[chosenYAxis]) * 1.2])
        .range([chartHeight, 0]);
    return yLinearScale;
}

function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
}

function renderText(circletextGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
    circletextGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));
    return circletextGroup;
}

svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");

svg.append("g").attr("class", "xText");
var xText = d3.select(".yText");


  // load Data
  d3.csv("../assets/data/data.csv").then(function(data){
  	console.log(data);

  		data.forEach(function(data) {
  		data.state = +data.state; 
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = +data.abbr;
        data.income = +data.income;
      });

    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.poverty))
    .range([0, svgWidth]);

     var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([svgHeight, 0]);

     svg.append("path")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    //.attr("d", createLine(data));

  //   }).catch(function(error) {
  // console.log(error);
  //});

  var xLinearScale = xScale(data, chosenXAxis);
  var yLinearScale = yScale(data, chosenYAxis);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

   // chartGroup.append("g")
   //    .attr("transform", `translate(0, ${height})`)
   //    .call(bottomAxis);

   //  chartGroup.append("g")
   //    .call(leftAxis);
});

//    var xAxis = chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);
// });
  //   var yAxis = chartGroup.append("g")
  //   .call(leftAxis);

  //   var circlesGroup = chartGroup.selectAll("g circle")
  //   .data(data)
  //   .enter()
  //   .append("g");

  //   var circlesXY = circlesGroup.append("circle")
  //   .attr("cx", d => xLinearScale(d[chosenXAxis]))
  //   .attr("cy", d => yLinearScale(d[chosenYAxis]))
  //   .attr("r", 15)
  //   .classed("stateCircle", true);

  //   var circlesText = circlesGroup.append("text")
  //   .text(d => d.abbr)
  //   .attr("dx", d => xLinearScale(d[chosenXAxis]))
  //   .attr("dy", d => yLinearScale(d[chosenYAxis]) + 5)
  //   .classed("stateText", true);

  //     const xlabelsGroup = chartGroup.append("g")
  //   .attr("transform", `translate(${width / 2}, ${height})`);

  //    const povertyLabel = xlabelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 40)
  //   .attr("value", "poverty") 
  //   .text("In Poverty (%)")
  //   .classed("active", true);

  //    const ageLabel = xlabelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 60)
  //   .attr("value", "age") 
  //   .text("Age (Median)")
  //   .classed("inactive", true);

  //    const incomeLabel = xlabelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 80)
  //   .attr("value", "income") 
  //   .text("Household Income (Median)")
  //   .classed("inactive", true);

  //   const ylabelsGroup = chartGroup.append("g");

  //    const healthcareLabel = ylabelsGroup.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("x", -(height / 2))
  //   .attr("y", -40)
  //   .attr("value", "healthcare")
  //   .text("Lacks Healthcare (%)")
  //   .classed("active", true);

  //   const smokesLabel = ylabelsGroup.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("x", -(height / 2))
  //   .attr("y", -60)
  //   .attr("value", "smokes")
  //   .text("Smokes (%)")
  //   .classed("inactive", true);

  //     const obeseLabel = ylabelsGroup.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("x", -(height / 2))
  //   .attr("y", -80)
  //   .attr("value", "obesity") 
  //   .text("Obese (%)")
  //   .classed("inactive", true);

  //   circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

  //     xlabelsGroup.selectAll("text")
  //   .on("click", function() {

  //   const value = d3.select(this).attr("value");
  //   if (value !== chosenXAxis) {

  //     chosenXAxis = value;

  //     xLinearScale = xScale(data, chosenXAxis);

  //     xAxis = renderXAxes(xLinearScale, xAxis);

  //     circlesXY = renderXCircles(circlesXY, xLinearScale, chosenXAxis);

  //     circlesText = renderXText(circlesText, xLinearScale, chosenXAxis);

  //     circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

  //         if (chosenXAxis === "age") {
  //       povertyLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       ageLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       incomeLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //     }

  //         else if (chosenXAxis === "income") {
  //       povertyLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       ageLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       incomeLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //     }

  //           else if (chosenXAxis === "Household Income") {
  //       povertyLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       ageLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       incomeLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //     }
  //   }
  // });

  //      ylabelsGroup.selectAll("text")
  //   .on("click", function() {
  //   // get value of selection
  //   const value = d3.select(this).attr("value");
  //   if (value !== chosenYAxis) {

  //     chosenYAxis = value;

  //     yLinearScale = yScale(data, chosenYAxis);

  //     yAxis = renderYAxes(yLinearScale, yAxis);

  //     circlesXY = renderYCircles(circlesXY, yLinearScale, chosenYAxis);

  //     circlesText = renderYText(circlesText, yLinearScale, chosenYAxis);

  //     circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

  //          if (chosenYAxis === "smokes") {
  //       healthcareLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       smokesLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       obeseLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //     }

  //        else if (chosenYAxis === "obesity"){
  //       healthcareLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       smokesLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       obeseLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //     }

  //           else if (chosenYAxis === "Lacks Healthcare") {
  //       healthcareLabel
  //         .classed("active", true)
  //         .classed("inactive", false);
  //       smokesLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //       obeseLabel
  //         .classed("active", false)
  //         .classed("inactive", true);
  //     }
  //   };
  //});