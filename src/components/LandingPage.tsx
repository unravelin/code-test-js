import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../AppContext";
import './LandingPage.css';
import { Link } from "react-router-dom";

interface Venue {
  name: string;
  fsq_id: string;
  category: Array<{
    id: string;
    name: string;
  }>;
}

interface SearchFormProps {
  onSearch: (apiKey: string, venueName: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { apiKey, setApiKey } = useAppContext();
  const [venueName, setVenueName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(apiKey, venueName);
  };

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

const LandingPage: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [cache, setCache] = useState<{ [key: string]: { data: Venue[]; timestamp: number } }>({});


  const handleSearch = async (apiKey: string, venueName: string) => {
    const currentTime = new Date().getTime();
    const cacheEntry = cache[venueName];

    if (cacheEntry && currentTime - cacheEntry.timestamp < 300000) {  // 5 minutes
      console.log("Using cached data");
      setVenues(cacheEntry.data);
      return;
    }

    const endpoint = `https://api.foursquare.com/v3/places/nearby?ll=51.509223%2C-0.113492&query=${(venueName)}`;
    const headers = { 'Authorization': apiKey };

    try {
      const response = await axios.get(endpoint, { headers });
      setVenues(response.data.results);
      setCache({
        ...cache,
        [venueName]: { data: response.data.results, timestamp: currentTime }
      });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="landing-page">
      <h1 className="title">Venue Search</h1>
      <SearchForm onSearch={handleSearch} />
      <h1 className="title">Venues near you</h1>
      {venues.length > 0 && (
        <ul className="venue-list">
          {venues.map(venue => (
            <ul key={venue.fsq_id}>
<Link to={`/places/${venue.fsq_id}`}>
  <h2>{venue.name}</h2>
</Link>

            </ul>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LandingPage;
