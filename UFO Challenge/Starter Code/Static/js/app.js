// from data.js
var tableData = data;

// YOUR CODE HERE!

// Level 1

// This clears the table for new data to be inputted

function buildTable() {
    tableData.map(data => {

    
        var row = tbody.append("tr");
    
        // Append the data to the row
        row.append("td").text(data.datetime);
        row.append("td").text(data.city);
        row.append("td").text(data.state);
        row.append("td").text(data.country);
        row.append("td").text(data.shape);
    });
}

if (date) {  
};

if (city) {   
};

if (state) {  
};

if (country) {   
};

if (shape) {  
};

buildTable(filteredData)

d3.selectAll()

buildTable(tableData);

// I give up