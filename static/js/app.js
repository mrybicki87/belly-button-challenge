// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let demographicData = metadata.filter(sampleObject => sampleObject.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select('#sample-metadata').html("");

    // Use `.html("") to clear any existing metadata

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in demographicData) {
      sampleMetadata.append('h6').text(`${key.toUpperCaseAS()}: ${demographicData[key]}`);
    };

  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field;
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    
    let samplesData = samples.filter(sampleObject => sampleObject.id == sample)[0];
    

    // Get the otu_ids, otu_labels, and sample_values
    let otu = samplesData.otu_ids;
    let otuLabels = samplesData.otu_labels;
    let sampleValues = samplesData.sample_values;

    // Build a Bubble Chart
    let trace1 = [{
      x: otu,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otu, 
        colorscale: 'Earth'
      }
    }];

    // Render the Bubble Chart
    

    let layoutBubble = {
      title: 'Number of Bacteria',
      showlegend: false,
      margin: {t: 30},
      hovermode: 'closest',
      xaxis: {title: 'OTU ID'}
    };

    Plotly.newPlot('bubble', trace1, layoutBubble);

  
    let trace2 = [{
      y: otu.slice(0.10).map(object => `OTU ${object}`).reverse(),
      x: sampleValues.slice(0,10).reverse(),
      text: otuLabels.slice(0,10).reverse(),
      name:'Top 10 Bacteria Cultures Found',
      type: 'bar',
      orientation: 'h'
    }];

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    

    let layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 150,
        t: 30        
      }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", trace2, layout);
  });
}

// Function to run on page load
function init() {

  let dropdownMenu = d3.select('#selDataset');

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
  
    for (let i = 0; i < names.length; i++) {

      dropdownMenu
        .append("option")
        .text(names[i])
        .property('value',names[i]);  

    };
    

    // Get the first sample from the list
    let firstName = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstName);
    buildMetadata(firstName);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
