document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        .then(response => response.json())
        .then(data => {
            
            // const parseYear = d3.timeParse("%Y");
            const parseTime = d3.timeParse("%M:%S");
            data.forEach(d => {
                // d.Year = parseYear(d.Year);
                d.Time = parseTime(d.Time);
            })
            
            const svgHeight = 400;
            const svgWidth = 800;
            const svgPadding = 80;
            
            const svg = d3.select('#graph')
                .append('svg')
                .attr('height', svgHeight + 2 * svgPadding)
                .attr('width', svgWidth + 2 * svgPadding)
                
            // format scales
            const xScale = d3.scaleLinear()
                .domain([d3.min(data, d => d.Year - 1), d3.max(data, d => d.Year + 1)])
                .range([0, svgWidth])
            
            const yScale = d3.scaleTime()
                .domain([d3.min(data, d => d.Time), d3.max(data, d => d.Time)])
                .range([svgHeight, 0])
                
            const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
            const xAxisXPosition = svgPadding;
            const xAxisYPosition = svgHeight + svgPadding;
            
            svg.append('g')
                .attr('id', 'x-axis')
                .attr("transform", "translate(" + xAxisXPosition+ ", " + xAxisYPosition + ")")
                .call(xAxis);
                
            const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
            const yAxisXPosition = svgPadding;
            const yAxisYPosition = svgPadding;
            
            svg.append("g")
                .attr("id", "y-axis")
                .attr("transform", "translate(" + yAxisXPosition + ", " + yAxisYPosition + ")")
                .call(yAxis);
                
            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.Year) + svgPadding)
                .attr('cy', d => yScale(d.Time) + svgPadding)
                .attr('r', 5)
                .attr('fill', d => d.Doping === "" ? "#06cf7b" : "#bd1b19")
                .attr('data-yvalue', d => d.Time)
                .attr('data-xvalue', d => d.Year)
                .attr('class', 'dot')
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut);
                
            const tooltip = d3.select('#graph')
                .append('div')
                .attr('id', 'tooltip');
            
            svg.append("text")
               .text("Time in minutes")
               .attr("transform", "rotate(-90)")
               .attr("x", -300)
               .attr("y", svgPadding - 50);
               
            const legend = svg.append('g')
                .attr('id', 'legend')
                
            legend.append('circle')
                .attr('fill', '#bd1b19')
                .attr('r', 15)
                .attr('cx', 700)
                .attr('cy', 300)
                
            legend.append('text')
                .text('Riders with Doping Allegations')
                .attr('x', 725)
                .attr('y', 305)
                
            legend.append('circle')
                .attr('fill', '#06cf7b')
                .attr('r', 15)
                .attr('cx', 700)
                .attr('cy', 350)
                
            legend.append('text')
                .text('No Doping Allegations')
                .attr('x', 725)
                .attr('y', 355)
            
            function handleMouseOver(d, i) {
                const leftPosition = xScale(d.Year) + svgPadding + 30;
                const topPosition = yScale(d.Time) + svgPadding;
                const timeFormat = d3.timeFormat('%M:%S');
                var tooltipText = d.Name + ': ' + d.Nationality + '<br>'
                                    + 'Year: ' + d.Year + ', Time: ' + timeFormat(d.Time) + '<br>'
                if (d.Doping !== '') {
                    tooltipText += '<br>' + d.Doping;
                }
                
                tooltip.style('display', 'flex')
                    .style('left', leftPosition + 'px')
                    .style('top', topPosition + 'px')
                    .attr('data-year', d.Year)
                    .html(tooltipText)
            }
            function handleMouseOut(d, i) {
                tooltip.style('display', 'none');
            }
        })
})