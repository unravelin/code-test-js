import React from 'react';
import { connect } from 'react-redux';
import { getSuggestedVenues, setClientId, setClientSecret } from '../../actions/fourSquareActions';
import { setGraphInitialized, stopSimulation } from '../../actions/graphActions';

import './InputForm.css';

const mapStateToProps = (state) => ({
  clientId: state?.fourSquare?.clientId,
  clientSecret: state?.fourSquare?.clientSecret,
  suggestedVenues: state?.fourSquare?.suggestedVenues,
  selectedVenueId: state?.fourSquare?.selectedVenue?.id,
  isSimulationOn: state?.graphState?.isSimulationOn
});

const mapDispatchToProps = {
  getSuggestedVenuesBound: getSuggestedVenues,
  setClientIdBound: setClientId,
  setClientSecretBound: setClientSecret,
  setGraphInitializedBound: setGraphInitialized,
  stopSimulationBound: stopSimulation,
}

export const InputForm = ({
  clientId,
  clientSecret,
  suggestedVenues,
  selectedVenueId,
  isSimulationOn,
  getSuggestedVenuesBound,
  setClientIdBound,
  setClientSecretBound,
  setGraphInitializedBound,
  stopSimulationBound,
}) => {
  const onClientIdChange = (event) => setClientIdBound(event.target.value);
  const onClientSecretChange = (event) => setClientSecretBound(event.target.value);
  const onSuggestedVenuesChange = (event) => getSuggestedVenuesBound(event.target.value);
  const onShowtimeClick = () => setGraphInitializedBound(selectedVenueId);
  const onSimulationStop = () => stopSimulationBound();

  return (
    <div className="input-form">
      <div className="input-field">clientID: <input id="clientId" value={clientId} onChange={onClientIdChange}/></div>
      <div className="input-field">clientSecret: <input id="clientSecret" value={clientSecret} onChange={onClientSecretChange}/></div>
      <div className="input-field">
        venue: <input id="selectedVenue" list="suggestedVenues" onChange={onSuggestedVenuesChange}/>
        <datalist list="venues" id="suggestedVenues">
          {suggestedVenues.map(venue => (
            <option key={venue.id} value={venue.name} data-id={venue.id}></option>
          ))}
        </datalist>
        <button className="showtime-button" disabled={!selectedVenueId} onClick={onShowtimeClick}>Its showtime!</button>
        {isSimulationOn && (
          <button className="showtime-button" onClick={onSimulationStop}>Stop simulation</button>
        )}
      </div>
    </div>
  );
};

InputForm.defaultProps = {
  suggestedVenues: [],
  selectedVenueId: '',
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
