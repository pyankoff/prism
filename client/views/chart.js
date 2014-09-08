Template.chart.rendered = function () {

      var seriesName = this.data.name;
      var w = 800;
      var h = 300;
      var barPadding = 15;
      var padding = 30;

      var svg = d3.select(".chart-"+seriesName)
          .append("svg")
          .attr("width", w)
          .attr("height", h);

  var drawChart = function(update) {

      dataset = Series.findOne({name: seriesName}).values; 

      var bars = svg.selectAll("rect")
                .data(dataset);

      var dataLabels = svg.selectAll("text")
            .data(dataset);

      var x = d3.scale.ordinal()
              .domain(d3.range(dataset.length))
              .rangeRoundBands([0, w], 0.2);

      var y = d3.scale.linear()
                      .domain([Math.min(d3.min(dataset), 0), d3.max(dataset)])
                      .range([h-padding, padding]); 

      var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickSize(0)
                    .tickPadding(6); 

      /*d3.selectAll(".axis").remove();

      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, " + y(0) + ")")
          .call(xAxis); */

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

      } else {
        bars = bars.transition().duration(2000);
        dataLabels = dataLabels.transition().duration(2000);
        //xAxis = xAxis.transition().duration(2000);
      }

      bars = bars.attr("x", function(d, i) {
                  return x(i);
                })
                .attr("y", function(d) {
                  return y(Math.max(0, d));
                })
                .attr("width", w / dataset.length - barPadding)
                .attr("height", function(d) {
                  return Math.abs(y(d) - y(0));
                });

      dataLabels = dataLabels.text(function(d) {
              return d3.round(d);
            })
            .attr("x", function(d, i) {
              return x(i) + (w / dataset.length - barPadding) / 2;
            })
            .attr("y", function(d) {
              var shift = function(x) {
                if (x > 0) { 
                  return 12;
                } else {
                  return -18;
                }
              }
              return y(d) - shift(d);
            })

  };

  Series.find().observe({
      added: function() {
        drawChart(false);
      },
      changed: _.partial(drawChart, true)
    });

};