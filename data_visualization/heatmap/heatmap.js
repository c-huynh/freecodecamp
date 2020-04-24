document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
        .then(response => response.json())
        .then(data => {
            
            const parseYear = d3.timeParse("%Y");
            const parseMonth = d3.timeParse("%m");
            
            const minYear = d3.min(data.monthlyVariance, d => d.year);
            const maxYear = d3.max(data.monthlyVariance, d => d.year);
            
            d3.select('#description')
                .html(`${minYear} - ${maxYear}: base temperature ${data.baseTemperature}°C`);
            
            const numData = data.monthlyVariance.length;
            const cellWidth = 4;
            const cellHeight = 40;
            const svgHeight = 12 * cellHeight;
            const svgWidth = Math.ceil(numData / 12) * cellWidth;
            const svgPadding = 100;
            
            const svg = d3.select('#graph')
                .append('svg')
                .attr('height', svgHeight + 2 * svgPadding)
                .attr('width', svgWidth + 2 * svgPadding)
                .attr('overflow', 'scroll');
            
            const xScale = d3.scaleBand()
                .domain(data.monthlyVariance.map(d => d.year))
                .rangeRound([0, svgWidth]);
                                
            const yScale = d3.scaleBand()
                .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
                .rangeRound([0, svgHeight]);
                
            const xAxisXPosition = svgPadding;
            const xAxisYPosition = svgHeight + svgPadding;
            const xAxis = d3.axisBottom(xScale)
                .tickValues(xScale.domain().filter(d => d % 10 === 0));
            
            svg.append('g')
                .attr('id', 'x-axis')
                .attr("transform", "translate(" + xAxisXPosition + ", " + xAxisYPosition + ")")
                .call(xAxis);
                
            const yAxisXPosition = svgPadding;
            const yAxisYPosition = svgPadding;
            const yAxis = d3.axisLeft(yScale)
                .tickFormat(month => {
                    const date = parseMonth(month);
                    return d3.timeFormat("%B")(date);
                })
            
            svg.append("g")
                .attr("id", "y-axis")
                .attr("transform", "translate(" + yAxisXPosition + ", " + yAxisYPosition + ")")
                .call(yAxis);
                
            // format legend 
            const minVariance = d3.min(data.monthlyVariance, d => d.variance);
            const maxVariance = d3.max(data.monthlyVariance, d => d.variance);
            const legendCellWidth = 20;
            
            const colors = d3.scaleQuantize()
                .domain([data.baseTemperature + minVariance, data.baseTemperature + maxVariance])
                .range(["midnightblue", "blue", "royalblue", "lightblue", "beige", "gold", "orange", "tomato", "red", "darkred"]);
                
            const legendScale = d3.scaleLinear()
                .domain([0, colors.range().length * legendCellWidth])
                .range([0, colors.range().length * legendCellWidth]);

            const legendYPosition = 610;
            const legend = svg.append('g')
                .attr('id', 'legend')
            
            legend.selectAll('rect')
                .data(colors.range())
                .enter()
                .append('rect')
                .attr('height', legendCellWidth)
                .attr('width', legendCellWidth)
                .attr('x', (d, i) => svgPadding + i * legendCellWidth)
                .attr('y', legendYPosition)
                .attr('fill', d => d);
            
            const ticks = [].map.call(d3.range(colors.range().length - 1), d => legendCellWidth * (d+1));
            const legendAxis = d3.axisBottom(legendScale)
                .tickValues(ticks)
                .tickSize(0)
                .tickSizeOuter(0);
                
            svg.append("g")
                .attr("transform", "translate(" + (svgPadding - 0.5) + ", " + (legendYPosition + legendCellWidth) + ")")
                .call(legendAxis)
                .select(".domain")
                .remove();
                
            // format cells
            svg.selectAll('rect')
                .data(data.monthlyVariance)
                .enter()
                .append('rect')
                .attr('class', 'cell')
                .attr('height', cellHeight)
                .attr('width', cellWidth)
                .attr('x', d => svgPadding + xScale(d.year))
                .attr('y', d => svgPadding + yScale(d.month))
                .attr('fill', d => colors(data.baseTemperature + d.variance))
                .attr('data-year', d => d.year)
                .attr('data-month', d => d.month - 1)
                .attr('data-temp', d => data.baseTemperature + d.variance)
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut);
                
            svg.append("text")
               .text("Year")
               .attr("x", svgWidth / 2 + 100)
               .attr("y", svgPadding + svgHeight + 50);
               
            const tooltip = d3.select('#graph')
                .append('div')
                .attr('id', 'tooltip');
                
            function handleMouseOver(d, i) {
                const leftPosition = xScale(d.year) + svgPadding - cellWidth / 2;
                const topPosition = yScale(d.month) + svgPadding;
                const date = parseMonth(d.month);
                const tooltipText = d.year + ' - ' + d3.timeFormat("%B")(date) + '<br>'
                                    + (data.baseTemperature + d.variance).toFixed(1) + '°C<br>'
                                    + d.variance.toFixed(1) + '°C';
                tooltip.style('display', 'flex')
                    .style('left', leftPosition + 'px')
                    .style('top', topPosition + 'px')
                    .attr('data-year', d.year)
                    .html(tooltipText);
            }
            
            function handleMouseOut(d, i) {
                tooltip.style('display', 'none');
            }
        })
})