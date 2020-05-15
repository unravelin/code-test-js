import React, { useRef, useEffect } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  select,
} from 'd3';
import node from './miserables.json';
import { connect } from 'react-redux';

export const mapStateToProps = (state) => ({
  graphInitialized: state?.graphState?.graphInitialized,
  data: node,
});

export const SimilarRestaurantsGraph = ({ graphInitialized, data, size }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    if (graphInitialized) {
      const links = data.links.map(d => Object.create(d));
      const nodes = data.nodes.map(d => Object.create(d));

      const simulation = forceSimulation(nodes)
      .force("link", forceLink(links).id(d => d.id))
      .force("charge", forceManyBody())
      .force("center", forceCenter(250, 250));

      const link = select(d3Ref.current)
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

      const node = select(d3Ref.current)
      .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", 'black');

      simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
      });
    }
  }, [data, graphInitialized, size]);

  return (
    <div>
      <svg ref={d3Ref} width={500} height={500} />
    </div>
  );
};

export default connect(mapStateToProps)(SimilarRestaurantsGraph);
