import React, { useRef, useEffect } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  select,
} from 'd3';
import { connect } from 'react-redux';

export const mapStateToProps = (state) => ({
  graphMounted: state?.graphState?.graphMounted,
  dataNodes: state?.graphState?.nodes ?? new Map(),
  dataLinks: state?.graphState?.links ?? new Set(),
});


export const SimilarRestaurantsGraph = ({ graphMounted, dataNodes, dataLinks }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    if (graphMounted) {
      const links = [];
      const nodes = [];
      dataLinks.forEach((link) => links.push(Object.assign({}, link)));
      dataNodes.forEach((node) => nodes.push(Object.assign({}, node)));

      console.log('links', links);
      console.log('nodes', nodes);

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
        .attr("stroke-width", d => Math.sqrt(d.value));

      const node = select(d3Ref.current)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
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
  }, [dataLinks, dataNodes, graphMounted]);

  return (
    <div>
      <svg ref={d3Ref} width={500} height={500} />
    </div>
  );
};

export default connect(mapStateToProps)(SimilarRestaurantsGraph);
