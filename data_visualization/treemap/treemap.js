document.addEventListener('DOMContentLoaded', () => {
    const svgHeight = 700;
    const svgWidth = 1200;
    
    const svg = d3.select('#graph')
        .append('svg')
        .attr('id', 'treemap')
        .attr('height', svgHeight)
        .attr('width', svgWidth);
        
    const treemap = d3.treemap()
        .size([svgWidth, svgHeight])
        .paddingInner(1);
        
    const tooltip = d3.select('#graph')
        .append('div')
        .attr('id', 'tooltip');
        
    const colors = d3.scaleOrdinal(d3.schemeAccent.concat(d3.schemePaired));
        
    const DATA_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';
    d3.json(DATA_URL).then(data => {
        
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.height - a.height || b.value - a.value);
            
        treemap(root);
        
        const categories = [...new Set(root.leaves().map(leaf => leaf.data.category))];
        
        const leaf = svg.selectAll("g")
            .data(root.leaves())
            .join("g")
                .attr("transform", d => `translate(${d.x0},${d.y0})`)
                
        leaf.append("rect")
            .attr("class", "tile")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr('data-category', d => d.data.category)
            .attr('data-name', d => d.data.name)
            .attr('data-value', d => d.data.value)
            .attr("fill", d => colors(d.data.category))
            .on('mouseout', d => {
                tooltip.style('display', 'none');
            })
            .on('mousemove', d => {
                const x = d3.event.pageX + 20;
                const y = d3.event.pageY;
                const text = `Name: ${d.data.name}` + '<br>' +
                             `Category: ${d.data.category}` + '<br>' +
                             `Value: ${d.data.value}`;
                
                tooltip.style('display', 'flex')
                    .attr('data-value', d.data.value)
                    .style('top', y + 'px')
                    .style('left', x + 'px')
                    .html(text);
            });
        
        leaf.append('text')
            .selectAll('tspan')
            .data(node => node.data.name.split(/(?=[A-Z][^A-Z])/g))
            .enter()
            .append('tspan')
            .attr('x', 5)
            .attr('y', (d, i) => 20 + 12 * i)
            .text(d => d)
            .style('font-size', 10);
            
        const legendWidth = 600;
        const numCols = 3;
        const numRows = Math.ceil(categories.length / numCols);
        const legendXPitch = legendWidth / numCols;
        const legendYPitch = 40;
        const legendCellWidth = 20;
        const legendTextOffset = legendCellWidth + 10;
        const legendItemsOffset = 50;
        
        const legend = d3.select('#graph')
            .append('svg')
            .attr('id', 'legend')
            .attr('width', legendWidth)
        
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                legend.append('g')
                    .attr('class', 'legend-item-group')
                    .attr('transform', `translate(${legendItemsOffset + col * legendXPitch}, ${row * legendYPitch})`)
            }
        }
        const legendItems = legend.selectAll('g')
            .data(categories)
            .join();

        legendItems.append('rect')
            .attr('class', 'legend-item')
            .attr('height', legendCellWidth)
            .attr('width', legendCellWidth)
            .attr('fill', d => colors(d))
            
        legendItems.append('text')
            .attr('x', legendTextOffset)
            .attr('y', legendCellWidth)
            .text(d => d)
    })
})