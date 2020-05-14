import React, { useRef, useEffect } from 'react';
import { select, max, scaleLinear } from 'd3';
// import node from './diagram';
import { connect } from 'react-redux';

export const mapStateToProps = (state) => ({
  graphInitialized: state?.graphState?.graphInitialized,
});

export const SimilarRestaurantsGraph = ({ graphInitialized, data, size }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    if (graphInitialized) {
      const dataMax = max(data)
      const yScale = scaleLinear()
        .domain([0, dataMax])
        .range([0, size[1]]);

      select(d3Ref.current)
          .selectAll('rect')
          .data(data)
          .enter()
          .append('rect');

      select(d3Ref.current)
          .selectAll('rect')
          .data(data)
          .exit()
          .remove();

      select(d3Ref.current)
          .selectAll('rect')
          .data(data)
          .style('fill', '#fe9922')
          .attr('x', (d,i) => i * 25)
          .attr('y', (d) => size[1] - yScale(d))
          .attr('height', d => yScale(d))
          .attr('width', 25);
    }
  }, [data, graphInitialized, size]);

  return (
    <div>
      <svg ref={d3Ref} width={500} height={500} />
    </div>
  );
};

export default connect(mapStateToProps)(SimilarRestaurantsGraph);
