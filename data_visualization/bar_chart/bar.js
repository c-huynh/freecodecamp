document.addEventListener('DOMContentLoaded', () => {
    
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(response => response.json())
        .then(json => {
            const data = json.data;
            
            const svgHeight = 400,
                  svgWidth = 825,
                  svgPadding = 60;
                  
            const barWidth = svgWidth / data.length;
            
            const svg = d3.select('#graph')
                          .append('svg')
                          .attr('height', svgHeight + 2*svgPadding)
                          .attr('width', svgWidth + 2*svgPadding + 40);
                          
            const tooltip = d3.select('#graph')
                              .append('div')
                              .attr('id', 'tooltip');
                              
            const tooltipDate = d3.select('#tooltip')
                                  .append('p')
                                  .attr('id', 'tool-tip-date')
                                  .attr('class', 'info')
                              
            const tooltipGDP = d3.select('#tooltip')
                                 .append('p')
                                 .attr('id', 'tool-tip-gdp')
                                 .attr('class', 'info')
                                 .html('gdp');          

            // format x-axis              
            const xScale = d3.scaleTime()
                             .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
                             .range([0, svgWidth]);
                             
            const xAxis = d3.axisBottom(xScale)
            const xAxisXPosition = svgPadding + 40;
            const xAxisYPosition = svgHeight + svgPadding;

            svg.append("g")
               .attr("id", "x-axis")
               .attr("transform", "translate(" + xAxisXPosition+ ", " + xAxisYPosition + ")")
               .call(xAxis);
            
            // format y-axis
            const yScale = d3.scaleLinear()
                             .domain([0, d3.max(data, d => d[1])])
                             .range([svgHeight, 0]);

            const yAxis = d3.axisLeft(yScale);
            const yAxisXPosition = svgPadding + 40;
            const yAxisYPosition = svgPadding

            svg.append("g")
               .attr("id", "y-axis")
               .attr("transform", "translate(" + yAxisXPosition + ", " + yAxisYPosition + ")")
               .call(yAxis);

            svg.append("text")
               .text("Gross Domestic Product")
               .attr("transform", "rotate(-90)")
               .attr("x", -300)
               .attr("y", svgPadding + 70);
               
            const moreInfoText = json.description.match(/(?=http:).*(\.pdf)/g)[0];   
            svg.append("text")
               .text('more info: ' + moreInfoText)
               .attr('x', 525)
               .attr('y', 500)
                          
            // add data
            svg.selectAll('rect')
               .data(data)
               .enter()
               .append('rect')
               .attr('height', d => svgHeight - yScale(d[1]))
               .attr('width', barWidth)
               .attr('y', (d, i) => svgPadding + yScale(d[1]))
               .attr('x', (d, i) => i * barWidth + svgPadding + 40)
               .attr('class', 'bar')
               .attr('data-date', d => d[0])
               .attr('data-gdp', d => d[1])
               .on('mouseover', handleMouseOver)
               .on('mouseout', handleMouseOut);
               
            function handleMouseOver(d, i) {
                const currentBar = d3.select(this);
                const leftPosition = i * barWidth + svgPadding + 100;
                tooltip.style('display', 'flex')
                       .style('left', leftPosition + 'px')
                       .attr('data-date', currentBar.attr('data-date'));
                
                const date = new Date(currentBar.attr("data-date"));
                const gdp = parseFloat(currentBar.attr("data-gdp")).toFixed(1);
                
                var tooltipDateText = date.getFullYear();
                if (date.getMonth() < 3) {
                    tooltipDateText += ' Q1';
                } else if (date.getMonth() < 6) {
                    tooltipDateText += ' Q2';
                } else if (date.getMonth() < 9) {
                    tooltipDateText += ' Q3';
                } else {
                    tooltipDateText += ' Q4';
                }
                tooltipDate.html(tooltipDateText);
                
                
                tooltipGDP.html('$' + gdp.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Billions');
            
            }
            
            function handleMouseOut(d, i) {
                tooltip.style('display', 'none');
            }
        });
        

})




