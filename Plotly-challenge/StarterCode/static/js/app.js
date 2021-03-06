function fetchMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data 
      var filteredData = metadata.filter(obj => obj.id == sample);
      var resultData = filteredData[0];
      // Use d3 
      var set_panel = d3.select("#sample_metadata");
      // Use HTML
      set_panel.html("");
      Object.entries(resultData).forEach(([key, value]) => {
        set_panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
      
    });
  }
  
  function drawCharts(sample) {
    d3.json("samples.json").then((data) => {
      var sampleData = data.samples;
      var filteredData = sampleData.filter(obj => obj.id == sample);
      var resultData = filteredData[0];
      var _ids = resultData.otu_ids;
      var _labels = resultData.otu_labels;
      var sample_values = resultData.sample_values;

      // Bubble chart
      var bubbleChartLayout = {
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubbleChartData = [
        {
          x: _ids,
          y: sample_values,
          text: _labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: _ids,
            colorscale: "Earth"
          }
        }
      ];
      Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
      var yAxisticks = _ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yAxisticks,
          x: sample_values.slice(0, 10).reverse(),
          text: _labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      var barLayout = {
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", barData, barLayout);
    });
  }
  function init() {



    var ddl_select = d3.select("#selDataset");



    d3.json("samples.json").then((data) => {
      var objNames = data.names;
      objNames.forEach((sample) => {  ddl_select.append("option").text(sample).property("value", sample);  });





      var firstSample = objNames[0];
      drawCharts(firstSample);
      fetchMetadata(firstSample);
    });
  }
  
  function filterSubjectID(newSample) {
    // Pull new data
    drawCharts(newSample);
    fetchMetadata(newSample);
  }
  
  // Initialize the default dashboard
  init();