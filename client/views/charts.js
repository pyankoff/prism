Template.charts.rendered = function () {

  var dataset = [1, 2, 4, 6, 9, 14, 20, 25, 35, 50];

  var w = 700;
  var h = 300;
  var barPadding = 15;

  var svg = d3.select(".chart1")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  var bars = svg.selectAll("rect")
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

  svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return i * (w / dataset.length) + 20;
      })
      .attr("y", function(d) {
        return h - d * 5 - 15;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("fill", "gray");;

}