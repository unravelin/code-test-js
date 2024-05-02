import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../AppContext'; 

interface Venue {
    name: string;
    location?: {
        address: string;
    };
    categories: Array<{
        id: string;
        name: string;
    }>;
}

const VenueDetails: React.FC = () => {
    const { fsq_id } = useParams<{ fsq_id?: string }>();
    const { apiKey } = useAppContext(); 
    const [venueDetails, setVenueDetails] = useState<Venue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!fsq_id || !apiKey) {
            setError('API Key or Venue ID is missing');
            setLoading(false);
            return;
        }

        const fetchVenueDetails = async () => {
            const endpoint = `https://api.foursquare.com/v3/places/${fsq_id}`;
            const headers = { 'Authorization': apiKey };

            try {
                const response = await axios.get(endpoint, { headers });
                setVenueDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch venue details:', error);
                setError('Failed to fetch venue details');
            } finally {
                setLoading(false);
            }
        };

        fetchVenueDetails();
    }, [fsq_id, apiKey]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Venue Details</h1>
            {venueDetails ? (
                <>
                    <h2>{venueDetails.name}</h2>
                    <p>Address: {venueDetails.location?.address || 'No address provided'}</p>
                    <h3>Categories:</h3>
                    <ul>
                        {venueDetails.categories.map(cat => (
                            <li key={cat.id}>{cat.name}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No details available.</p>
            )}
        </div>
    );
};

export default VenueDetails;
