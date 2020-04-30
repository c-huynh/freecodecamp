document.addEventListener('DOMContentLoaded', () => {
    
    const svgHeight = 600;
    const svgWidth = 960;
    const svgPadding = 50;
    
    const svg = d3.select('#graph')
        .append('svg')
        .attr('height', svgHeight + 2 * svgPadding)
        .attr('width', svgWidth + 2 * svgPadding);
        
    const tooltip = d3.select('#graph')
        .append('div')
        .attr('id', 'tooltip');
        
    const educationSRC = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
    const topojsonSRC = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
    
    const jsonRequests = [d3.json(educationSRC), d3.json(topojsonSRC)];
    Promise.all(jsonRequests).then(data => {
        
        const educationData = data[0];
        const educationDataMap = d3.map(educationData, d => d.fips);
        const maxBachelorsPercentage = d3.max(educationData, d => d.bachelorsOrHigher);
        const minBachelorsPercentage = d3.min(educationData, d => d.bachelorsOrHigher);
        
        const numColors = 6;
        const colorScale = d3.scaleThreshold()
            .domain(d3.range(minBachelorsPercentage, maxBachelorsPercentage, (maxBachelorsPercentage - minBachelorsPercentage) / (numColors - 1)))
            .range(d3.schemeGnBu[numColors]);
        
        const legendCellHeight = 10
        const legendCellWidth = 50;
        const scale = d3.scaleLinear()
            .domain([0, colorScale.range().length * legendCellWidth])
            .range([0, colorScale.range().length * legendCellWidth])
            
        const legend = svg.append('g')
            .attr('id', 'legend');
            
        legend.selectAll('rect')
            .data(colorScale.range())
            .enter()
            .append('rect')
            .attr('height', legendCellHeight)
            .attr('width', legendCellWidth)
            .attr('x', (d, i) => svgWidth * 3 / 4 + i * legendCellWidth)
            .attr('y', 50)
            .attr('fill', d => d)
        
        const ticks = [].map.call(d3.range(0, colorScale.range().length - 1), d => legendCellWidth * (d+1));
        const legendAxis = d3.axisBottom(scale)
            .tickValues(ticks)
            .tickSize(0)
            .tickSizeOuter(0)
            .tickFormat((d, i) => colorScale.domain()[i].toFixed(0) + "%");
        
        legend.append('g')
            .attr("transform", "translate(" + (svgWidth * 3 / 4) + ", " + (50 + legendCellHeight) + ")")
            .call(legendAxis)
            .select(".domain")
            .remove();
        
        // topoJSON reference: https://github.com/topojson/topojson-specification/blob/master/README.md#11-examples
        // geoJSON reference: https://tools.ietf.org/html/rfc7946
        // topoJSON to geoJSON reference: https://github.com/topojson/topojson-client/blob/master/README.md#feature
        const topojsonData = data[1];
        const countyGeojsonData = topojson.feature(topojsonData, topojsonData.objects.counties);
        const stateGeojsonData = topojson.mesh(topojsonData, topojsonData.objects.states, function(a, b) { return a !== b; })
        const pathGenerator = d3.geoPath();
        
        svg.append('g')
            .attr('id', 'counties')
            .selectAll('path')
            .data(countyGeojsonData.features)
            .enter()
            .append('path')
            .attr('class', 'county')
            .attr('data-fips', d => d.id)
            .attr('data-education', d => educationDataMap.get(d.id).bachelorsOrHigher)
            .attr('transform', 'translate(' + svgPadding + ', ' + svgPadding + ')')
            .attr('d', pathGenerator)
            .attr('stroke', 'transparent')
            .attr('fill', d => {
                const county = educationDataMap.get(d.id);
                return colorScale(county.bachelorsOrHigher);
            })
            .on('mouseout', d => {
                tooltip.style('display', 'none');
            })
            .on('mouseover', d => {
                const county = educationDataMap.get(d.id);
                const text = `${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`
                const x = d3.event.pageX + 20;
                const y = d3.event.pageY - 20;
                
                tooltip.style('display', 'flex')
                    .style('top', y + 'px')
                    .style('left', x + 'px')
                    .attr('data-education', county.bachelorsOrHigher)
                    .html(text);
            });
        
        svg.append('path')
            .attr('id', 'states')
            .attr('transform', 'translate(' + svgPadding + ', ' + svgPadding + ')')
            .attr('stroke', 'white')
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .attr('d', pathGenerator(stateGeojsonData))
    });
})