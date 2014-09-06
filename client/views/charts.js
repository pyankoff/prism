Template.charts.rendered = function () {

        var w = 800;
      var h = 300;
      var barPadding = 15;
      var padding = 30;

      var svg = d3.select(".chart1")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

  var drawChart = function(update) {
      
      dataset = Series.findOne().values; 
      console.log(dataset);



      var bars = svg.selectAll("rect")
                .data(dataset);

      var dataLabels = svg.selectAll("text")
            .data(dataset);

      var x = d3.scale.ordinal()
              .domain(d3.range(dataset.length))
              .rangeRoundBands([0, w], 0.2);

      var y = d3.scale.linear()
                      .domain([0, d3.max(dataset)])
                      .range([h - padding, padding]); 


      if (!update) {

        bars = bars.enter()
                .append("rect")
                .attr("fill", "teal");

        dataLabels = dataLabels.enter()
            .append("text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "18px")
            .attr("text-anchor", "middle")
            .attr("fill", "gray");

        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickSize(0)
                    .tickPadding(6); 

        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, " + (h - padding) + ")")
          .call(xAxis);

      } else {
        bars = bars.transition().duration(2000);
        dataLabels = dataLabels.transition().duration(2000);
      }

      bars = bars.attr("x", function(d, i) {
                  return x(i);
                })
                .attr("y", function(d) {
                  return y(d);
                })
                .attr("width", w / dataset.length - barPadding)
                .attr("height", function(d) {
                  return h - y(d) - padding;
                });

      dataLabels = dataLabels.text(function(d) {
              return d;
            })
            .attr("x", function(d, i) {
              return x(i) + (w / dataset.length - barPadding) / 2;
            })
            .attr("y", function(d) {
              return y(d) - 12;
            })

  };

  Series.find().observe({
      added: function() {
        drawChart(false);
      },
      changed: _.partial(drawChart, true)
    });

}