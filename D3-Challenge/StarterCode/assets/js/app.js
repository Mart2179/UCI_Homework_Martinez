// @TODO: YOUR CODE HERE!

// We need to grab the width
var width = parseInt(d3.select('#scatter')
    .style("width"));

// We need to grab the height
var height = width * 2/3;

//Margin space
var margin = 20;

//Label area
var labelArea = 110;

//Padding
var padding = 45;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");






// Axes labels
svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");






//Transforming to XText
var bottomTextX =  (width - labelArea)/2 + labelArea;
var bottomTextY = height - margin - padding;
xText.attr("transform",`translate(
    ${bottomTextX}, 
    ${bottomTextY})`
    );








// Creating the x-axis  
xText.append("text")
.attr("y", -19)
.attr("data-name", "poverty")
.attr("data-axis", "x")
.attr("class","aText active x")
.text("In Poverty (%)");

xText.append("text")
.attr("y", 0)
.attr("data-name", "age")
.attr("data-axis", "x")
.attr("class","aText inactive x")
.text("Age (Median)");

xText.append("text")
.attr("y", 19)
.attr("data-name", "income")
.attr("data-axis", "x")
.attr("class","aText inactive x")
.text("Household Income (Median)");   










// Creating the y-axis 

svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

//Transform text so that its more readable
var leftTextX =  margin + padding;
var leftTextY = (height + labelArea) / 2 - labelArea;
yText.attr("transform",`translate(
    ${leftTextX}, 
     ${leftTextY}
    )rotate(-90)`
    );

// Append the y-axis
yText .append("text")
    .attr("y", -22)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Obese (%)");

yText .append("text")
    .attr("y", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes (%)");

yText .append("text")
    .attr("y", 22)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Healthcare (%)");







//Visualization
var cRadius;
function adjustRadius() {
  if (width <= 530) {
    cRadius = 7;}
  else { 
    cRadius = 10;}
}
adjustRadius();








//Data

d3.csv("assets/data/data.csv").then(function(data) {
    visualize(data);
});

function visualize (csvData) {
    var xMin;
    var xMax;
    var yMin;
    var yMax;
 
    // Using X and Y
    var currentX = "poverty";
    var currentY = "obesity";
 
    // Tool Tip  
    var toolTip = d3.tip()
       .attr("class", "d3-tip")
       .offset([40, -60])
       .html(function(d) {
             var stateLine = `<div>${d.state}</div>`;
             var yLine = `<div>${currentY}: ${d[currentY]}%</div>`;
             if (currentX === "poverty") {
                 xLine = `<div>${currentX}: ${d[currentX]}%</div>`}          
             else {
                 xLine = `<div>${currentX}: ${parseFloat(d[currentX]).toLocaleString("en")}</div>`;}             
             return stateLine + xLine + yLine  
         });
 
     svg.call(toolTip);
 
     // Update 
     function  labelUpdate(axis, clickText) {
         // Activating
         d3.selectAll(".aText")
             .filter("." + axis)
             .filter(".active")
             .classed("active", false)
             .classed("inactive", true);
     
         // Switching to text
         clickText.classed("inactive", false).classed("active", true);
         }
 
     // Min and Max
     function xMinMax() {
       xMin = d3.min(csvData, function(d) {
         return parseFloat(d[currentX]) * 0.85;
       });
       xMax = d3.max(csvData, function(d) {
         return parseFloat(d[currentX]) * 1.15;
       });     
     }
 
     function yMinMax() {
       yMin = d3.min(csvData, function(d) {
         return parseFloat(d[currentY]) * 0.85;
       });
       yMax = d3.max(csvData, function(d) {
         return parseFloat(d[currentY]) * 1.15;
       }); 
     }
 
     // Scatter plot
     xMinMax();
     yMinMax();
 
     var xScale = d3 
         .scaleLinear()
         .domain([xMin, xMax])
         .range([margin + labelArea, width - margin])
 
     var yScale = d3
         .scaleLinear()
         .domain([yMin, yMax])
         .range([height - margin - labelArea, margin])
 
     var xAxis = d3.axisBottom(xScale);
     var yAxis = d3.axisLeft(yScale);
 
     function tickCount() {
       if (width <= 500) {
          xAxis.ticks(5);
          yAxis.ticks(5);
       }
       else {
           xAxis.ticks(10);
           yAxis.ticks(10);
       }        
     }
     tickCount();
 
     // Appending
     svg.append("g")
         .call(xAxis)
         .attr("class", "xAxis")
         .attr("transform", `translate(
             0, 
             ${height - margin - labelArea})`
         );
 
     svg.append("g")
         .call(yAxis)
         .attr("class", "xAxis")
         .attr("transform", `translate(
             ${margin + labelArea}, 
             0 )`
         );
 
     // Appending 
     var allCircles = svg.selectAll("g allCircles").data(csvData).enter();
 
     allCircles.append("circle")
         .attr("cx", function(d) {
             // xScale 
             return xScale(d[currentX]);
         })
         .attr("cy", function(d) {
             return yScale(d[currentY]);
         })
         .attr("r", cRadius)
         .attr("class", function(d) {
             return "stateCircle " + d.abbr;
         })
         .on("mouseover", function(d) {
             // Showing tooltip
             toolTip.show(d, this);
             // Highlight
             d3.select(this).style("stroke", "#323232");
         })
         .on("mouseout", function (d) {
             // Remove tooltip
             toolTip.hide(d);
             // Remove highlight
             d3.select(this).style("stroke", "#e3e3e3")
         });
 
         allCircles
             .append("text")
             .attr("font-size", cRadius)
             .attr("class", "stateText")
 
             .attr("dx", function(d) {
                return xScale(d[currentX]);
             })
             .attr("dy", function(d) { 
               return yScale(d[currentY]) + cRadius /3;
             })
             .text(function(d) {
                 return d.abbr;
               })
 
             .on("mouseover", function(d) {
                 toolTip.show(d);
                 d3.select("." + d.abbr).style("stroke", "#323232");
             })
 
             .on("mouseout", function(d) {
                 toolTip.hide(d);
                 d3.select("." + d.abbr).style("stroke", "#e3e3e3");
             });
 
// ?????
 }