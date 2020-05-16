import React, { useRef, useEffect } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  select,
  drag,
  event as d3Event,
} from 'd3';
import { connect } from 'react-redux';

export const mapStateToProps = (state) => ({
  isSimulationOn: state?.graphState?.isSimulationOn,
  dataNodes: state?.graphState?.nodes ?? new Map(),
  dataLinks: state?.graphState?.links ?? new Set(),
});


export const SimilarRestaurantsGraph = ({ isSimulationOn, dataNodes, dataLinks }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    if (isSimulationOn) {
      const links = [];
      const nodes = [];
      dataLinks.forEach((link) => links.push(Object.assign({}, link)));
      dataNodes.forEach((node) => nodes.push(Object.assign({}, node)));

      const simulation = forceSimulation(nodes)
        .force("link", forceLink(links).id(d => d.id))
        .force("charge", forceManyBody())
        .force("center", forceCenter(250, 250));

      const link = select(d3Ref.current)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 2)
        .lower();

      const node = select(d3Ref.current)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("stroke", "white")
        .attr('stroke-opacity', 1)
        .attr("stroke-width", 1.5)
        .attr("fill", d => d.foundSimilar ? 'red' : 'black')
        .call(node => node.transition().attr('r', 5))
        .on('mouseover', (d) => {
          const node = select(d3Ref.current)
          node
            .append('rect')
            .attr('width', d.name.length * 8)
            .attr('height', 20)
            .attr('x', d.x + 15)
            .attr('y', d.y)
            .attr('fill', '#f0f8ff')
            .attr('stroke', '#98cfff')

          node
            .append('text')
            .attr('x', d.x + 15)
            .attr('y', d.y + 15)
            .text(d.name)
        })
        .on('mouseout', () => {
          const node = select(d3Ref.current);
          node
            .selectAll('rect')
            .remove()
          node
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

      simulation.on("tick", () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      });
    }
  }, [dataLinks, dataNodes, isSimulationOn]);

  return (
    <div>
      <svg ref={d3Ref} width={500} height={500} />
    </div>
  );
};

export default connect(mapStateToProps)(SimilarRestaurantsGraph);
