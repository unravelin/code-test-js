import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  select,
  drag,
  event as d3Event,
} from 'd3';

import Restaurants from '../../actions/Restaurants';

let simulation;

export const initialize = (baseSvg) => {
  const links = Restaurants.similarities.values();
  const nodes = Restaurants.entries.values();

  simulation = forceSimulation(nodes)
    .force('link', forceLink(links).id(d => d.id))
    .force('charge', forceManyBody())
    .force('center', forceCenter(250, 250));

  // node = select(baseSvg)
    // .selectAll('circle')
    // .data(nodes)
    // .join('circle')
    // .attr('stroke', 'white')
    // .attr('stroke-opacity', 1)
    // .attr('stroke-width', 1.5)
    // .attr('fill', d => d.foundSimilar ? 'red' : 'black')
    // .call(node => node.transition().attr('r', 5))
    // .on('mouseover', (d) => {
    //   const mousedOverNode = select(baseSvg)
    //   mousedOverNode
    //     .append('rect')
    //     .attr('width', d.name.length * 8)
    //     .attr('height', 20)
    //     .attr('x', d.x + 15)
    //     .attr('y', d.y)
    //     .attr('fill', '#f0f8ff')
    //     .attr('stroke', '#98cfff')

    //     mousedOverNode
    //     .append('text')
    //     .attr('x', d.x + 15)
    //     .attr('y', d.y + 15)
    //     .text(d.name)
    // })
    // .on('mouseout', () => {
    //   const mousedOutNode = select(baseSvg);
    //   mousedOutNode
    //     .selectAll('rect')
    //     .remove()
    //   mousedOutNode
    //     .selectAll('text')
    //     .remove()
    // })
    // .call(drag()
    //   .on('start', (d) => {
    //     if (!d3Event.active) simulation.alphaTarget(0.3).restart();
    //     d.fx = d.x;
    //     d.fy = d.y;
    //   })
    //   .on('drag', (d) => {
    //     d.fx = d3Event.x;
    //     d.fy = d3Event.y;
    //   })
    //   .on('end', (d) => {
    //     if (!d3Event.active) simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;
    //   })
    // );

  // simulation.on('tick', () => {
  //   link
  //     .attr('x1', d => d.source.x)
  //     .attr('y1', d => d.source.y)
  //     .attr('x2', d => d.target.x)
  //     .attr('y2', d => d.target.y)

  //   node
  //     .attr('cx', d => d.x)
  //     .attr('cy', d => d.y);
  // });
}

export const restart = () => {
  // Apply the general update pattern to the nodes.
  const links = Restaurants.similarities.values();
  const nodes = Restaurants.entries.values();
  // Restaurants.similarities.forEach((similarity) => links.push(Object.create(similarity)));
  // Restaurants.entries.forEach((entry) => nodes.push(Object.create(entry)));
  // node = node.data(nodes);
  // node.exit().remove();
  // node = node
  //   .enter()
  //   .append('circle')
  //   .attr('fill', 'black')
  //   .attr('stroke', 'white')
  //   .attr('stroke-opacity', 1)
  //   .attr('stroke-width', 1.5)
  //   .attr('fill', d => d.foundSimilar ? 'red' : 'black')
  //   .call(node => node.transition().attr('r', 5))
  //   .merge(node);

  const node = select('#base-svg')
    .selectAll('circle')
    .data(nodes)
    .join(enter => enter
        .append('circle')
        .attr('fill', 'black')
        .attr('stroke', 'white')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1.5)
        .attr('fill', 'black')
        .call(node => node.transition().attr('r', 5)),
        update => update
          .attr('fill', d => d.foundSimilar ? 'red' : 'black'),
        exit => exit.remove(),
    )
    .on('mouseover', (d) => {
      debugger;
      const mousedOverNode = select('#base-svg');
      mousedOverNode
        .append('rect')
        .attr('width', d.name.length * 10)
        .attr('height', 22)
        .attr('x', d.x + 15)
        .attr('y', d.y)
        .attr('fill', '#f0f8ff')
        .attr('stroke', '#98cfff')

        mousedOverNode
        .append('text')
        .attr('x', d.x + 20)
        .attr('y', d.y + 16)
        .text(d.name)
    })
    .on('mouseout', () => {
      const mousedOutNode = select('#base-svg');
      mousedOutNode
        .selectAll('rect')
        .remove()
      mousedOutNode
        .selectAll('text')
        .remove()
    })
    .call(drag()
      .on('start', (d) => {
        if (!d3Event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (d) => {
        d.fx = d3Event.x;
        d.fy = d3Event.y;
      })
      .on('end', (d) => {
        if (!d3Event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      })
    );

  const link = select('#base-svg')
  .selectAll('line')
  .data(links)
  .join('line')
  .attr('stroke', '#999')
  .attr('stroke-opacity', 0.6)
  .attr('stroke-width', 2)
  .lower();

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });
  // Apply the general update pattern to the links.
  // link = link.data(links);
  // link.exit().remove();
  // link = link.enter()
  //   .append('line')
  //   .attr('stroke', '#999')
  //   .attr('stroke-opacity', 0.6)
  //   .attr('stroke-width', 2)
  //   .lower()
  //   .merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  simulation.force('link').links(links).id(d => d.id);
  simulation.alpha(1).restart();
}

Restaurants.setRestaurantListener(restart);
Restaurants.setSimilarityListener(restart);
