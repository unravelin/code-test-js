import React from 'react';
import { connect } from 'react-redux';

export const mapStateToProps = (state) => ({
  graphInitialized: state?.graphState?.graphInitialized,
});

export const SimilarRestaurantsGraph = ({ graphInitialized }) => {
  return graphInitialized && <div>blah blah</div>;
};

export default connect(mapStateToProps)(SimilarRestaurantsGraph);
