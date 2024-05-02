import React, { useState} from "react";
import './LandingPage.css'; 

const LandingPage: React.FC = () => {
const handleSearch = (apiKey: string, venueName: string) => {
  console.log(apiKey, venueName);
}

interface SearchFormProps {
  onSearch: (apiKey: string, venueName: string) => void;
}

  const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [apiKey, setApiKey] = useState("");
    const [venueName, setVenueName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(apiKey, venueName);};
  
    return (
<form onSubmit={handleSubmit} className="search-form">
<div className="form-group">
        <label htmlFor="apiKey" className="label">API Key</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="venueName" className="label">Venue Name</label>
        <input
          type="text"
          id="venueName"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          className="input"
          required
        />
      </div>
      <button type="submit" className="button">Search</button>
  
</form>
    );
  };
return(
  <div className="landing-page">
    <h1 className="title">Venue Search</h1>
    <SearchForm onSearch={handleSearch} />
  </div>
);

 }

  export default LandingPage;