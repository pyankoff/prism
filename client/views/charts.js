Template.charts.rendered = function () {

  var dataset = [1, 2, 4, 6, 9, 14, 20, 25, 35, 50, 70, 80, 100];

  var w = 800;
  var h = 300;
  var barPadding = 15;

  var svg1 = d3.select(".chart1")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  var bars = svg1.selectAll("rect")
                  .data(dataset)
                  .enter()
                  .append("rect")
                  .attr("x", function(d, i) {
                    return i * (w / dataset.length);
                  })
                  .attr("y", function(d) {
                    return h - d * 5;
                  })
                  .attr("width", w / dataset.length - barPadding)
                  .attr("height", function(d) {
                    return d * 5;
                  })
                  .attr("fill", "teal");

  svg1.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return i * (w / dataset.length) 
                + (w / dataset.length - barPadding) / 2;
      })
      .attr("y", function(d) {
        return h - d * 5 - 14;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("text-anchor", "middle")
      .attr("fill", "gray");;

  var dataset2 = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];
  var padding = 30;

  var svg2 = d3.select(".chart2")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  var xScale = d3.scale.linear()
                .domain([0, d3.max(dataset2, function(d) { return d[0]; })])
                .range([padding, w - padding * 2]);

  var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset2, function(d) { return d[1]; })])
                .range([h - padding, padding]);

  var bars = svg2.selectAll("circle")
                  .data(dataset2)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d) {
                    return xScale(d[0]);
                  })
                  .attr("cy", function(d) {
                    return yScale(d[1]);
                  })
                  .attr("r", 10);

  svg2.selectAll("text")
      .data(dataset2)
      .enter()
      .append("text")
      .text(function(d) {
        return d[0] + ',' + d[1];
      })
      .attr("x", function(d) {
        return xScale(d[0]);
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("fill", "red");


  var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);

  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);


  svg2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);

  svg2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);


}