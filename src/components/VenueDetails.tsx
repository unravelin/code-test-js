import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../AppContext'; 
import './VenueDetails.css';

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
    const [photos, setPhotos] = useState<string[]>([]);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVenueDetails = async () => {
            if (!fsq_id || !apiKey) {
                setError('API Key or Venue ID is missing');
                setLoading(false);
                return;
            }

            const endpoint = `https://api.foursquare.com/v3/places/${fsq_id}`;
            const headers = { 'Authorization': apiKey };

            try {
                const response = await axios.get(endpoint, { headers });
                setVenueDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch venue details:', error);
                setError('Failed to fetch venue details');
                setLoading(false);
            }
        };

        const fetchPhotos = async () => {
            if (!fsq_id || !apiKey) {
                return;
            }

            const photosEndpoint = `https://api.foursquare.com/v3/places/${fsq_id}/photos`;
            const headers = { 'Authorization': apiKey };

            try {
                const response = await axios.get(photosEndpoint, { headers });
                const photoUrls = response.data.map((photo: { prefix: string; suffix: string; }) => photo.prefix + "300x300" + photo.suffix);
                setPhotos(photoUrls);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            }
        };

        fetchVenueDetails();
        fetchPhotos();
    }, [fsq_id, apiKey]); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className='venue-details-card'>
            {venueDetails ? (
                <>
                    <h1>{venueDetails.name}</h1>
                    <p>Address: {venueDetails.location?.address || 'No address provided'}</p>
                 <div className='categories-container'>
                    <span>Categories:</span>
                    <ul className='categories-list'>
                        {venueDetails.categories.map(cat => (
                            <li key={cat.id}>{cat.name}</li>
                        ))}
                    </ul>
                    </div>
                    <div>
                    {photos.length > 0 && (
                    <div className='photo-grid'>
                            {photos.map((photoUrl, index) => (
                                <img key={index} src={photoUrl} alt="Venue" />
                            ))}
                        </div>
                    )}
                    </div>
                 
                </>
            ) : (
                <p>No details available.</p>
            )}
        </section>
    );
};

export default VenueDetails;
