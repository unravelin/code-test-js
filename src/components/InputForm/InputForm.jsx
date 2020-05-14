import React from 'react';
import './InputForm.css';

export const InputForm = ({
  clientId,
  clientSecret,
  suggestedVenues,
}) => (
  <div className="input-form">
    <div className="input-field">clientID: <input id="clientId" value={clientId} /></div>
    <div className="input-field">clientSecret: <input id="clientSecret" value={clientSecret} /></div>
    <div className="input-field">venue: <input id="selectedVenue" list="suggestedVenues"/></div>
    <datalist list="venues" id="suggestedVenues">
      {suggestedVenues.map(venue => (
        <option key={venue} value={venue}></option>
      ))}
    </datalist>
  </div>
);

InputForm.defaultProps = {
  suggestedVenues: [],
}

export default InputForm;
